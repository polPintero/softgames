import './styles/style.css';
import { Application } from 'pixi.js';
import setup from './setup';
import Card from './Cards/Card';

const app = new Application();

(async () => {
  await setup(app);
  const cards = new Card({ count: 144, app });
  app.stage.addChild(cards.cardList);
  const animationDuration = 2000;
  app.ticker.add((time) => {
    cards.animation(animationDuration, time);
  });
})();
