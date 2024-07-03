import { Application, Graphics, Container, Ticker, ContainerChild } from 'pixi.js';
import getRandomColor from './getRandomColor';

class Card {
  app: Application;
  cardList: Container;
  isAnimationProcess: boolean;
  animationDuration: number;
  sizeCard: number;
  animationCard: ContainerChild | null;
  pixelByMsX: number;
  shiftCard: number;

  constructor({ count, app }: { count: number; app: Application }) {
    this.app = app;
    this.isAnimationProcess = false;
    this.cardList = new Container();
    this.animationDuration = 0;
    this.sizeCard = Math.min(this.app.screen.width / 4, 200);
    this.animationCard = null;
    this.pixelByMsX = 0;
    this.shiftCard = 1.5;

    this.createListCards(count);
  }

  createListCards(length: number): void {
    const centerX = this.app.screen.width / 2;
    const centerY = this.app.screen.height / 2;
    const { sizeCard } = this;
    for (let i = 0; i < length; i++) {
      const pixiRect = new Graphics();
      pixiRect.rect(
        centerX - sizeCard / 2 - (sizeCard * this.shiftCard) / 2,
        centerY - sizeCard / 2,
        sizeCard,
        sizeCard
      );
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
    this.pixelByMsX = (this.animationCard.width * this.shiftCard) / duration;
  }

  processAnimation(time: Ticker): void {
    const { animationCard, sizeCard, shiftCard } = this;
    if (!animationCard) return;
    const stepX = time.deltaMS * this.pixelByMsX;
    animationCard.x += stepX;

    if (animationCard.x >= sizeCard * shiftCard) this.stopAnimation();
  }

  stopAnimation() {
    const { animationCard, sizeCard, shiftCard } = this;
    this.isAnimationProcess = false;
    this.animationDuration = 0;
    if (!animationCard) return;
    if (animationCard.x > sizeCard * shiftCard) animationCard.x = sizeCard * shiftCard;
    animationCard.zIndex--;
    this.animationCard = null;
  }
}

export default Card;
