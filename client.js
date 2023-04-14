function refreshCookieWithIframe() {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');

    // Query parameter is optional. The iframe can use it if necessary.
    iframe.src = '/?refresh-cookie';
    iframe.style.position = 'fixed';
    iframe.style.opacity = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.pointerEvents = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.append(iframe);

    // We can either take a best guess at how long reauthentication takes:
    // setTimeout(() => iframe.remove(), 3000);

    // Or we can let the iframe decide when reauthentication is done:
    iframe.contentWindow.addEventListener('DOMContentLoaded', () => {
      iframe.remove();
      resolve();
    });
  });
}

function refreshCookieInNewTab() {
  return new Promise((resolve, reject) => {
    // Query parameter is optional. The new window can use it if necessary.
    const newWindow = window.open('/?refresh-cookie');

    // We can either take a best guess at how long reauthentication takes:
    // setTimeout(() => newWindow.close(), 3000);

    // Or we can let the new window decide when reauthentication is done:
    newWindow.addEventListener('DOMContentLoaded', () => {
      newWindow.close();
      resolve();
    });
  });
}

document.getElementById('refreshCookieWithIframe').addEventListener('click', async () => {
  await refreshCookieWithIframe();
  console.log('Refreshed cookie with iframe');
});

document.getElementById('refreshCookieInNewTab').addEventListener('click', async () => {
  await refreshCookieInNewTab();
  console.log('Refreshed cookie in new tab');
});

document.getElementById('refreshCookieWithFetch').addEventListener('click', () => {
  fetch('/api/refresh-cookie', { credentials: 'same-origin' })
    .then(async (response) => console.log('Refreshed cookie with fetch request'));
});

document.getElementById('checkCookieValidity').addEventListener('click', () => {
  fetch('/api/check-cookie', { credentials: 'same-origin' })
    .then(async (response) => {
      const result = await response.text();
      console.log(result);
      document.getElementById('cookieValidity').innerText = result;
    });
});
