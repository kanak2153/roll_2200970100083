const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('../logging-middleware/log');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Log example on server start
log('backend', 'info', 'config', 'Backend server starting...');

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
