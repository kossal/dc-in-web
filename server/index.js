const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const {postEvaluation} = require('./controllers/evaluationController');

dotenv.config({ path: './config.env' });

console.log(process.env.NODE_ENV);

// Global exception failure handle safety net
process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    console.log('UNHANDLE EXCEPTION: shutting down...');
    // eslint-disable-next-line no-console
    console.log(err.name, err.message);

    process.exit(1); // 0 success 1 uncaught exception
});

// Using SET NODE_ENV writes a whitespace at the end, so trim it
if (process.env.NODE_ENV.trim() === 'production') {
    process.env.NODE_ENV = process.env.NODE_ENV.trim();
}

// Check NODE_ENV is set
if (!process.env.NODE_ENV) {
    throw new Error(
        'NODE_ENV must be set in the enviroment variables for this program to work'
    );
}
if (
    !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'production'
    )
) {
    throw new Error(
        `NODE_ENV enviroment variable can only accept two values: development and production. Actual NODE_ENV is ${process.env.NODE_ENV}`
    );
}

const app = express();

// Logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('dist'))

app.post('/evaluate', upload.single('photo-upload'), postEvaluation);

app.listen(3000, () => console.log('Listening on port 3000!'))