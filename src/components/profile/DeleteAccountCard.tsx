import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BACKEND_URL } from "../../lib/api";
import ProfileButton from "./ProfileButton";

export default function DeleteAccountCard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/profile/delete-account`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete account");
      }

      alert("Your account has been successfully deleted.");
      logout();
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-50/50 shadow-[0_2px_8px_rgba(252,165,165,0.2)] border border-red-100 rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <div className="flex items-center gap-2 mb-[12px]">
        <AlertTriangle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
        <p className="text-[12px] uppercase tracking-[0.16em] text-red-600 font-semibold">
          Danger Zone
        </p>
      </div>

      <div className="bg-white px-[12px] sm:px-4 py-[12px] sm:py-[16px] rounded-[16px] sm:rounded-[20px] border border-red-50">
        {editing ? (
          <div className="flex flex-col gap-[10px]">
            <p className="text-[14px] sm:text-[15px] text-gray-700">
              Please tell us why you are leaving (optional)
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border border-red-200 rounded-[10px] px-[12px] py-[10px] bg-white placeholder:text-gray-400 outline-none focus:border-red-400 focus:shadow-[0_2px_4px_rgba(252,165,165,0.2)] w-full min-h-[80px] resize-y"
              placeholder="Reason for deletion..."
            />
            {error && <p className="text-red-500 text-[14px] mt-1">{error}</p>}

            <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap mt-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-[16px] py-[8px] rounded-[10px] font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Delete
              </button>
              <ProfileButton
                type="button"
                onClick={() => {
                  setEditing(false);
                  setReason("");
                  setError(null);
                }}
                variant="secondary"
              >
                Cancel
              </ProfileButton>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-[8px] sm:gap-[10px]">
            <p className="font-medium text-red-600 text-[14px] sm:text-[15px] flex-1">
              Delete your account permanently
            </p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="shrink-0 px-[16px] py-[8px] border border-red-200 text-red-600 rounded-[10px] font-medium hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
