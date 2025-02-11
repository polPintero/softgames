import './styles/style.css';
import { Application } from 'pixi.js';
import setup from './setup';
import Card from './Cards/Card';
import DrawText from './fps/DrawText';

const app = new Application();

(async () => {
  await setup(app);
  const cards = new Card({ count: 144, app });
  app.stage.addChild(cards.cardList);
  const animationDuration = 2000;
  const drawFps = new DrawText(app);
  let pause = 0;
  const pauseDuration = 1000
  app.ticker.add((time) => {
    drawFps.drawText(`FPS: ${time.FPS.toFixed(2)}`);
    if (!cards.isAnimationProcess) pause += time.deltaMS;
    if (pause < pauseDuration && !cards.isAnimationProcess) return;
    if (pause >= pauseDuration)  pause = 0;
    cards.animation(animationDuration, time);
  });
})();
