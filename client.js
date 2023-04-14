document.getElementById('refreshCookieWithFetch').addEventListener('click', () => {
  fetch('/api/refresh-cookie', { credentials: 'same-origin' })
    .then(async (response) => console.log(await response.text()));
});

document.getElementById('refreshCookieInNewWindow').addEventListener('click', () => {
  const newWindow = window.open('/?refresh-cookie');

  // We can either take a best guess at how long reauthentication takes:
  // setTimeout(() => newWindow.close(), 3000);

  // Or we can let the new window decide when reauthentication is done:
  newWindow.addEventListener('DOMContentLoaded', () => {
    newWindow.close();
  });
});

document.getElementById('checkCookieValidity').addEventListener('click', () => {
  fetch('/api/check-cookie', { credentials: 'same-origin' })
    .then(async (response) => {
      const result = await response.text();
      console.log(result);
      document.getElementById('cookieValidity').innerText = result;
    });
});
