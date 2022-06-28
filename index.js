
//import './js/script.js'
//import './css/style.css'

const path = require('path');
const express = require('express');
//const wialon = require('dist/wialon-src.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
