import { Application, Graphics, Container, Ticker, ContainerChild, Sprite } from 'pixi.js';
import getRandomColor from './getRandomColor';

class Card {
  app: Application;
  cardList: Container;
  isAnimationProcess: boolean;
  animationDuration: number;
  sizeCard: number;
  animationCard: ContainerChild | null;
  startPosition: { x: number; y: number };
  pixelByMsX: number;
  pixelByMsY: number;
  skewStepY: number;
  scaleStep: number;
  wayAnimation: 'forward' | 'back';

  constructor({ count, app }: { count: number; app: Application }) {
    this.app = app;
    this.isAnimationProcess = false;
    this.cardList = new Container();
    this.animationDuration = 0;
    this.sizeCard = 200;
    this.animationCard = null;
    this.startPosition = { x: 0, y: 0 };
    this.wayAnimation = 'forward';
    this.pixelByMsX = 0;
    this.pixelByMsY = 0;
    this.skewStepY = 0;
    this.scaleStep = 0;

    this.createListCards(count);
  }

  createListCards(length: number): void {
    const centerX = this.app.screen.width / 2;
    const centerY = this.app.screen.height / 2;
    const { sizeCard } = this;
    for (let i = 0; i < length; i++) {
      const pixiRect = new Graphics();
      pixiRect.rect(centerX - sizeCard / 2, centerY - sizeCard / 2, sizeCard, sizeCard);
      pixiRect.fill(getRandomColor());
      this.cardList.addChild(pixiRect);
    }
  }

  animation(duration: number = 2000, time: Ticker): void {
    if (this.isAnimationProcess) {
      this.processAnimation(time);
      return;
    }
    this.startAnimation(duration);
    this.processAnimation(time);
  }

  startAnimation(duration: number = 2000): void {
    this.isAnimationProcess = true;
    this.animationDuration = duration;
    this.animationCard = this.cardList.children[this.cardList.children.length - 1];
    this.pixelByMsX = (this.animationCard.width * 1.6) / (duration / 2);
    this.pixelByMsY = this.animationCard.height / (duration / 2);
    this.skewStepY = 0.75 / (duration / 2);
    this.scaleStep = (1 - 0.92) / (duration / 2);
    this.startPosition.x = this.animationCard.x;
    this.startPosition.y = this.animationCard.y;
  }

  processAnimation(time: Ticker): void {
    const { animationCard, sizeCard } = this;
    if (!animationCard) return;
    const stepX = time.deltaMS * this.pixelByMsX;
    const stepY = time.deltaMS * this.pixelByMsY;
    const skewStepX = 0;
    const skewStepY = time.deltaMS * this.skewStepY;
    const scaleStep = time.deltaMS * this.scaleStep;

    if (this.wayAnimation === 'forward' && animationCard.x >= sizeCard * 1.6) {
      const nextCard = this.cardList.children[this.cardList.children.length - 2];
      nextCard.zIndex <= animationCard.zIndex - 1 ? (animationCard.zIndex -= 2) : animationCard.zIndex--;
      this.wayAnimation = 'back';
    }
    if (this.wayAnimation === 'forward') {
      animationCard.x += stepX;
      animationCard.y -= stepY;
      animationCard.scale.set(animationCard.scale.x - scaleStep);
      animationCard.skew.set(animationCard.skew.x + skewStepX, animationCard.skew.y + skewStepY);
    }
    if (this.wayAnimation === 'back') {
      animationCard.x -= stepX;
      animationCard.y += stepY;
      animationCard.scale.set(animationCard.scale.x + scaleStep);
      animationCard.skew.set(animationCard.skew.x - skewStepX, animationCard.skew.y - skewStepY);
      if (animationCard.x <= this.startPosition.x) this.stopAnimation();
    }
  }

  stopAnimation() {
    this.isAnimationProcess = false;
    this.animationDuration = 0;
    this.wayAnimation = 'forward';
    if (!this.animationCard) return;
    this.animationCard.x = this.startPosition.x;
    this.animationCard.y = this.startPosition.y;
    this.animationCard.skew.set(0, 0);
    this.animationCard.scale.set(1, 1);
    this.animationCard = null;
  }
}

export default Card;
