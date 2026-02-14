export const BACKEND_URL = "https://api.mindcurepath.com";
// export const BACKEND_URL = "http://localhost:3000";

/**
 * Constructs a full avatar URL from a backend avatar value.
 * Handles both full URLs and relative paths.s
 * @param avatar - The avatar value from the backend (can be null, undefined, or a string)
 * @returns The full avatar URL or undefined if the avatar is invalid
 */
export function getAvatarUrl(
  avatar: string | null | undefined,
): string | undefined {
  if (!avatar || typeof avatar !== "string") return undefined;
  const trimmed = avatar.trim();
  if (!trimmed) return undefined;

  // If it's already a full URL (starts with http:// or https://), use it as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // If it's a relative path starting with /, prefix with BACKEND_URL
  if (trimmed.startsWith("/")) {
    return `${BACKEND_URL}${trimmed}`;
  }

  // Otherwise, assume it's a relative path and prefix with BACKEND_URL/
  return `${BACKEND_URL}/${trimmed}`;
}

/**
 * Update the current user's phone number.
 * Requires auth token in localStorage.
 * @returns Response with message and updated user
 */
export async function updatePhone(phoneNumber: string): Promise<{
  message: string;
  user: Record<string, unknown>;
}> {
  const token =
    window.localStorage.getItem("auth:token") ||
    window.localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${BACKEND_URL}/api/v1/profile/update-phone`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 401 ? "Unauthorized" : "Failed to update phone number"),
    );
  }

  return data as { message: string; user: Record<string, unknown> };
}
