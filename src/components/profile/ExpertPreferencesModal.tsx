import { CheckCircle2, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getSpecializations,
  type Specialization,
  updateExpertPreferences,
} from "../../lib/api";

type ExpertPreferencesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ExpertPreferencesModal({
  isOpen,
  onClose,
}: ExpertPreferencesModalProps) {
  const { user, updateUserFromApi } = useAuth();

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loadingSpecs, setLoadingSpecs] = useState(true);

  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(
    user?.expertPreferences || [],
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedPrefs(user?.expertPreferences || []);
      setLoadingSpecs(true);
      getSpecializations()
        .then(setSpecializations)
        .catch(() => setError("Failed to load specializations"))
        .finally(() => setLoadingSpecs(false));
    }
  }, [isOpen, user?.expertPreferences]);

  if (!isOpen) return null;

  const togglePref = (name: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await updateExpertPreferences(selectedPrefs);
      updateUserFromApi(res.user);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-[#1a2e35] mb-4">
          Recommended Experts Preferences
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Select the types of experts you are looking for. We will use these
          preferences to recommend the best experts for you.
        </p>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {loadingSpecs ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-[#44666C]" />
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(
                specializations.reduce(
                  (acc, spec) => {
                    const domain = spec.domain.name;
                    if (!acc[domain]) acc[domain] = [];
                    acc[domain].push(spec);
                    return acc;
                  },
                  {} as Record<string, Specialization[]>,
                ),
              ).map(([domainName, specs]) => (
                <div key={domainName}>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {domainName}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specs.map((spec) => {
                      const isSelected = selectedPrefs.includes(spec.name);
                      return (
                        <button
                          key={spec.id}
                          onClick={() => togglePref(spec.name)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center gap-2 ${
                            isSelected
                              ? "bg-[#44666C] border-[#44666C] text-white"
                              : "bg-white border-gray-300 text-gray-700 hover:border-[#44666C] hover:text-[#44666C]"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                          {spec.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loadingSpecs}
            className="px-5 py-2.5 rounded-xl font-medium bg-[#44666C] text-white hover:bg-[#365a62] flex items-center gap-2 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
