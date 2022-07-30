/* const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host	:	'34.67.140.163', // 'localhost',
	user 	:	'root', 	// 'master',
	password:	'test1234', 	// 'secret',
	database:	'khanh_new' 	// 'myfooddatabase'
}); */

const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const createUnixSocketPool = mysql.createConnection({
		user : 'root',
		password: 'test1234',
		database: 'khanh_new',
		host: '34.67.140.163'
});

const app = express();
app.use(bodyParser.json());
// createUnixSocketPool.connect();

createUnixSocketPool.connect(function (err) {
	if (!err) {
		console.log("Database is connected");
	} else {
		throw err;
	}
});

createUnixSocketPool.query('SELECT * FROM Product LIMIT 10', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});


app.get('./getProductData', (req, res) => {
	console.log('getting all data');
	query = `select * from Product limit 5;`;
	connection.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'Lookup successful', 'allDataResponse' : results});
	});
});


// app.get('/', (req, res) => {
// 	res.sendFile('index.html', { root: __dirname + "/static" } ) ;
// });

// app.get('./getAllDataRequest', (req, res) => {
// 	console.log('getting all data');
// 	query = `select * from Product limit 5;`;
// 	connection.query(query, function(err, results, fields) {
// 		console.log(results);
// 		res.json({'message' : 'Lookup successful', 'allDataResponse' : results});
// 	});
// });

/*

app.post('/addData', (req, res) => {
	console.log('added data: ');
	console.log(req.body);
	let food  = req.body.food.replace(/^[0-9\s]*|[+*\r\n]/g, '');
	let place = req.body.place.replace(/^[0-9\s]*|[+*\r\n]/g,'');
	let price = req.body.price;
	query = `INSERT INTO myfoodtable (food, place, price) VALUES ('`+food+`', '`+place+`', '`+price+`');`;
	console.log(query);
	connection.query(query, function(err, results, fields) {
		console.log(err);
		console.log(results);
		res.json({'message': 'Lookup successful.', 'datas':results});
	});
});

app.get('/getDatas', (req, res) => {
	console.log('getting datas.');
	query = `SELECT food, place, price FROM myfoodtable;`;
	connection.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message':'Lookup successful', 'datas':results});
	});
});

app.get('/getSearchedDatas', (req, res) => {
	console.log('getting searchedDatas.');
	// let food = req.body.food.replace(/^[0-9]\s*|[+*\r\n]/g, '');
	let food = req.body.food;
	query = `SELECT food, place, price FROM myfoodtable;`;
	console.log(query);
	connection.query(query, function(err, results, fields) {
		console.log(err);
		console.log(results);
		res.json({'message': 'Lookup successful.', 'searchedDatas':results});
	});
});

*/

// Listen to the App Engine-specified port, or 8080
// const PORT = 80;
// app.listen(PORT, () => {
// 	console.log('Server listening on port ${PORT}...');
// });
