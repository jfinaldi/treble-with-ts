import P5 from "p5";
import * as Tone from "tone";
import { Visualizer } from "../Visualizers";
let dia = 100;
export const RippleVisualizer = new Visualizer("Ripple Visualizer", (p5: P5, analyzer: Tone.Analyser) => {
  const RADIUS_DEFAULT = 69;
  const width = window.innerWidth - 150;
  const height = window.innerHeight / 2;
  const values = analyzer.getValue();
  const value = Math.ceil(values[0] as number);
  const x: number = width / 2 - RADIUS_DEFAULT;
  const y: number = height / 2;
  const offset_pos = 50;
  if (value !== 0) {
    p5.stroke(p5.random(0, 200), p5.random(0, 250), p5.random(100, 250));
    dia += 100;
  }
  if (value == 0) {
    while (dia != 100) {
      dia -= 0.5;
      p5.circle(x, y, dia);
    }
  }
  p5.strokeWeight(3);
  p5.background(0);
  p5.noFill();
  p5.circle(x - (offset_pos + (x / 2)), y, 20);
  p5.circle(x - (offset_pos + (x / 2)), y, 40);
  p5.circle(x - (offset_pos + (x / 2)), y, 60);
  p5.circle(x - (offset_pos + (x / 2)), y, dia);
  p5.circle(x, y, 20);
  p5.circle(x, y, 40);
  p5.circle(x, y, 60);
  p5.circle(x, y, dia);
  p5.circle(x + (offset_pos + (x / 2)), y, 20);
  p5.circle(x + (offset_pos + (x / 2)), y, 40);
  p5.circle(x + (offset_pos + (x / 2)), y, 60);
  p5.circle(x + (offset_pos + (x / 2)), y, dia);
});
