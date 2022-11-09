const mysql = require("mysql2");
const wialon = require('wialon');
const express = require('express');
const app = express();
app.use(express.json());
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "dbtest",
    password: ""
});
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});




const session = wialon().session;
function init() {

    session.start({ token: '0f481b03d94e32db858c7bf2d8415204289C57FB5B35C22FC84E9F4ED84D5063558E1178' })
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            // console.log(data  arr = Object.values(result);

            getMainInfo();
        })



    //setInterval(getMainInfo, 1000);
}
init()


function getMainInfo() {
    const prms1 = {
        "unitId": 25594204,
        "sensors": []
    };
    session.request('unit/calc_last_message', prms1)
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            //console.log(data);
            arr = Object.values(data);
            arrayD = [];
            arrayD.push(arr[0]); arrayD.push(arr[2]); arrayD.push(arr[1]); arrayD.push(arr[9]);
            arrayD.push(arr[8]); arrayD.push(arr[7]); arrayD.push(arr[6]); arrayD.push(arr[3]);
            arrayD.push(arr[5]); arrayD.push(arr[4]); arrayD.push(arr[25]); arrayD.push(arr[26]);
            arrayT = [];
            arrayT.push(arr[18]); arrayT.push(arr[17]); arrayT.push(arr[14]); arrayT.push(arr[16]);
            arrayT.push(arr[13]); arrayT.push(arr[15]); arrayT.push(arr[10]); arrayT.push(arr[12]);
            arrayT.push(arr[11]); arrayT.push(arr[19]); arrayT.push(arr[28]); arrayT.push(arr[27]);
            console.log(arrayD);
            ;
            const testt = [[45, 20, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
            // updatet(testt)


        })


    const flags = 1 + 1026
    const prms = {
        "spec": {
            "itemsType": "avl_unit",
            "propName": "sys_name",
            "propValueMask": "*",
            "sortType": "sys_name"
        },
        "force": 1,
        "flags": flags,
        "from": 0,
        "to": 0
    };


    session.request('core/search_items', prms)
        .catch(function (err) {
            console.log(err);
        })
        .then(function (data) {
            arr1 = Object.values(data);
            sensors = Object.entries(arr1[5][0].lmsg.p)
            /*
                        function math() {
                            return Math.floor(Math.random() * 10);
                        }
                        arrD = [Array(2).fill(0).map(math)];
                        arrD1 = [Array(2).fill(0).map(math)];
                        arrDres = [];
                        arrDres.push(arrD, arrD1)*/
            console.log(sensors)
        })






}
/*
app.get('/db', (req, res) => {
    console.log(res.json())
})*/

/*
function updatet(arr) {
    const sql = `INSERT INTO sensors(a,b,c,d,e,f,g,h,j,k,l,m) VALUES ?`;
    connection.query(sql, [arr], function (err, results) {
        if (err) console.log(err);
        console.log(results);
    });
}*/
