import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SimpleAppBar from './SimpleAppBar';

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

  const [login, setLogin] = useState({'username':null, 'password':null});



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
    <React.Fragment>
      <CssBaseline />
      <SimpleAppBar login={login} onLogin={setLogin}/>
      <p> Would you like to search for the prices of some groceries? Type the name of the food in the box! </p>

      <TextField size="small" 
          label="Product Name"
          id="outlined-size-small"
          onChange={(e) => {
          setSearchKey(e.target.value);
      }}/>

      <Button onClick={postSearchProduct}> Search </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell> Retailer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList && productList.map((row) => (
              <TableRow>
                <TableCell>{row.productId}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.brandName}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.retailerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <p> Would you like to insert some data on new products? Type the new data in the boxes and we'll insert it into our database! </p>

      <TextField size="small" 
          label="Product Name"
          id="outlined-size-small"
          onChange={(e) => {
          setInsertProduct(e.target.value);
      }}/>

      <TextField size="small" 
          label="Retailer"
          id="outlined-size-small"
          onChange={(e) => {
          setInsertRetailer(e.target.value);
      }}/>

      <TextField size="small" 
          label="Price"
          id="outlined-size-small"
          onChange={(e) => {
          setInsertPrice(e.target.value);
      }}/>

      <TextField size="small" 
          label="URL"
          id="outlined-size-small"
          onChange={(e) => {
          setInsertUrl(e.target.value);
      }}/>

      <TextField size="small" 
          label="Brand"
          id="outlined-size-small"
          onChange={(e) => {
          setInsertBrand(e.target.value);
      }}/>

      <Button onClick={postInsertProduct}> Insert Product </Button>
      
      <p> Would you like to update some data on currently existing products? Type in your up-to-date data in the boxes and we'll update it in our database! </p>

      <TextField size="small" 
          label="Product Id"
          id="outlined-size-small"
          onChange={(e) => {
          setUpdateProduct(e.target.value);
      }}/>

      <TextField size="small" 
          label="Price"
          id="outlined-size-small"
          onChange={(e) => {
          setUpdatePrice(e.target.value);
      }}/>


      <TextField size="small" 
          label="Retailer"
          id="outlined-size-small"
          onChange={(e) => {
          setUpdateRetailer(e.target.value);
      }}/>

      <Button onClick={postUpdateProduct}> Update Price </Button>

      <p> Is there a product in our database that doesn't exist anymore? Type the product ID in the box and we'll delete it from our database! </p>

      <TextField size="small" 
          label="Product Id"
          id="outlined-size-small" onChange={(e) => {
          setDeleteProduct(e.target.value);
      }}/>

      <Button onClick={postDeleteProduct}> Delete Product </Button>


    </React.Fragment>
  );
}

export default App;
