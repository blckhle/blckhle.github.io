// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://blckhle.github.io/1/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 520);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  whoFunction();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill('red');
  textSize(70);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

function whoFunction() {
  var x = document.createElement("IFRAME");
  x.setAttribute("src", "");
  x.style.width = '640px';x.style.display = 'none';
  x.style.height = '520'
  document.body.appendChild(x);
}
