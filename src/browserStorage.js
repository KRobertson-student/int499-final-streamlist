export function getBrowserStorage(browserWindow = globalThis.window) {
  if (!browserWindow) {
    return null;
  }

  try {
    return browserWindow.localStorage;
  } catch {
    return null;
  }
}
