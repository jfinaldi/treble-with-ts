// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

// [positionY, positionX, R, G, B]
let currentDotsTowardsRight = new Set();
let currentDotsTowardsLeft = new Set();

export const FancyVisualizer = new Visualizer(
  "FancyVisualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    // p5 base setup
    const width = window.innerWidth - 320;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);

    p5.fill(255);
    // p5.noFill();

    const values = Object.values(analyzer.getValue()).map(
      (val) => val as number
    );
    const negativeValues = values
      .filter((val) => val < 0)
      .map((val) => val * -1);
    const positiveValues = values.filter((val) => val > 0);
    const rowColor = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ];
    addNewDots(negativeValues, currentDotsTowardsRight, "RIGHT", rowColor);
    addNewDots(positiveValues, currentDotsTowardsLeft, "LEFT", rowColor, width);
    moveDots(p5, "RIGHT", width);
    moveDots(p5, "LEFT", width);
  }
);

const scaleNum = (
  numberToScale: number,
  limitMin: number,
  limitMax: number,
  actualMin: number,
  actualMax: number
) => {
  // credit to https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value
  return (
    limitMin +
    ((limitMax - limitMin) * (numberToScale - actualMin)) /
      (actualMax - actualMin)
  );
};

const randomScaler = (numberToScale: number, height: number) => {
  const randScale = height - height * numberToScale * 100 * Math.random();
  return randScale < 20 ? 20 : randScale;
};

const addNewDots = (
  values: number[],
  currentDots: Set<any>,
  movement: "RIGHT" | "LEFT",
  rowColor: number[],
  width?: number,
  height?: number
) => {
  const scaledValues = values.map((val) =>
    randomScaler(val, (height ?? window.innerHeight / 2) - 20)
  );
  // const min = Math.min(...values);
  // const max = Math.max(...values);
  // const scaledValues = values.map((val) =>
  //   scaleNum(val, 20, height ?? window.innerHeight - 20, min, max)
  // );
  for (let i = 0; i < scaledValues.length; i++) {
    currentDots.add(
      JSON.stringify([
        scaledValues[i],
        movement === "RIGHT" ? 0 : width ?? window.innerWidth,
        ...rowColor,
      ])
    );
  }
};

const moveDots = (p5: P5, movement: "RIGHT" | "LEFT", width?: number) => {
  let currentDotArr = Array.from(
    movement === "RIGHT" ? currentDotsTowardsRight : currentDotsTowardsLeft
  ) as string[];
  width = width ?? window.innerWidth;
  for (let i = 0; i < currentDotArr.length; i++) {
    let position = JSON.parse(currentDotArr[i]);
    p5.stroke(
      position[2],
      position[3],
      position[4],
      scaleNum(
        movement === "RIGHT" ? width - position[1] : position[1],
        50,
        255,
        0,
        width
      )
    );
    if (movement === "RIGHT") {
      position[1] += 15;
    } else {
      position[1] -= 15;
    }
    p5.point(position[1], position[0]);
    if (
      (movement === "RIGHT" && position[1] > (width ?? window.innerWidth)) ||
      (movement === "LEFT" && position[1] < 0)
    ) {
      currentDotArr.splice(i, 1);
      continue;
    }
    currentDotArr[i] = JSON.stringify(position);
  }
  if (movement === "RIGHT") {
    currentDotsTowardsRight.clear();
    currentDotsTowardsRight = new Set(currentDotArr);
  } else {
    currentDotsTowardsLeft.clear();
    currentDotsTowardsLeft = new Set(currentDotArr);
  }
};
