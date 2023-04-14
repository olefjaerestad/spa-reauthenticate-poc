import { readFile } from 'fs/promises';
import { fastify } from 'fastify';
import fastifyCookie from '@fastify/cookie';

let AUTH_COOKIE = 0;

const app = fastify();
app.register(fastifyCookie);

app.get('/', async (req, rep) => {
  const indexHtml = await readFile('./index.html');
  rep
    .header('Content-Type', 'text/html')
    .header('Set-Cookie', `auth_cookie=${++AUTH_COOKIE}; HttpOnly; SameSite=Lax; Path=/;`)
    .send(indexHtml);
});

app.get('/client.js', async (req, rep) => {
  const clientJs = await readFile('./client.js');
  rep
    .header('Content-Type', 'application/javascript')
    .send(clientJs);
});

app.get('/api/refresh-cookie', async (req, rep) => {
  rep
    .header('Content-Type', 'text/plain')
    .header('Set-Cookie', `auth_cookie=${++AUTH_COOKIE}; HttpOnly; SameSite=Lax; Path=/;`)
    .send('Hello api');
});

app.get('/api/check-cookie', async (req, rep) => {
  const clientCookie = req.cookies['auth_cookie'];
  const isValid = clientCookie ? parseInt(clientCookie) === AUTH_COOKIE : false;

  rep.header('Content-Type', 'text/plain');

  if (isValid) {
    rep.send('Cookie is valid');
  } else {
    rep.status(401).send('Cookie is invalid');
  }
});

app.listen({host: '0.0.0.0', port: 3000}, () => console.log('Listening on port 3000'))
