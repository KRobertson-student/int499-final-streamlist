export function registerServiceWorker(browserWindow = globalThis.window) {
  if (
    !browserWindow?.navigator ||
    !('serviceWorker' in browserWindow.navigator)
  ) {
    return false;
  }

  browserWindow.addEventListener('load', () => {
    browserWindow.navigator.serviceWorker
      .register('service-worker.js')
      .catch(() => {
        // Registration can fail in restricted browsers or non-HTTPS previews.
      });
  });

  return true;
}
