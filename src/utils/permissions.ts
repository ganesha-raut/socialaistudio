/**
 * SocialAI Studio Native Permissions Utility
 * Handles Web Push Notifications & Device Media Gallery Permissions
 */

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop/mobile notifications.");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const requested = await Notification.requestPermission();
    return requested === "granted";
  }

  return false;
};

export const sendBackgroundNotification = async (title: string, body: string) => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Check if ServiceWorker registration is available for background push
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification(title, {
        body,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "socialai-generation-complete",
        renotify: true,
      } as NotificationOptions);
      return;
    }

    // Fallback Web Notification API
    new Notification(title, {
      body,
      icon: "/icon-192.png",
    });
  } catch (e) {
    console.warn("Failed sending background notification:", e);
  }
};
