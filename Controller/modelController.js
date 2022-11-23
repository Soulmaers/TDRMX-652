const response = require('../response')
//const wialon = require('wialon');
//const getMainInfo = require('../settings/config')
const connection = require('../settings/db')


exports.deleteView = (req, res) => {
    console.log(req.body)
    console.log('запрос')
    try {
        const postModel = "DELETE FROM `model` WHERE 1"
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
    console.log('запрос')
    try {
        const postModel = "INSERT INTO `model`(`osi`, `trailer`,`tyres`) VALUES('" + req.body[0] + "', '" + req.body[1] + "', '" + req.body[2] + "')"
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
/*
const selectBase = `SELECT id FROM model WHERE 1`
connection.query(selectBase, function (err, results) {
    if (err) console.log(err);
    if (results.length == 0) {
        const sql = "INSERT INTO `model`(`osi`, `trailer`,`tyres`) VALUES('" + req.body[0] + "', '" + req.body[1] + "', '" + req.body[2] + "')";
        connection.query(sql, function (err, results) {
            if (err) console.log(err);
            // console.log(results);
        });
        //  connection.end();
    }
    else if (results.length > 0) {
        let count = 0;
        req.body.forEach(el => {
            count++
            const sql = `UPDATE model  SET osi='${el[0]}', trailer='${el[1]}', tyres='${el[1]}' WHERE id=${count}`;
            // const data = [34, "Tom"];
            connection.query(sql, function (err, results) {
                if (err) console.log(err);
                //  console.log(results);
            });
            //  connection.end();
        })
    }
});
} catch (e) {
console.log(e)
}*/









/*
   
}*/


exports.modelView = (req, res) => {
    console.log('ответ')
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