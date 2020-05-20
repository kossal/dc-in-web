const fs = require('fs');
const {promisify} = require('util');
const asyncWrapper = require('../utils/asyncWrapper');
const { createCanvas, loadImage } = require('canvas');
const tf = require('@tensorflow/tfjs-node');
const { v4 } = require('uuid');

const evaluate = async photo => {
    
    // Load photo
    const image = await loadImage(photo);

    // Create canvas
    const canvas = createCanvas(150, 150);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Preproccess image
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 150, 150);
    const buf = canvas.toBuffer();

    // Predict    
    const tfimage = tf.node.decodeImage(buf, 3).reshape([1, 150, 150, 3]).div(tf.scalar(255));
    const model = await tf.loadLayersModel('http://localhost:3000/model/model.json');
    const prediction = await model.predict(tfimage).data();

    // Save photo to later test it
    // if (process.env.NODE_ENV === 'development') {
    //     await promisify(fs.writeFile)(`./server/temp/${v4()}.jpg`, buf);
    // }

    return prediction[0];

};

exports.postEvaluation = asyncWrapper(async (req, res) => {

    const prediction = await evaluate(req.file.buffer);

    const evaluation = {
        classification: prediction >= .5 ? 'Dog' : 'Cat', 
        score: prediction
    };

    // Log evaluation in development mode
    if (process.env.NODE_ENV === 'development') {
        console.log(evaluation);
    };

    res.status(200).json({
        status: 'success',
        results: 2,
        data: evaluation
    });

});