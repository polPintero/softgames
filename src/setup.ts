import { Application } from 'pixi.js';

export default async function setup(app: Application) {
  await app.init({ resizeTo: window });
//   await app.init({ background: '#1099bb', resizeTo: window });
  document.body.appendChild(app.canvas);
}
