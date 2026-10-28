"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { DEFAULT_CORNERS, cloneCorners, validateCorners, computeProjectiveMap, rectifyCanvas } =
  require("../assets/js/ecg-photo-perspective.js");

const near = (a, b, epsilon = .002) => assert.ok(Math.abs(a-b) < epsilon, "Expected " + a + " ~= " + b);
test("default quadrilateral is convex, and wrong/crossed/outside points are rejected", () => {
  assert.equal(validateCorners(DEFAULT_CORNERS).valid, true);
  const crossed = cloneCorners(DEFAULT_CORNERS);
  [crossed[1], crossed[2]] = [crossed[2], crossed[1]];
  assert.equal(validateCorners(crossed).valid, false);
  const outside = cloneCorners(DEFAULT_CORNERS);
  outside[0].x = -0.2;
  assert.equal(validateCorners(outside).valid, false);
  const small = [{x:.4,y:.4},{x:.6,y:.4},{x:.6,y:.6},{x:.4,y:.6}];
  assert.equal(validateCorners(small).valid, false);
});
test("true projective mapping preserves arbitrary four corners (not bilinear shortcut)", () => {
  const corners = [
    {x:0.12,y:0.07},{x:.88,y:.15},{x:.95,y:.95},{x:.05,y:.84}
  ];
  const map = computeProjectiveMap(corners);
  for(const [u,v,i] of [[0,0,0],[1,0,1],[1,1,2],[0,1,3]]) {
    const mapped = map(u,v);
    near(mapped.x,corners[i].x,1e-9);
    near(mapped.y,corners[i].y,1e-9);
  }
  const middle=map(.5,.5);
  assert.ok(middle.x > .1 && middle.x < .9);
  assert.ok(middle.y > .1 && middle.y < .9);
});
test("rectification removes pixels outside selected quadrilateral", () => {
  const original = new Uint8ClampedArray(100*100*4);
  for(let y=0;y<100;y++) for(let x=0;x<100;x++) {
    const i=(y*100+x)*4;
    const inside = x>=10 && x<=89 && y>=10 && y<=89;
    original[i]=inside?210:5;
    original[i+1]=inside?190:5;
    original[i+2]=inside?160:5;
    original[i+3]=255;
  }
  const created=[];
  const oldDocument=global.document;
  function canvas(width, height, source) {
    return {
      width,height,
      getContext() {
        return {
          getImageData(){return {data:source,width,height};},
          createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4),width:w,height:h};},
          putImageData(image){this.stored=image;created.push(image);}
        };
      }
    };
  }
  global.document={createElement:()=>canvas(1,1,null)};
  try {
    const source=canvas(100,100,original);
    const q=[{x:.1,y:.1},{x:.89,y:.1},{x:.89,y:.89},{x:.1,y:.89}];
    const result=rectifyCanvas(source,q,100);
    assert.ok(result.width >= 79);
    assert.ok(result.height >= 79);
    assert.ok(created.length === 1);
    const px=created[0].data;
    const k=((Math.floor(result.height/2)*result.width)+Math.floor(result.width/2))*4;
    assert.ok(px[k]>195 && px[k+1]>175,"center retained true paper pixels");
    assert.ok(px[0]>180,"external dark table is outside rectification");
  } finally {
    global.document=oldDocument;
  }
});
