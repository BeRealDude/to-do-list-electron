require('dotenv').config();

const { NODE_ENV } = process.env;

const { PORT = 3000 } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
};