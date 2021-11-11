// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

const RADIUS_DEFAULT = 69;
const X_SCAL = [0.97, 0.92, 0.17];
const Y_SCAL = [0.17, 1.25, 0.83];
const RGB_SCAL = 127;
const RGB_MAX = 255;
export const CatVisualizer = new Visualizer(
  'DJ KittyCat',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const values = analyzer.getValue();
    let rad: number = RADIUS_DEFAULT; // radius of cat head circle
    
    // default location of shape is center
    let x: number = (width / 2) - rad;
    let y: number = height / 2;

    // pick a random element in values to tie color to the notes
    const randValueElem = values[Math.floor(Math.random() * values.length - 1)] as number;
    let randElem = Math.abs(randValueElem - 127);

    // get the first number in values for checking if a note was played
    const value = Math.ceil(values[0] as number);

    // background rgb values default
    let r: number = 165;
    let g: number = 55;
    let b: number = 253;
    let a: number = 16;

    // cathead color default (white)
    let r1 = RGB_MAX;
    let g1 = RGB_MAX;
    let b1 = RGB_MAX;
    
    // if a note was played
    if(value !== 0) {
      // place the shape in a random area in random size
      rad = Math.floor(Math.random() * RADIUS_DEFAULT - 2) + 2; 
      x = Math.floor(Math.random() * width) - rad; 
      y = Math.floor(Math.random() * height);   

      // Set the background color to random purple-pink
      r = Math.floor(Math.random() * RGB_SCAL) + randElem;
      g = Math.floor(Math.random() * RGB_SCAL);
      b = Math.floor(Math.random() * RGB_SCAL) + randElem;

      // Set the cat head color to random purple-pink
      r1 = Math.floor(Math.random() * RGB_SCAL) + randElem;
      g1 = Math.floor(Math.random() * RGB_SCAL);
      b1 = Math.floor(Math.random() * RGB_SCAL) + randElem;
    }

    p5.background(r, g, b, a); // set the background color
    p5.stroke(r1,g1,b1);       // set cat head outline color
    p5.fill(r1,g1,b1);         // set the fill of the cathead

    // cycle through every 10 tone values detected
    for(let i = 1; i < values.length; i+=10) {
      let a = values[i] as number;

      p5.circle(x,y, rad * 2);        // Draw the head
        
      // Draw left ear
      let p1x = x-(rad * X_SCAL[0]);  // left point horiz    97% of r
      let p1y = y-(rad * Y_SCAL[0]);  // left point height   17% of r
      let p2x = x-(rad * X_SCAL[1]);  // top point horiz     92% of r
      let p2y = y-(rad * Y_SCAL[1]);  // top point height    125% of r
      let p3x = x-(rad * X_SCAL[2]);  // right point horiz   17% of r
      let p3y = y-(rad * Y_SCAL[2]);  // right point height  83% of r
      p5.triangle(p1x,p1y,p2x,p2y,p3x,p3y);
        
      // Draw right ear
      let p4x = x+(rad * X_SCAL[0]);  // left point horiz    97% of r
      let p4y = y-(rad * Y_SCAL[0]);  // left point height   17% of r
      let p5x = x+(rad * X_SCAL[1]);  // top point horiz     92% of r
      let p5y = y-(rad * Y_SCAL[1]);  // top point height    125% of r
      let p6x = x+(rad * X_SCAL[2]);  // right point horiz   17% of r
      let p6y = y-(rad * Y_SCAL[2]);  // right point height  83% of r
      p5.triangle(p4x,p4y,p5x,p5y,p6x,p6y);

      if(rad > RADIUS_DEFAULT) rad = RADIUS_DEFAULT;  // reset the cat head size
    }//for
  },
);
