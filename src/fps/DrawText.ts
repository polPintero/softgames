import { Text, Application } from 'pixi.js';

class DrawText {
  app: Application;
  fill: string;
  fontFamily: string;
  fontSize: number;
  text: Text | null;

  constructor(app: Application) {
    this.app = app;
    this.fontFamily = 'Helvetica, sans-serif';
    this.fontSize = 24;
    this.fill = 'white';
    this.text = null;
  }

  drawText(msg: string): void {
    if (!this.text) {
      this.text = new Text({ text: msg, style: this.createStyles() });
      this.app.stage.addChild(this.text);
    } else {
      this.text.text = msg;
    }
  }

  createStyles(): { fontFamily: string; fontSize: number; fill: string } {
    return {
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fill: this.fill,
    };
  }
}

export default DrawText;
