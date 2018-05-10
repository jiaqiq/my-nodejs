//����httpģ��
var http = require("http");
//����������
var hostName = '127.0.0.1';
//���ö˿�
var port = 8080;
//��������
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jiaqil123456',
    database: 'test'
});

connection.connect();
var sql = 'SELECT * FROM student';
var resArr = [];
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    resArr = result;
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();

// var server = http.createServer(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Access-Control-Allow-Origin', "*")
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.end("hello nodejs");

// });
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get("/get", function (req, res) {
    console.log("请求url：", req.path)
    console.log("请求参数：", req.query)
    res.send("这是get请求");
})

app.post("/post", function (req, res) {
    console.log("请求参数：", req.body);
    var result = {
        code: 200,
        msg: "post请求成功"
    };
    res.send(resArr);
});
app.listen(port, hostName, function () {
    console.log(`Server running at http://${hostName}:${port}`);
});