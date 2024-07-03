import './style.css';
import { Application, Container, Texture, Sprite, PointData } from 'pixi.js';
import setup from './setup';
import Card from './Card';

const app = new Application();

(async () => {
  await setup(app);
  const cards = new Card({ count: 144, app });
  app.stage.addChild(cards.cardList);
  console.log(app);
  const animationDuration = 2000;
  app.ticker.add((time) => {
    cards.animation(animationDuration, time);
  });
})();
