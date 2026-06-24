import {
  Bell,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Send,
  Settings,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DeviceSettingsModal } from "./DeviceSettingsModal";

interface WebRTCSessionProps {
  appointmentId: string;
  userId: string;
  localParticipantName: string;
  localParticipantImage?: string;
  remoteParticipantName: string;
  remoteParticipantImage?: string;
  backendUrl: string;
  onLeave: () => void;
  role: "USER" | "EXPERT";
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
  localParticipantName,
  localParticipantImage,
  remoteParticipantName,
  remoteParticipantImage,
  backendUrl,
  onLeave,
  role,
}: WebRTCSessionProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [remoteScreenStream, setRemoteScreenStream] =
    useState<MediaStream | null>(null);
  const screenSenderRef = useRef<RTCRtpSender | null>(null);
  const localScreenStreamRef = useRef<MediaStream | null>(null);

  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "join" | "leave";
  } | null>(null);

  const [chatNotification, setChatNotification] = useState<{
    senderName: string;
    text: string;
  } | null>(null);

  const [unreadCount, setUnreadCount] = useState(0);

  const [showMobileChat, setShowMobileChat] = useState(false);
  const showMobileChatRef = useRef(false);

  useEffect(() => {
    if (showMobileChat) {
      setUnreadCount(0);
      setChatNotification(null);
    }
    showMobileChatRef.current = showMobileChat;
  }, [showMobileChat]);

  useEffect(() => {
    if (chatNotification) {
      const timer = setTimeout(() => setChatNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [chatNotification]);

  const [messages, setMessages] = useState<
    { senderId: string; senderName: string; text: string; timestamp: number }[]
  >([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      // Only scroll if we're on desktop OR if the mobile chat modal is currently open.
      // This prevents the browser from forcibly scrolling the entire page when the chat is hidden.
      if (window.innerWidth >= 1024 || showMobileChatRef.current) {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [messages, showMobileChat]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !socket) return;

    const newMsg = {
      roomId: appointmentId,
      senderId: userId,
      senderName: localParticipantName,
      text: chatInput.trim(),
      timestamp: Date.now(),
    };

    socket.emit("chat-message", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  // PIP dragging state
  const [pipPos, setPipPos] = useState({ x: 16, y: 16 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.closest("button")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isBottomRight =
      e.clientX > rect.right - 20 && e.clientY > rect.bottom - 20;
    if (isBottomRight) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX - pipPos.x, y: e.clientY - pipPos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setPipPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
          const stream = event.streams[0];
          const track = event.track;

          // Listen for mute/unmute on remote tracks so participant icons update
          // even if the socket "peer-toggled-media" event is missed.
          if (track.kind === "video") {
            track.addEventListener("mute", () => setRemoteVideoEnabled(false));
            track.addEventListener("unmute", () => setRemoteVideoEnabled(true));
          } else if (track.kind === "audio") {
            track.addEventListener("mute", () => setRemoteAudioEnabled(false));
            track.addEventListener("unmute", () => setRemoteAudioEnabled(true));
          }

          // Simple heuristic: if remoteStream is already set and has a different ID, it's the screen stream.
          // Alternatively, we handle stream IDs via socket below.
          setRemoteStream((prev) => {
            if (!prev) return stream;
            if (prev.id !== stream.id) {
              setRemoteScreenStream(stream);
              return prev;
            }
            return stream;
          });
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
          const message =
            role === "EXPERT"
              ? "A user joined the session"
              : "An expert joined the session";
          setToastMessage({ message, type: "join" });
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

        currentSocket.on("screen-share-stopped", () => {
          setRemoteScreenStream(null);
        });

        currentSocket.on("screen-share-started", () => {
          // If we already received the stream in ontrack, we can map it if we kept a list,
          // but for now relying on the ontrack heuristic + this event is okay.
        });

        currentSocket.on(
          "chat-message",
          (data: {
            senderId: string;
            senderName: string;
            text: string;
            timestamp: number;
          }) => {
            setMessages((prev) => [...prev, data]);

            if (
              window.innerWidth < 1024 &&
              !showMobileChatRef.current &&
              data.senderId !== userId
            ) {
              setUnreadCount((prev) => prev + 1);
              setChatNotification({
                senderName: data.senderName,
                text: data.text,
              });
            }
          },
        );

        currentSocket.on("user-left", () => {
          setToastMessage({ message: "A user left the call", type: "leave" });
          setRemoteStream(null);
          setRemoteScreenStream(null);
          setRemoteVideoEnabled(true);
          setRemoteAudioEnabled(true);
        });

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

  const toggleScreenShare = async () => {
    if (!peerConnectionRef.current) return;

    try {
      if (isScreenSharing) {
        // Stop screen share and revert to camera-only
        if (screenSenderRef.current && peerConnectionRef.current) {
          peerConnectionRef.current.removeTrack(screenSenderRef.current);
          screenSenderRef.current = null;
        }
        if (localScreenStreamRef.current) {
          localScreenStreamRef.current
            .getTracks()
            .forEach((track) => track.stop());
          localScreenStreamRef.current = null;
        }

        setIsScreenSharing(false);
        socket?.emit("screen-share-stopped", { roomId: appointmentId, userId });

        // Renegotiate
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket?.emit("webrtc-offer", { roomId: appointmentId, offer });
      } else {
        // Start screen share
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = screenStream.getVideoTracks()[0];
        localScreenStreamRef.current = screenStream;

        screenTrack.onended = () => {
          toggleScreenShare();
        };

        // Add the screen track as a separate stream
        const sender = peerConnectionRef.current.addTrack(
          screenTrack,
          screenStream,
        );
        screenSenderRef.current = sender;

        setIsScreenSharing(true);
        socket?.emit("screen-share-started", {
          roomId: appointmentId,
          userId,
          streamId: screenStream.id,
        });

        // Renegotiate
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket?.emit("webrtc-offer", { roomId: appointmentId, offer });
      }
    } catch (e) {
      console.error("Error toggling screen share:", e);
    }
  };

  const handleNotifyPeer = async () => {
    if (isNotifying) return;
    setIsNotifying(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/appointments/${appointmentId}/notify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setToastMessage({
          message: data.message || "Failed to notify peer",
          type: "leave",
        });
      } else {
        setToastMessage({ message: "Notification sent", type: "join" });
      }
    } catch (error) {
      console.error("Error notifying peer:", error);
      setToastMessage({ message: "Failed to notify peer", type: "leave" });
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col lg:flex-row overflow-hidden bg-[#070a0f]">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full font-medium text-white shadow-lg transition-all ${toastMessage.type === "join" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toastMessage.message}
        </div>
      )}

      {/* Bottom Chat Notification (Mobile) */}
      {chatNotification && (
        <div
          className="absolute bottom-24 left-4 right-4 lg:hidden z-40 bg-[#121a24] border border-[#44666C] rounded-xl p-4 shadow-2xl cursor-pointer transition-all animate-in slide-in-from-bottom-5"
          onClick={() => {
            setShowMobileChat(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-[#7eb8aa] font-medium">
                  New message from {chatNotification.senderName}
                </p>
                {unreadCount > 1 && (
                  <span className="bg-[#44666C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-200 line-clamp-1">
                {chatNotification.text}
              </p>
            </div>
            <div className="relative h-8 w-8 rounded-full bg-[#44666C]/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#7eb8aa]" />
              {unreadCount > 1 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Area (70%) */}
      <div className="relative flex flex-col flex-1 lg:w-[70%] h-full shrink-0">
        {/* Remote Video Container - Full Width */}
        <div className="flex-1 flex items-center justify-center relative w-full h-full">
          <div
            ref={remoteContainerRef}
            className="relative bg-black overflow-hidden w-full h-full"
          >
            {remoteScreenStream ? (
              <video
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                ref={(el) => {
                  if (el && el.srcObject !== remoteScreenStream) {
                    el.srcObject = remoteScreenStream;
                  }
                }}
              />
            ) : remoteStream ? (
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
              </>
            ) : (
              <div className="flex w-full h-full items-center justify-center flex-col gap-3 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse flex items-center justify-center">
                  <VideoOff className="w-8 h-8 opacity-50" />
                </div>
                <p>Waiting for the other person to join...</p>
                <button
                  onClick={handleNotifyPeer}
                  disabled={isNotifying}
                  className="mt-4 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center gap-2 transition disabled:opacity-50"
                >
                  <Bell className="w-5 h-5" />
                  {isNotifying ? "Notifying..." : "Notify them to join"}
                </button>
              </div>
            )}
            {remoteStream && !remoteAudioEnabled && (
              <div className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-red-500/80 backdrop-blur-md">
                <MicOff className="h-4 w-4 text-white" />
              </div>
            )}

            {/* Local Video PIP */}
            <div
              className="absolute z-40 w-32 sm:w-48 aspect-video sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 backdrop-blur-md cursor-move touch-none"
              style={{
                left: `${pipPos.x}px`,
                top: `${pipPos.y}px`,
                resize: "both",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isScreenSharing ? "" : "mirror"}`}
                style={{ transform: isScreenSharing ? "none" : "scaleX(-1)" }}
              />
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <VideoOff className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Remote Camera PIP (only shown if remote is screen sharing) */}
        {remoteScreenStream && remoteStream && (
          <div className="absolute z-30 w-32 sm:w-48 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 top-4 left-4">
            <video
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${!remoteVideoEnabled ? "opacity-0" : "opacity-100"}`}
              ref={(el) => {
                if (el && el.srcObject !== remoteStream) {
                  el.srcObject = remoteStream;
                }
              }}
            />
            {!remoteVideoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <VideoOff className="w-5 h-5 sm:w-6 sm:h-6 text-stone-400" />
              </div>
            )}
          </div>
        )}

        {/* Controls Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-4 rounded-3xl bg-[#121a24]/90 px-3 sm:px-6 py-2 sm:py-3 shadow-2xl backdrop-blur-xl border border-white/10 w-[95%] max-w-max justify-center overflow-x-auto whitespace-nowrap">
          <button
            onClick={toggleAudio}
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition shrink-0 ${
              isAudioEnabled
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isAudioEnabled ? (
              <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition shrink-0 ${
              isVideoEnabled
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isVideoEnabled ? (
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>

          <button
            onClick={toggleScreenShare}
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition shrink-0 ${
              isScreenSharing
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <MonitorUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={() => setShowMobileChat(true)}
            className="lg:hidden flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 shrink-0 relative"
          >
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-3.5 h-3.5 bg-red-500 border-2 border-[#121a24] rounded-full text-[8px] font-bold text-white leading-none">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 shrink-0"
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={handleNotifyPeer}
            disabled={isNotifying}
            title="Notify Peer"
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition shrink-0 ${
              isNotifying
                ? "bg-white/5 text-stone-500"
                : "bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-400"
            }`}
          >
            <Bell
              className={`h-4 w-4 sm:h-5 sm:w-5 ${isNotifying ? "opacity-50" : ""}`}
            />
          </button>

          <div className="w-px h-6 sm:h-8 bg-white/10 mx-1 sm:mx-2 shrink-0" />

          <button
            onClick={() => setShowLeaveConfirm(true)}
            className="flex h-10 sm:h-12 px-4 sm:px-6 items-center justify-center gap-2 rounded-full bg-red-500 text-white transition hover:bg-red-600 font-medium shrink-0"
          >
            <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base hidden sm:inline">
              Leave Call
            </span>
            <span className="text-sm sm:hidden">Leave</span>
          </button>
        </div>
      </div>

      {/* Side Panel (Participants & Chat) - 30% */}
      <div
        className={`absolute inset-0 z-50 lg:static flex flex-col w-full lg:w-[30%] bg-[#0c1219] lg:border-l border-white/10 transition-transform duration-300 lg:translate-y-0 ${showMobileChat ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-white/10 bg-[#121a24] shrink-0">
          <h2 className="text-sm font-semibold text-white">
            Chat & Participants
          </h2>
          <button
            onClick={() => setShowMobileChat(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Participants Tab */}
        <div className="flex flex-col border-b border-white/10 p-4 shrink-0 bg-[#0c1219]">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Participants (2)
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                {localParticipantImage ? (
                  <img
                    src={localParticipantImage}
                    alt={localParticipantName}
                    className="h-8 w-8 shrink-0 rounded-full object-cover bg-white/10"
                  />
                ) : (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-[#44666C] flex items-center justify-center text-white text-sm font-medium">
                    {localParticipantName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {localParticipantName}{" "}
                    <span className="text-stone-400 text-xs ml-1">(You)</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAudioEnabled ? (
                  <Mic className="w-4 h-4 text-emerald-400" />
                ) : (
                  <MicOff className="w-4 h-4 text-red-400" />
                )}
                {!isVideoEnabled ? (
                  <VideoOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Video className="w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                {remoteParticipantImage ? (
                  <img
                    src={remoteParticipantImage}
                    alt={remoteParticipantName}
                    className="h-8 w-8 shrink-0 rounded-full object-cover bg-white/10"
                  />
                ) : (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-[#2d4a52] flex items-center justify-center text-white text-sm font-medium">
                    {remoteParticipantName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="truncate text-sm font-medium text-stone-200">
                    {remoteParticipantName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {remoteAudioEnabled ? (
                  <Mic className="w-4 h-4 text-emerald-400" />
                ) : (
                  <MicOff className="w-4 h-4 text-red-500" />
                )}
                {remoteVideoEnabled ? (
                  <Video className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VideoOff className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="m-auto text-center text-sm text-stone-500">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMe = msg.senderId === userId;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-full`}
                  >
                    <span className="text-[10px] text-stone-500 mb-0.5 px-1">
                      {msg.senderName}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-[90%] text-sm break-words ${isMe ? "bg-[#44666C] text-white rounded-br-sm" : "bg-white/10 text-stone-200 rounded-bl-sm"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-[#0c1219] border-t border-white/5 shrink-0">
            <form
              onSubmit={sendMessage}
              className="flex items-end gap-2 relative"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#44666C] text-white transition-colors hover:bg-[#365a62] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Leave Confirmation Modal */}
      {showLeaveConfirm && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c1219] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-confirm-title"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30">
                <LogOut className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3
                  id="leave-confirm-title"
                  className="text-lg font-semibold text-white"
                >
                  Leave Meeting?
                </h3>
                <p className="mt-1.5 text-sm text-stone-400 leading-relaxed">
                  Are you sure you want to leave this session? You can rejoin
                  later if the session is still active.
                </p>
              </div>
              <div className="flex w-full gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setShowLeaveConfirm(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-stone-200 transition hover:bg-white/10 hover:border-white/15"
                >
                  Stay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLeaveConfirm(false);
                    onLeave();
                  }}
                  className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Leave Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
