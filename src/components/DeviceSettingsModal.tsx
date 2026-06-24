import { useEffect, useState, useRef } from "react";
import { X, Camera, Mic, Volume2, ChevronDown, Check } from "lucide-react";

interface DeviceSettingsModalProps {
  onClose: () => void;
  onDeviceChange: (
    deviceId: string,
    kind: "audioinput" | "videoinput" | "audiooutput",
  ) => void;
  selectedAudioInput: string;
  selectedVideoInput: string;
  selectedAudioOutput: string;
}

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) ||
    options.find((opt) => opt.value === "default") ||
    options[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors hover:bg-white/10 ${isOpen ? "border-[#7eb8aa] bg-white/10" : "focus:border-[#7eb8aa]"}`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-[#121a24] p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-stone-500">
              No devices found
            </div>
          ) : (
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-left transition-colors ${
                  value === opt.value
                    ? "bg-[#44666C]/20 text-[#7eb8aa] font-medium"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="truncate pr-2">{opt.label}</span>
                {value === opt.value && (
                  <Check className="h-4 w-4 shrink-0 text-[#7eb8aa]" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
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

  const videoInputOptions = videoInputs.map((d, idx) => ({
    value: d.deviceId,
    label: d.label || `Camera ${idx + 1}`,
  }));

  const audioInputOptions = audioInputs.map((d, idx) => ({
    value: d.deviceId,
    label: d.label || `Microphone ${idx + 1}`,
  }));

  const audioOutputOptions = audioOutputs.map((d, idx) => ({
    value: d.deviceId,
    label: d.label || `Speaker ${idx + 1}`,
  }));

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

        <div className="flex flex-col gap-6">
          {/* Camera Selection */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-stone-300">
              <Camera className="h-4 w-4 text-[#7eb8aa]" />
              Camera
            </label>
            <CustomSelect
              options={videoInputOptions}
              value={selectedVideoInput}
              onChange={(val) => onDeviceChange(val, "videoinput")}
              placeholder="Select Camera"
            />
          </div>

          {/* Microphone Selection */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-stone-300">
              <Mic className="h-4 w-4 text-[#7eb8aa]" />
              Microphone
            </label>
            <CustomSelect
              options={audioInputOptions}
              value={selectedAudioInput}
              onChange={(val) => onDeviceChange(val, "audioinput")}
              placeholder="Select Microphone"
            />
          </div>

          {/* Speaker Selection */}
          {audioOutputs.length > 0 && (
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-stone-300">
                <Volume2 className="h-4 w-4 text-[#7eb8aa]" />
                Speaker
              </label>
              <CustomSelect
                options={audioOutputOptions}
                value={selectedAudioOutput}
                onChange={(val) => onDeviceChange(val, "audiooutput")}
                placeholder="Select Speaker"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
