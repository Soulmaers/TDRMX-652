const response = require('../response')
//const wialon = require('wialon');
const getMainInfo = require('../settings/config')
const connection = require('../settings/db')



exports.datawialon = (req, res) => {

    //   console.log('запрос')
    try {
        const selectBase = `SELECT name, value FROM params WHERE 1`
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