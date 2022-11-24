
const wialon = require('wialon');
const express = require('express');
const connection = require('./db')
const { allParams, lostSens } = require('./sort')

const { prms1, prms } = require('./params')
const app = express();
app.use(express.json());



const session = wialon().session;
function init() {
    //console.log('init')
    session.start({ token: '0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178' })
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            setInterval(getMainInfo, 5000);

        })

}
init()

function getMainInfo() {
    // console.log('запуск')
    session.request('unit/calc_last_message', prms1)
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            lostSens(data)
            //  console.log(pressureSensor, temperatureSensor)
        })

    session.request('core/search_items', prms)
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            allParams(data)
            //console.log(sensors)
            //sens = JSON.stringify(sensors)
            // console.log(sens)
            const selectBase = `SELECT id FROM params WHERE 1`
            connection.query(selectBase, function (err, results) {
                if (err) console.log(err);
                //console.log(results);
                //console.log(results.length);
                if (results.length == 0) {
                    // const datas = [['M', 300], ['R', 200], ['P', 500]]
                    const sql = `INSERT INTO params(name,value) VALUES?`;
                    connection.query(sql, [sensors], function (err, results) {
                        if (err) console.log(err);
                        // console.log(results);
                    });
                    connection.end();
                }
                else if (results.length > 0) {
                    let count = 0;
                    sensors.forEach(el => {
                        count++
                        const sql = `UPDATE params  SET name='${el[0]}', value='${el[1]}' WHERE id=${count}`;
                        // const data = [34, "Tom"];
                        connection.query(sql, function (err, results) {
                            if (err) console.log(err);
                            //  console.log(results);
                        });
                        //  connection.end();
                    })
                }
            });


        })


}









//const y = c
module.exports = getMainInfo



/*
app.get('/db', (req, res) => {
    console.log(res.json())
})*/

/*
function updatet(arr) {
    const sql = `INSERT INTO sensors(a, b, c, d, e, f, g, h, j, k, l, m) VALUES ? `;
    connection.query(sql, [arr], function (err, results) {
        if (err) console.log(err);
        console.log(results);
    });
}*/
