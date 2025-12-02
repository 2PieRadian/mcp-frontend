import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DateOfBirthCard() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(() => {
    if (user?.dateOfBirth) {
      const date = new Date(user.dateOfBirth);
      return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    }
    return "";
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const formatDateForDisplay = (iso?: string) => {
    if (!iso) return "Not set yet";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Not set yet";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSave = async () => {
    if (!dateOfBirth) {
      setError("Please select a date");
      setStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setError("You are not authenticated.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/profile/update-date-of-birth",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ dateOfBirth }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(
          data?.message || text || "Failed to update date of birth"
        );
      }

      const updatedUser = data.user;

      // Update auth context
      login({
        id: String(updatedUser.id),
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatar || undefined,
        phoneNumber: updatedUser.phoneNumber || undefined,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth || undefined,
        gender: updatedUser.gender || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setStatus("success");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Failed to update date of birth");
      setStatus("error");
    }
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Date of Birth
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          {isEditing ? (
            <div className="flex flex-col gap-[6px] mt-[6px]">
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                max={new Date().toISOString().split("T")[0]}
                className="border border-border-light rounded-full px-[12px] py-[8px] sm:py-[6px] text-[13px] sm:text-[14px] bg-input-bg outline-none focus:ring-2 focus:ring-primary/30 w-full"
              />
              <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={status === "saving" || !dateOfBirth}
                  className="cursor-pointer bg-primary text-light-100 text-[11px] sm:text-xs font-medium rounded-full px-[12px] sm:px-[14px] py-[8px] sm:py-[6px] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "saving" ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (user?.dateOfBirth) {
                      const date = new Date(user.dateOfBirth);
                      setDateOfBirth(date.toISOString().split("T")[0]);
                    } else {
                      setDateOfBirth("");
                    }
                    setIsEditing(false);
                    setStatus("idle");
                    setError(null);
                  }}
                  className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[8px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                >
                  Cancel
                </button>
                {status === "success" && (
                  <span className="text-xs text-green-600">Date updated</span>
                )}
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
              <p className="font-medium">
                {formatDateForDisplay(user?.dateOfBirth)}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (user?.dateOfBirth) {
                    const date = new Date(user.dateOfBirth);
                    setDateOfBirth(date.toISOString().split("T")[0]);
                  } else {
                    setDateOfBirth("");
                  }
                  setIsEditing(true);
                  setStatus("idle");
                  setError(null);
                }}
                className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[6px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex-shrink-0"
              >
                {user?.dateOfBirth ? "Edit" : "Set"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
