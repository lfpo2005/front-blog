if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
      },
      function (err) {
        console.error('Falha ao registrar o Service Worker:', err);
      }
    );
  });
}
