import { LOGIN_REDIRECT_SESSION_KEY } from "./loginRedirect";
import { LOGIN_SUCCESS_TOAST_KEY } from "./loginSuccessToast";

/** Token + cached user only (expired JWT, failed /me, etc.). */
export function clearAuthTokensAndUserCache(): void {
  try {
    window.localStorage.removeItem("auth:token");
    window.localStorage.removeItem("auth:user");
    window.localStorage.removeItem("token");
  } catch {
    /* ignore */
  }
}

/** Full client auth wipe — use when the user explicitly logs out. */
export function clearAllAuthPersistence(): void {
  clearAuthTokensAndUserCache();
  try {
    window.sessionStorage.removeItem(LOGIN_REDIRECT_SESSION_KEY);
    window.sessionStorage.removeItem(LOGIN_SUCCESS_TOAST_KEY);
  } catch {
    /* ignore */
  }
}
