/* eslint-disable no-undef */

const notificationData = {};

self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, data.content);
  if (data.redirectData) {
    notificationData.club = data.redirectData.club;
    notificationData.post = data.redirectData.post;
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({ type: "window" })
      .then((clients) =>
        clients.filter(
          (client) =>
            client.url.includes("http://localhost:8081/") || client.url.includes("https://www.app.reaflect.com/")
        )
      )
      .then((matchingClients) => {
        if (matchingClients[0]) {
          return matchingClients[0]
            .navigate(`/${notificationData.club}/post/${notificationData.post}`)
            .then((client) => client.focus());
        }

        return clients.openWindow(`/${notificationData.club}/post/${notificationData.post}`);
      })
  );
});
