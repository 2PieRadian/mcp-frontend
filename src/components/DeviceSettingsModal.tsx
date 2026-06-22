import { useEffect, useState } from "react";
import { X, Camera, Mic, Volume2 } from "lucide-react";

interface DeviceSettingsModalProps {
  onClose: () => void;
  onDeviceChange: (
    deviceId: string,
    kind: "audioinput" | "videoinput" | "audiooutput"
  ) => void;
  selectedAudioInput: string;
  selectedVideoInput: string;
  selectedAudioOutput: string;
}

export function DeviceSettingsModal({
  onClose,
  onDeviceChange,
  selectedAudioInput,
  selectedVideoInput,
  selectedAudioOutput,
}: DeviceSettingsModalProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    async function getDevices() {
      try {
        const devs = await navigator.mediaDevices.enumerateDevices();
        setDevices(devs);
      } catch (err) {
        console.error("Failed to enumerate devices", err);
      }
    }
    getDevices();
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
    };
  }, []);

  const audioInputs = devices.filter((d) => d.kind === "audioinput");
  const videoInputs = devices.filter((d) => d.kind === "videoinput");
  const audioOutputs = devices.filter((d) => d.kind === "audiooutput");

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1219] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-lg font-semibold text-white">
          Device Settings
        </h2>

        <div className="flex flex-col gap-5">
          {/* Camera Selection */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-300">
              <Camera className="h-4 w-4 text-[#7eb8aa]" />
              Camera
            </label>
            <select
              value={selectedVideoInput}
              onChange={(e) => onDeviceChange(e.target.value, "videoinput")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#7eb8aa]"
            >
              {videoInputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId} className="bg-[#0c1219] text-white">
                  {d.label || `Camera ${videoInputs.indexOf(d) + 1}`}
                </option>
              ))}
            </select>
          </div>

          {/* Microphone Selection */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-300">
              <Mic className="h-4 w-4 text-[#7eb8aa]" />
              Microphone
            </label>
            <select
              value={selectedAudioInput}
              onChange={(e) => onDeviceChange(e.target.value, "audioinput")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#7eb8aa]"
            >
              {audioInputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId} className="bg-[#0c1219] text-white">
                  {d.label || `Microphone ${audioInputs.indexOf(d) + 1}`}
                </option>
              ))}
            </select>
          </div>

          {/* Speaker Selection */}
          {audioOutputs.length > 0 && (
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-300">
                <Volume2 className="h-4 w-4 text-[#7eb8aa]" />
                Speaker
              </label>
              <select
                value={selectedAudioOutput}
                onChange={(e) => onDeviceChange(e.target.value, "audiooutput")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#7eb8aa]"
              >
                {audioOutputs.map((d) => (
                  <option key={d.deviceId} value={d.deviceId} className="bg-[#0c1219] text-white">
                    {d.label || `Speaker ${audioOutputs.indexOf(d) + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
