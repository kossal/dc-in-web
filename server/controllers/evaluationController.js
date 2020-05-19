const fs = require('fs');
const {promisify} = require('util');
const asyncWrapper = require('../utils/asyncWrapper');
const { createCanvas, loadImage } = require('canvas');
const tf = require('@tensorflow/tfjs-node');

const evaluate = async photo => {
    // Create canvas
    const canvas = createCanvas(150, 150);
    const ctx = canvas.getContext('2d');
    const image = await loadImage(photo);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 150, 150);

    // Save file
    const buf = canvas.getDataImage();
    const tfimage = tf.node.decodeImage(buf);

    const model = await tf.loadLayersModel('../jsmodel/model.json');
    const values = await model.predict(tfimage).data();
    const res = Array.from(values);

    console.log(res);

};

exports.postEvaluation = asyncWrapper(async (req, res) => {

    await evaluate(req.file.buffer);

    const evaluation = {
        classification: 'Dog',
        score: Math.random()
    }

    res.status(200).json({
        status: 'success',
        results: 2,
        data: evaluation
    });

});