import './App.css';
import React, {useState, useEffect} from 'react';
import { Container, Grid, Header, List } from "semantic-ui-react";
import Axios from 'axios'
function App() {
  const [searchKey, setSearchKey] = useState('');
  const [productList, setProductList] = useState('');

  const [insertProduct, setInsertProduct] = useState('');
  const [insertRetailer, setInsertRetailer] = useState('');
  const [insertPrice, setInsertPrice] = useState('');
  const [insertUrl, setInsertUrl] = useState('');
  const [insertBrand, setInsertBrand] = useState('');

  const [updateProduct, setUpdateProduct] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateRetailer, setUpdateRetailer] = useState('');

  const [deleteProduct, setDeleteProduct] = useState('');



  const postSearchProduct = () => {
    console.log('Searching ', searchKey);
    Axios.post('http://localhost:3002/api/search', {
      searchKey: searchKey
    }).then(function (response) {
      setProductList(response.data.body);
      console.log(productList);
    })
  }

  const postInsertProduct = () => {
    console.log('Inserting ', insertProduct);
    Axios.post('http://localhost:3002/api/insert', {
      insertProduct: insertProduct,
      insertRetailer: insertRetailer,
      insertPrice: insertPrice,
      insertUrl: insertUrl,
      insertBrand: insertBrand
    }).then(function (response) {
      console.log("Insert success");
    })
  }

  const postUpdateProduct = () => {
    console.log('Searching ', searchKey);
    Axios.post('http://localhost:3002/api/update', {
      updateProduct: updateProduct,
      updatePrice: updatePrice,
      updateRetailer: updateRetailer
    }).then(function (response) {
      console.log("Update success");
    })
  }

  
  const postDeleteProduct = () => {
    console.log('Searching ', searchKey);
    Axios.post('http://localhost:3002/api/delete', {
      deleteProduct: deleteProduct
    }).then(function (response) {
      console.log("deleted ", searchKey);
    })
  }

  return (
    <div className="App">
      <h1> Groceries price comparator </h1>

      <p> Would you like to search for the prices of some groceries? Type the name of the food in the box! </p>

      <label> Product Name: </label>
      <input type="text" onChange={(e) => {
          setSearchKey(e.target.value);
      }}/>

      <button onClick={postSearchProduct}> Search </button>

      <p>Product Id      Product Name      Brand Name     Price     Retailer</p>
      <div>
        {productList &&  productList.map ( product => <div> {product.productId + " " + product.productName + 
                                        " " + product.brandName + " " + product.price + " " + product.retailerName} </div> ) } 
      </div>

      <p> Would you like to insert some data on new products? Type the new data in the boxes and we'll insert it into our database! </p>

      <label> Product: </label>
      <input type="text" onChange={(e) => {
          setInsertProduct(e.target.value);
      }}/>

      <label> Retailer: </label>
      <input type="text" onChange={(e) => {
          setInsertRetailer(e.target.value);
      }}/>

      <label> Price: </label>
      <input type="text" onChange={(e) => {
          setInsertPrice(e.target.value);
      }}/>

      <label> URL: </label>
      <input type="text" onChange={(e) => {
          setInsertUrl(e.target.value);
      }}/>

      <label> Brand: </label>
      <input type="text" onChange={(e) => {
          setInsertBrand(e.target.value);
      }}/>

      <button onClick={postInsertProduct}> Insert Product </button>

      <p> Would you like to update some data on currently existing products? Type in your up-to-date data in the boxes and we'll update it in our database! </p>

      <label> Product ID: </label>
      <input type="text" onChange={(e) => {
          setUpdateProduct(e.target.value);
      }}/>

      <label> Price: </label>
      <input type="text" onChange={(e) => {
          setUpdatePrice(e.target.value);
      }}/>


      <label> Retailer: </label>
      <input type="text" onChange={(e) => {
          setUpdateRetailer(e.target.value);
      }}/>

      <button onClick={postUpdateProduct}> Update Product </button>

      <p> Is there a product in our database that doesn't exist anymore? Type the product ID in the box and we'll delete it from our database! </p>

      <label> Product ID: </label>
      <input type="text" onChange={(e) => {
          setDeleteProduct(e.target.value);
      }}/>

      <button onClick={postDeleteProduct}> Delete Data </button>

    </div>
  );
}

export default App;
