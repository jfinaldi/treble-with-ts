import P5 from "p5";
import * as Tone from "tone";
import { Visualizer } from "../Visualizers";

let particles: Particle[] = [];
export const RockVisualizer = new Visualizer(
  "RockItVisualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.001);
    p5.stroke(255);
    p5.noFill();

    p5.translate(width / 2, height / 2);

    const values: number[] = Object.values(analyzer.getValue()).map(
      (val) => val as number
    );
    const orgMin = Math.min(...values);
    const orgMax = Math.max(...values);
    p5.beginShape();
    // p5.fill(255);
    for (let i = 0; i <= 180; i++) {
      let index = Math.floor(p5.map(i, 0, width, 0, values.length - 1));

      let r = p5.map(
        values[index],
        orgMin,
        orgMax,
        60,
        Math.min(width, height) / 2 - 50
      );
      if (r <= 60 || !r || isNaN(r)) {
        r = 60;
      }
      console.log(r);
      let x = r * Math.sin((i * 180) / Math.PI);
      let y = r * Math.cos((i * 180) / Math.PI);
      p5.vertex(x, y);
    }
    p5.endShape();

    let p = new Particle(p5);
    particles.push(p);
    const bias = values.reduce((a, b) => a + b, 0);
    for (let j = 0; j < particles.length; j++) {
      if (particles[j]) {
        console.log("particle: ", particles[j].posX);
        particles[j].update(bias);
        particles[j].show();
        if (particles[j].isOutsideCanvas()) particles.splice(j, 1);
      }
    }
    p5.fill(0);
    p5.ellipse(0, 0, 115);
  }
);

class Particle {
  p5: P5;
  posX: any;
  posY: any;
  vel: any;
  orgAcc: any;
  acc: any;
  radius: any;
  constructor(p5: P5) {
    this.p5 = p5;
    this.posX = 0;
    this.posY = 0;
    this.vel = [0, 0];
    this.orgAcc = [
      (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.05),
      (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.05),
    ];
    this.acc = [...this.orgAcc];
    this.radius = p5.random(3, 5);
  }

  update(bias: number) {
    console.log(bias);
    if (bias <= 0 || !bias || isNaN(bias)) {
      this.acc = [...this.orgAcc];
    } else {
      this.acc = [this.acc[0] * Math.abs(bias), this.acc[1] * Math.abs(bias)];
    }
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.posX += this.vel[0];
    this.posY += this.vel[1];
  }

  isOutsideCanvas() {
    return (
      this.posX > window.innerWidth / 2 ||
      this.posX < -window.innerWidth / 2 ||
      this.posY > window.innerHeight / 2 ||
      this.posY < -window.innerHeight / 2
    );
  }

  show() {
    this.p5.noStroke();
    this.p5.fill(255);
    this.p5.ellipse(this.posX, this.posY, this.radius);
  }
}
