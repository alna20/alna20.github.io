// Import node modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8008;
const script = require('./src/script');
const path = './data/orders';

// Middleware
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( express.json() );
app.set('view engine', 'ejs');
app.set('json spaces', 4);

app.get('/', (req, res) => {
    res.render('main');
});

// Orders
app.get('/orders', (req, res) => {
    res.send(script.readJson(path))
});

app.post('/orders', (req, res) => {
    let orders = script.readJson(path);
    let data = req.body;
    const today = new Date();

    orders.push({
        "TimeAdded": today,
        "Name": `${data.firstname} ${data.lastname}`,
        "Tel": data.phoneNumber,
        "Email": data.email,
        "Adress": data.adress,
        "Pin": data.markerLink,
        "ImageScr": data.imageSrc
    });


    // write to file
    script.writeJson(path, orders);

    //
    res.send('New order created');
});

// Host
app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
);