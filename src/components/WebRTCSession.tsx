import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Mic, MicOff, Video, VideoOff, Settings, PhoneOff } from "lucide-react";
import { DeviceSettingsModal } from "./DeviceSettingsModal";

interface WebRTCSessionProps {
  appointmentId: string;
  userId: string;
  backendUrl: string;
  onLeave: () => void;
}

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export function WebRTCSession({
  appointmentId,
  userId,
  backendUrl,
  onLeave,
}: WebRTCSessionProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Device IDs
  const [selectedVideoInput, setSelectedVideoInput] =
    useState<string>("default");
  const [selectedAudioInput, setSelectedAudioInput] =
    useState<string>("default");
  const [selectedAudioOutput, setSelectedAudioOutput] =
    useState<string>("default");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Resize and Drag state for remote video
  const [remoteSize] = useState({ width: 640, height: 480 });
  const remoteContainerRef = useRef<HTMLDivElement>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  // Initialize Media and Socket
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let currentSocket: Socket | null = null;
    let currentPc: RTCPeerConnection | null = null;

    async function init() {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId:
              selectedVideoInput !== "default"
                ? { exact: selectedVideoInput }
                : undefined,
          },
          audio: {
            deviceId:
              selectedAudioInput !== "default"
                ? { exact: selectedAudioInput }
                : undefined,
          },
        });
        setLocalStream(currentStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = currentStream;
        }

        // Initialize Socket
        currentSocket = io(backendUrl, { transports: ["websocket"] });
        setSocket(currentSocket);

        // Initialize Peer Connection
        currentPc = new RTCPeerConnection(configuration);
        peerConnectionRef.current = currentPc;

        currentStream.getTracks().forEach((track) => {
          if (currentStream) currentPc?.addTrack(track, currentStream);
        });

        currentPc.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
        };

        currentPc.onicecandidate = (event) => {
          if (event.candidate) {
            currentSocket?.emit("webrtc-ice-candidate", {
              roomId: appointmentId,
              candidate: event.candidate,
            });
          }
        };

        // Socket Events
        currentSocket.on("user-joined", async () => {
          // A new user joined, we are the initiator so we create the offer
          try {
            const offer = await currentPc!.createOffer();
            await currentPc!.setLocalDescription(offer);
            currentSocket?.emit("webrtc-offer", {
              roomId: appointmentId,
              offer,
            });
          } catch (e) {
            console.error("Error creating offer:", e);
          }
        });

        currentSocket.on(
          "webrtc-offer",
          async (data: { offer: RTCSessionDescriptionInit }) => {
            try {
              await currentPc!.setRemoteDescription(
                new RTCSessionDescription(data.offer),
              );
              const answer = await currentPc!.createAnswer();
              await currentPc!.setLocalDescription(answer);
              currentSocket?.emit("webrtc-answer", {
                roomId: appointmentId,
                answer,
              });
              // Process queued ICE candidates
              pendingCandidatesRef.current.forEach(async (candidate) => {
                try {
                  await currentPc!.addIceCandidate(
                    new RTCIceCandidate(candidate),
                  );
                } catch (e) {
                  console.error("Error adding queued ice candidate:", e);
                }
              });
              pendingCandidatesRef.current = [];
            } catch (e) {
              console.error("Error handling offer:", e);
            }
          },
        );

        currentSocket.on(
          "webrtc-answer",
          async (data: { answer: RTCSessionDescriptionInit }) => {
            try {
              await currentPc!.setRemoteDescription(
                new RTCSessionDescription(data.answer),
              );
              // Process queued ICE candidates
              pendingCandidatesRef.current.forEach(async (candidate) => {
                try {
                  await currentPc!.addIceCandidate(
                    new RTCIceCandidate(candidate),
                  );
                } catch (e) {
                  console.error("Error adding queued ice candidate:", e);
                }
              });
              pendingCandidatesRef.current = [];
            } catch (e) {
              console.error("Error handling answer:", e);
            }
          },
        );

        currentSocket.on(
          "webrtc-ice-candidate",
          async (data: { candidate: RTCIceCandidateInit }) => {
            try {
              if (
                currentPc!.remoteDescription &&
                currentPc!.remoteDescription.type
              ) {
                await currentPc!.addIceCandidate(
                  new RTCIceCandidate(data.candidate),
                );
              } else {
                pendingCandidatesRef.current.push(data.candidate);
              }
            } catch (e) {
              console.error("Error adding ice candidate:", e);
            }
          },
        );

        currentSocket.on(
          "peer-toggled-media",
          (data: { type: string; enabled: boolean }) => {
            if (data.type === "video") setRemoteVideoEnabled(data.enabled);
            if (data.type === "audio") setRemoteAudioEnabled(data.enabled);
          },
        );

        // Finally, join room
        currentSocket.emit("join-room", appointmentId, userId);
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }

    init();

    return () => {
      currentStream?.getTracks().forEach((track) => track.stop());
      currentPc?.close();
      currentSocket?.disconnect();
    };
  }, [
    appointmentId,
    userId,
    backendUrl,
    selectedAudioInput,
    selectedVideoInput,
  ]); // Note: re-running on device change is handled separately below

  // Apply remote stream
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Set audio output
  useEffect(() => {
    if (remoteVideoRef.current && selectedAudioOutput !== "default") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const videoEl = remoteVideoRef.current as any;
      if (typeof videoEl.setSinkId === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        videoEl.setSinkId(selectedAudioOutput).catch((err: any) => {
          console.error("Failed to set audio output device", err);
        });
      }
    }
  }, [selectedAudioOutput, remoteStream]);

  // Handle Device Change
  const handleDeviceChange = async (
    deviceId: string,
    kind: "audioinput" | "videoinput" | "audiooutput",
  ) => {
    if (kind === "audiooutput") {
      setSelectedAudioOutput(deviceId);
      return;
    }

    if (kind === "videoinput") setSelectedVideoInput(deviceId);
    if (kind === "audioinput") setSelectedAudioInput(deviceId);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video:
          kind === "videoinput"
            ? { deviceId: { exact: deviceId } }
            : {
                deviceId:
                  selectedVideoInput !== "default"
                    ? { exact: selectedVideoInput }
                    : undefined,
              },
        audio:
          kind === "audioinput"
            ? { deviceId: { exact: deviceId } }
            : {
                deviceId:
                  selectedAudioInput !== "default"
                    ? { exact: selectedAudioInput }
                    : undefined,
              },
      });

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          if (track.kind === "video" && kind === "videoinput") track.stop();
          if (track.kind === "audio" && kind === "audioinput") track.stop();
        });
      }

      setLocalStream((prev) => {
        if (!prev) return newStream;
        const tracks = [
          ...prev
            .getTracks()
            .filter(
              (t) => t.kind !== (kind === "videoinput" ? "video" : "audio"),
            ),
          ...newStream
            .getTracks()
            .filter(
              (t) => t.kind === (kind === "videoinput" ? "video" : "audio"),
            ),
        ];
        const combined = new MediaStream(tracks);
        if (localVideoRef.current) localVideoRef.current.srcObject = combined;
        return combined;
      });

      if (peerConnectionRef.current) {
        const senders = peerConnectionRef.current.getSenders();
        newStream.getTracks().forEach((track) => {
          const sender = senders.find((s) => s.track?.kind === track.kind);
          if (sender) sender.replaceTrack(track);
        });
      }
    } catch (err) {
      console.error("Error changing device", err);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
      socket?.emit("peer-toggled-media", {
        roomId: appointmentId,
        userId,
        type: "video",
        enabled: !isVideoEnabled,
      });
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
      socket?.emit("peer-toggled-media", {
        roomId: appointmentId,
        userId,
        type: "audio",
        enabled: !isAudioEnabled,
      });
    }
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#070a0f]">
      {/* Remote Video Container - Resizable */}
      <div className="flex-1 flex items-center justify-center relative w-full h-full p-4">
        <div
          ref={remoteContainerRef}
          className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
          style={{
            resize: "both",
            overflow: "hidden",
            width: remoteSize.width,
            height: remoteSize.height,
            minWidth: "320px",
            minHeight: "240px",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {remoteStream ? (
            <>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover ${!remoteVideoEnabled ? "opacity-0" : "opacity-100"}`}
              />
              {!remoteVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                      <VideoOff className="h-8 w-8 text-stone-400" />
                    </div>
                    <p className="text-sm font-medium text-stone-300">
                      Camera off
                    </p>
                  </div>
                </div>
              )}
              {!remoteAudioEnabled && (
                <div className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-red-500/80 backdrop-blur-md">
                  <MicOff className="h-4 w-4 text-white" />
                </div>
              )}
            </>
          ) : (
            <div className="flex w-full h-full items-center justify-center flex-col gap-3 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse flex items-center justify-center">
                <VideoOff className="w-8 h-8 opacity-50" />
              </div>
              <p>Waiting for the other person to join...</p>
            </div>
          )}

          {/* Resize handle indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100 transition bg-gradient-to-tl from-white/30 to-transparent" />
        </div>
      </div>

      {/* Local Video PIP */}
      <div className="absolute bottom-24 right-6 z-20 w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 backdrop-blur-md">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover mirror"
          style={{ transform: "scaleX(-1)" }}
        />
        {!isVideoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <VideoOff className="w-8 h-8 text-stone-400" />
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 rounded-3xl bg-[#121a24]/90 px-6 py-3 shadow-2xl backdrop-blur-xl border border-white/10">
        <button
          onClick={toggleAudio}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
            isAudioEnabled
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isAudioEnabled ? (
            <Mic className="h-5 w-5" />
          ) : (
            <MicOff className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={toggleVideo}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
            isVideoEnabled
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isVideoEnabled ? (
            <Video className="h-5 w-5" />
          ) : (
            <VideoOff className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <Settings className="h-5 w-5" />
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button
          onClick={onLeave}
          className="flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-red-500 text-white transition hover:bg-red-600 font-medium"
        >
          <PhoneOff className="h-5 w-5" />
          <span>Leave Call</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <DeviceSettingsModal
          onClose={() => setShowSettings(false)}
          onDeviceChange={handleDeviceChange}
          selectedAudioInput={selectedAudioInput}
          selectedVideoInput={selectedVideoInput}
          selectedAudioOutput={selectedAudioOutput}
        />
      )}
    </div>
  );
}
