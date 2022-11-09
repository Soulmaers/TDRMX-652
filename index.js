

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')


const app = express();


//const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname, 'public')))


const indexHTML = path.resolve(__dirname, './public/index.html');
app.use('/', express.static('public'));
app.get('/', (req, res) => res.sendFile(indexHTML));


app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
