import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  CheckCircle2,
  Clock,
  Lock,
  Mic,
  MicOff,
  Settings,
  Video,
  Volume2,
} from "lucide-react";
import { formatMeetingSchedule } from "../lib/appointmentStartsIn";
import { DeviceSettingsModal } from "./DeviceSettingsModal";

interface PreMeetingTestScreenProps {
  startAt: string;
  endAt: string;
  appointmentId: number;
  counterpartyName: string;
  onJoinCall: () => void;
  onLeave: () => void;
}

export function PreMeetingTestScreen({
  startAt,
  endAt,
  appointmentId,
  counterpartyName,
  onJoinCall,
  onLeave,
}: PreMeetingTestScreenProps) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 100
  const [isTestingSpeaker, setIsTestingSpeaker] = useState(false);
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const [selectedAudioInput, setSelectedAudioInput] = useState<string>("");
  const [selectedVideoInput, setSelectedVideoInput] = useState<string>("");
  const [selectedAudioOutput, setSelectedAudioOutput] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep live time clock ticking every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startMs = new Date(startAt).getTime();
  const endMs = new Date(endAt).getTime();
  const fiveMinBeforeStartMs = startMs - 5 * 60 * 1000;
  const isBeforeAllowedJoin = nowMs < fiveMinBeforeStartMs;
  const isMeetingEnded = nowMs > endMs;

  const secondsUntilAllowed = Math.max(
    0,
    Math.floor((fiveMinBeforeStartMs - nowMs) / 1000),
  );

  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize media devices for audio & video testing
  const initMedia = useCallback(
    async (audioDevId?: string, videoDevId?: string) => {
      try {
        setMediaError(null);
        // Stop any existing tracks
        if (localStream) {
          localStream.getTracks().forEach((t) => t.stop());
        }

        const constraints: MediaStreamConstraints = {
          video: videoDevId
            ? { deviceId: { exact: videoDevId } }
            : { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: audioDevId ? { deviceId: { exact: audioDevId } } : true,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Set up Web Audio API analyser to detect mic audio volume level
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          if (AudioContextClass) {
            if (audioCtxRef.current) {
              void audioCtxRef.current.close().catch(() => {});
            }
            const audioCtx = new AudioContextClass();
            audioCtxRef.current = audioCtx;
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.5;
            analyserRef.current = analyser;

            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
              const audioStream = new MediaStream([audioTrack]);
              const source = audioCtx.createMediaStreamSource(audioStream);
              source.connect(analyser);

              const dataArray = new Uint8Array(analyser.frequencyBinCount);
              const updateLevel = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                  sum += dataArray[i];
                }
                const avg = sum / dataArray.length;
                // Scale 0-100
                const normalized = Math.min(100, Math.round((avg / 128) * 100));
                setAudioLevel(normalized);
                animFrameRef.current = requestAnimationFrame(updateLevel);
              };
              updateLevel();
            }
          }
        } catch (audioErr) {
          console.warn("Audio meter initialization failed", audioErr);
        }
      } catch (err: unknown) {
        console.error("Failed to access camera/mic for pre-meeting test", err);
        setMediaError(
          "Camera or microphone permission was denied. Please allow camera and mic permissions in your browser to test your devices.",
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    void initMedia();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) void audioCtxRef.current.close().catch(() => {});
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync video element when stream is set
  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Toggle Camera
  const toggleCamera = () => {
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  // Toggle Microphone
  const toggleMic = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);
      if (!audioTrack.enabled) setAudioLevel(0);
    }
  };

  // Speaker Sound Test using Web Audio API Oscillator
  const handleTestSpeaker = () => {
    if (isTestingSpeaker) return;
    setIsTestingSpeaker(true);
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioContextClass();

      // Play pleasant chime sequence (440Hz -> 659.25Hz -> 880Hz)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.25); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.5); // G5
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      setTimeout(() => {
        setIsTestingSpeaker(false);
        void ctx.close().catch(() => {});
      }, 1300);
    } catch {
      setIsTestingSpeaker(false);
    }
  };

  const handleDeviceChange = (
    deviceId: string,
    kind: "audioinput" | "videoinput" | "audiooutput",
  ) => {
    if (kind === "videoinput") {
      setSelectedVideoInput(deviceId);
      void initMedia(selectedAudioInput, deviceId);
    } else if (kind === "audioinput") {
      setSelectedAudioInput(deviceId);
      void initMedia(deviceId, selectedVideoInput);
    } else if (kind === "audiooutput") {
      setSelectedAudioOutput(deviceId);
    }
  };

  const handleProceedToJoin = () => {
    if (isBeforeAllowedJoin) return;
    // Stop local test tracks before proceeding to live WebRTC room
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioCtxRef.current) void audioCtxRef.current.close().catch(() => {});
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    onJoinCall();
  };

  const scheduleText = formatMeetingSchedule(startAt, endAt);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 text-white max-w-5xl mx-auto w-full">
      {/* Top Bar / Back button & Meeting Title */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onLeave}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-stone-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Back</span>
        </button>

        <div className="text-right">
          <p className="text-xs text-stone-400 font-medium">
            Appointment #{appointmentId}
          </p>
          <p className="text-sm font-semibold text-stone-200 truncate max-w-xs sm:max-w-md">
            {counterpartyName}
          </p>
        </div>
      </div>

      {/* Prominent Meeting Time Schedule Banner */}
      <div className="mb-6 rounded-2xl border border-[#44666C]/40 bg-linear-to-r from-[#0c161d] via-[#102026] to-[#0c161d] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#44666C]/30 border border-[#7eb8aa]/30 px-3 py-1 text-xs font-semibold text-[#a8d4c4]">
              <Clock className="w-3.5 h-3.5" />
              <span>Scheduled Video Session</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {scheduleText}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              {isBeforeAllowedJoin
                ? "You cannot enter the call before 5 minutes of the start time. Use this screen to test your audio and video so everything is ready."
                : isMeetingEnded
                  ? "This scheduled meeting duration has passed."
                  : "The meeting room is open! You can join the session now."}
            </p>
          </div>

          {/* Countdown badge if before 5 minutes */}
          {isBeforeAllowedJoin && (
            <div className="shrink-0 flex flex-col items-start md:items-end bg-black/40 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                Call opens in
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#7eb8aa]">
                {formatCountdown(secondsUntilAllowed)}
              </span>
              <span className="text-[10px] text-stone-500 mt-0.5">
                (5 mins before start time)
              </span>
            </div>
          )}
        </div>
      </div>

      {mediaError && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/40 p-4 text-sm text-amber-200">
          {mediaError}
        </div>
      )}

      {/* Main Testing Arena: Grid with Video Preview & Audio/Speaker Test */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl flex items-center justify-center">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-stone-400">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <CameraOff className="h-7 w-7 text-stone-400" />
                </div>
                <p className="text-sm font-medium">Camera is turned off</p>
              </div>
            )}

            {/* Video Status Tag (No green dots - following Rule 7) */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {isVideoOn ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Camera working</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-600 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-stone-300">
                  <CameraOff className="h-3.5 w-3.5 text-stone-400" />
                  <span>Camera off</span>
                </div>
              )}
            </div>

            {/* In-Preview Controls */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 rounded-xl">
              <button
                type="button"
                onClick={toggleMic}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition border ${
                  isAudioOn
                    ? "bg-white/15 border-white/20 text-white hover:bg-white/25"
                    : "bg-red-500/80 border-red-500 text-white hover:bg-red-600"
                }`}
                title={isAudioOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isAudioOn ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleCamera}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition border ${
                  isVideoOn
                    ? "bg-white/15 border-white/20 text-white hover:bg-white/25"
                    : "bg-red-500/80 border-red-500 text-white hover:bg-red-600"
                }`}
                title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isVideoOn ? (
                  <Camera className="h-5 w-5" />
                ) : (
                  <CameraOff className="h-5 w-5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowDeviceSettings(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition"
                title="Device Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-stone-400 text-center">
            Look at the camera preview above to verify your lighting and angle.
          </p>
        </div>

        {/* Right Column: Audio & Device Verification (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Microphone Test Card */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#44666C]/30 text-[#7eb8aa]">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Microphone Test
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Speak to test audio level
                  </p>
                </div>
              </div>

              {isAudioOn ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Active
                </span>
              ) : (
                <span className="text-xs font-medium text-stone-400">Muted</span>
              )}
            </div>

            {/* Bouncing Audio Visualizer Meter */}
            <div className="mt-3">
              <div className="flex items-center gap-1.5 h-6 bg-black/40 rounded-lg px-2.5 py-1 border border-white/10">
                {Array.from({ length: 18 }).map((_, idx) => {
                  const threshold = (idx + 1) * (100 / 18);
                  const isBarLit = isAudioOn && audioLevel >= threshold;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all duration-75 ${
                        isBarLit
                          ? idx > 13
                            ? "bg-amber-400 h-4"
                            : "bg-[#7eb8aa] h-3.5"
                          : "bg-white/10 h-1.5"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400">
                <span>
                  {isAudioOn
                    ? audioLevel > 5
                      ? "Sound detected! Mic is working."
                      : "Speak to test microphone volume."
                    : "Microphone is muted."}
                </span>
                <span className="font-mono text-stone-500">{audioLevel}%</span>
              </div>
            </div>
          </div>

          {/* Speaker Sound Test Card */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#44666C]/30 text-[#7eb8aa]">
                  <Volume2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Speaker Test
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Check if you can hear audio
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Click below to play a test chime and ensure your speakers or
              headphones are functioning.
            </p>

            <button
              type="button"
              onClick={handleTestSpeaker}
              disabled={isTestingSpeaker}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold transition ${
                isTestingSpeaker
                  ? "bg-[#44666C] text-white border-transparent"
                  : "bg-white/5 text-stone-200 hover:bg-white/10"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>
                {isTestingSpeaker
                  ? "Playing Test Chime…"
                  : "Play Test Sound"}
              </span>
            </button>
          </div>

          {/* Join Meeting Action Section */}
          <div className="rounded-2xl border border-white/10 bg-linear-to-b from-white/6 to-white/2 p-5 flex flex-col gap-3">
            {isBeforeAllowedJoin ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-700/60 px-5 py-3 text-sm font-semibold text-stone-400 cursor-not-allowed border border-white/5"
                >
                  <Lock className="h-4 w-4" />
                  <span>Join Call (Available in {formatCountdown(secondsUntilAllowed)})</span>
                </button>
                <p className="text-[11px] text-stone-400 text-center leading-normal">
                  You will be able to join 5 minutes before the meeting start
                  time. The button will unlock automatically.
                </p>
              </div>
            ) : isMeetingEnded ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-700/60 px-5 py-3 text-sm font-semibold text-stone-400 cursor-not-allowed"
                >
                  Meeting Duration Expired
                </button>
                <button
                  type="button"
                  onClick={onLeave}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-stone-300 hover:bg-white/10"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleProceedToJoin}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#44666C] hover:bg-[#365a62] px-5 py-3 text-sm font-bold text-white transition shadow-lg shadow-[#44666C]/25 cursor-pointer"
                >
                  <Video className="h-4 w-4" />
                  <span>Join Video Call Now</span>
                </button>
                <p className="text-[11px] text-emerald-400/90 text-center font-medium">
                  Meeting window is open. Ready to connect!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Device Picker Modal */}
      {showDeviceSettings && (
        <DeviceSettingsModal
          onClose={() => setShowDeviceSettings(false)}
          onDeviceChange={handleDeviceChange}
          selectedAudioInput={selectedAudioInput}
          selectedVideoInput={selectedVideoInput}
          selectedAudioOutput={selectedAudioOutput}
        />
      )}
    </div>
  );
}
