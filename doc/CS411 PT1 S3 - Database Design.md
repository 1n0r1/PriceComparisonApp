CREATE TABLE Retailer (
	retailerName VARCHAR(255),
	retailerAddress VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (retailerName)
);

CREATE TABLE Brand (
	brandName VARCHAR(255),
	productCount INT DEFAULT 0,
	PRIMARY KEY (brandName)
);

CREATE TABLE Product (
	productId INT,
	productName VARCHAR(255),
	productUrl VARCHAR(255),
	brandName VARCHAR(255),
	PRIMARY KEY (productId),
	FOREIGN KEY (brandName)
	REFERENCES Brand(brandName)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

CREATE TABLE Price (
	productId INT,
	retailerName VARCHAR(255),
	price DOUBLE,
	FOREIGN KEY (productId)
	REFERENCES Product(productId)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (retailerName)
	REFERENCES Retailer(retailerName)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE User (
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (username)
);
