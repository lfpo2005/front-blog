if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      },
      function (err) {
        console.error('Falha ao registrar o Service Worker:', err);
      }
    );
  });
}
