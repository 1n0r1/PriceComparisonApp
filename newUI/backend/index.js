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

createUnixSocketPool.query('SELECT * FROM Product LIMIT 10', function (error, results, fields) {
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
	query = 	"SELECT * FROM Product NATURAL JOIN Price NATURAL JOIN "
				+		"(SELECT productId, GROUP_CONCAT(Tag SEPARATOR ', ') AS tagList "
				+		"FROM Tag GROUP BY productId) AS TEMP "
				+"WHERE productName LIKE '%" + searchKey +"%' limit 10;";
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		console.log(results);
		res.json({'message' : 'Lookup successful', 'body' : results});
	});
});

app.post('/api/advancedsearch', (req, res) => {
    const searchKey = req.body.searchKey;
	console.log('searching ', searchKey);

	var tagToQuery = "";
	for (var j = 0; j < req.body.tagList.length; j++) {
		if (req.body.tagList[j].check === 1) {
			if (tagToQuery === "")
				tagToQuery = req.body.tagList[j].Tag;
			else tagToQuery =  tagToQuery + ', ' + req.body.tagList[j].Tag;
		}
	}
	console.log(tagToQuery);
	query = "SELECT Tag, COUNT(*) as count FROM Tag NATURAL JOIN Product WHERE productName LIKE '%" + searchKey +"%' GROUP BY Tag ORDER BY count DESC LIMIT 50";
	console.log(query);
	createUnixSocketPool.query(query, function(err, results3, fields) {
		query1 = "CALL AdvancedSearch('" + searchKey + "','" + tagToQuery + "')";
		var results = results3;
		console.log(query1);
		createUnixSocketPool.query(query1, function(err1, results1, fields1) {
			query2 = "SELECT * FROM SearchResultTable LIMIT 50";
			console.log(query2);
			createUnixSocketPool.query(query2, function(err2, results2, fields2) {
				for (var i = 0; i < results.length; i++) {
					var check = 0;
					for (var j = 0; j < req.body.tagList.length; j++) {
						if (results[i].Tag === req.body.tagList[j].Tag) {
							check = req.body.tagList[j].check;
							break;
						}
					}
					results[i].check = check;
				}
				console.log(err1);
				console.log(results2);
				res.json({'message' : 'Lookup successful', 'body' : results2, 'tagList' : results});
			});
		});
	});
});

app.post('/api/insert', (req, res) => {
	console.log('inserting');
	if (req.body.username == null) {
		res.json({'message' : 'not logged in'});
	} else {
		query = "SELECT COUNT(*) FROM User WHERE username='" + req.body.username.toLowerCase() +"'" + "AND password='" +  req.body.password +"'";
		console.log(query);
		createUnixSocketPool.query(query, function(err, results, fields) {
			console.log(err);
			console.log(results[0]['COUNT(*)']);
			if (results[0]['COUNT(*)'] === 1) {
				query1 = "CALL InsertProductPrice('" + req.body.insertProduct + "','" + req.body.insertUrl + "','" + req.body.insertBrand + "','"
					+ req.body.insertRetailer + "'," + req.body.insertPrice + ",'" + req.body.insertTag + "','" + req.body.username.toLowerCase() + "')";
				console.log(query1);
				createUnixSocketPool.query(query1, function(err, results, fields) {
					console.log(results);
					if (!err)
						res.json({'message' : 'insert successful'});
					else res.json({'message' : 'unsuccessful'});
				});
			}
			else res.json({'message' : 'unsuccessful'});
		});
	}
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

	if (req.body.username == null) {
		res.json({'message' : 'not logged in'});
	} else {
		query = "SELECT COUNT(*) FROM User WHERE username='" + req.body.username.toLowerCase() +"'" + "AND password='" +  req.body.password +"'";
		console.log(query);
		createUnixSocketPool.query(query, function(err, results, fields) {
			console.log(err);
			console.log(results[0]['COUNT(*)']);
			if (results[0]['COUNT(*)'] === 1) {
				query1 = "REPLACE INTO Price VALUES(" + req.body.updateProduct + ',"' + req.body.updateRetailer + '",' + req.body.updatePrice + ',"' + req.body.username.toLowerCase() + '")';
				console.log(query1);
				createUnixSocketPool.query(query1, function(err, results, fields) {
					console.log(results);
					if (!err)
						res.json({'message' : 'update successful'});
					else res.json({'message' : 'invalid productId'});
				});
			}
			else res.json({'message' : 'unsuccessful'});
		});
	}
});

app.post('/api/delete', (req, res) => {
    const productId = req.body.deleteProduct;
	console.log('deleting ', productId);
	query = "DELETE FROM Product WHERE productId = " + productId;
	console.log(query);
	createUnixSocketPool.query(query, function(err, results, fields) {
		if (results.affectedRows > 0)
			res.json({'message' : 'delete successful'});
		else res.json({'message' : 'invalid productId'});
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("running on port ", port)
})
