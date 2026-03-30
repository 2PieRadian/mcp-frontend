/** Loaded from https://<jitsi-domain>/external_api.js */
export type JitsiExternalApiInstance = {
  addEventListener: (event: string, listener: (...args: unknown[]) => void) => void;
  removeEventListener?: (
    event: string,
    listener: (...args: unknown[]) => void,
  ) => void;
  dispose: () => void;
};

export type JitsiMeetExternalAPIConstructor = new (
  domain: string,
  options: Record<string, unknown>,
) => JitsiExternalApiInstance;

declare global {
  interface Window {
    JitsiMeetExternalAPI?: JitsiMeetExternalAPIConstructor;
  }
}

export {};
