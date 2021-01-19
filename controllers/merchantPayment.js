const Flutterwave = require('flutterwave-node-v3');
const dotenv = require('dotenv');

dotenv.config();

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
