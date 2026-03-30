export const LOGIN_SUCCESS_TOAST_KEY = "mcp:loginSuccessToast";

export function queueLoginSuccessToast() {
  try {
    sessionStorage.setItem(LOGIN_SUCCESS_TOAST_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/** Returns true once if a login-success toast was queued, then clears the flag. */
export function consumeLoginSuccessToastPending(): boolean {
  try {
    if (sessionStorage.getItem(LOGIN_SUCCESS_TOAST_KEY) !== "1") return false;
    sessionStorage.removeItem(LOGIN_SUCCESS_TOAST_KEY);
    return true;
  } catch {
    return false;
  }
}
