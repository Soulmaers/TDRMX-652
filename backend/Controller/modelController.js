const response = require('../response')
//const wialon = require('wialon');
//const getMainInfo = require('../settings/config')
const connection = require('../settings/db')


exports.deleteView = (req, res) => {
    console.log(req.body)
    // console.log('запрос')
    try {
        const postModel = "DELETE FROM model"
        connection.query(postModel, function (err, results) {
            if (err) console.log(err);
            //console.log(results)
            response.status(200, results, res)
        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.model = (req, res) => {
    console.log(req.body)
    //  console.log('запрос')
    try {
        const postModel = `INSERT INTO model(osi, trailer, tyres) VALUES?`
        connection.query(postModel, [req.body], function (err, results) {
            if (err) console.log(err);
            //console.log(results)
            response.status(200, results, res)
        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.modelView = (req, res) => {
    // console.log('ответ')
    try {
        const selectBase = `SELECT osi, trailer,tyres FROM model WHERE 1`
        connection.query(selectBase, function (err, results) {
            if (err) console.log(err);
            //console.log(results)
            response.status(200, results, res)
        })
    }
    catch (e) {
        console.log(e)
    }
}