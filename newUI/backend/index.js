const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const createUnixSocketPool = mysql.createConnection({
		user : 'root',
		password: 'test1234',
		database: 'khanh_newer',
		host: '34.67.140.163'
});

createUnixSocketPool.connect(function (err) {
	if (!err) {
		console.log("Database is connected");
	} else {
		throw err;
	}
});

createUnixSocketPool.query('SELECT * FROM Product LIMIT 20', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  console.log('Connection test done');
});

app.get('/', (req, res) => {
    console.log('getting all data');
	query = `select * from Product limit 5;`;
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'Lookup successful', 'body' : results});
	});
})

app.post('/api/search', (req, res) => {
    const searchKey = req.body.searchKey;
	console.log('searching ', searchKey);
	query = "SELECT * FROM Product NATURAL JOIN Price NATURAL JOIN Retailer WHERE productName LIKE '%" + searchKey +"%' limit 20;";
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'Lookup successful', 'body' : results});
	});
});

app.post('/api/insert', (req, res) => {
	console.log('inserting');
	query = "CALL InsertProductPrice('" + req.body.insertProduct + "','" + req.body.insertUrl + "','" + req.body.insertBrand + "','"
				+ req.body.insertRetailer + "'," + req.body.insertPrice + ')';
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'insert successful', 'body' : results});
	});
});

app.post('/api/signup', (req, res) => {
	console.log('signingup');
	query = "INSERT INTO User VALUES('" + req.body.username.toLowerCase() +"','" +  req.body.password +"')";
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(err);
		if (!err)
			res.json({'message' : 'successful'});
		else res.json({'message' : 'unsuccessful'});
	});
});

app.post('/api/login', (req, res) => {
	console.log('logingin');
	query = "SELECT COUNT(*) FROM User WHERE username='" + req.body.username.toLowerCase() +"'" + "AND password='" +  req.body.password +"'";
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(err);
		console.log(results[0]['COUNT(*)']);
		if (results[0]['COUNT(*)'] === 1)
			res.json({'message' : 'successful'});
		else res.json({'message' : 'unsuccessful'});
	});
});

app.post('/api/update', (req, res) => {
	console.log('updating');
	query = "REPLACE INTO Price VALUES(" + req.body.updateProduct + ',"' + req.body.updateRetailer + '",' + req.body.updatePrice + ')';
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'Lookup successful', 'body' : results});
	});
});

app.post('/api/delete', (req, res) => {
    const productId = req.body.deleteProduct;
	console.log('deleting ', productId);
	query = "DELETE FROM Product WHERE productId = " + productId;
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'deleting successful', 'body' : results});
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("running on port ", port)
})
