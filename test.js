const { createCanvas, loadImage } = require('canvas');
const tf = require('@tensorflow/tfjs-node');
const { v4 } = require('uuid');
const fs = require('fs');

const evaluate = async photo => {
    // Create canvas
    const canvas = createCanvas(150, 150);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const image = await loadImage(photo);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 150, 150);

    // Save file
    const buf = canvas.toBuffer();
    fs.writeFileSync('test.jpg', buf);
    const tfimage = tf.node.decodeImage(buf, 3).reshape([1, 150, 150, 3]).div(tf.scalar(255));
    const model = await tf.loadLayersModel('file://model/model.json');
    const prediction = await model.predict(tfimage).data();

    console.log(prediction);

};

const prepareImage = async photo => {

    const image = await loadImage(photo);

    // Create canvas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 150, 150);

    // Write to file
    const buf = canvas.toBuffer();
    fs.writeFileSync('test.jpg', buf);

};

// prepareImage('./server/temp/cutest-1.jpg');

evaluate('./server/temp/cutest-3.jpg');