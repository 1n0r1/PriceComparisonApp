import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function Search(e) {
    const [searchKey, setSearchKey] = useState('');
    const [productList, setProductList] = useState('');
    const postSearchProduct = () => {
      console.log('Searching ', searchKey);
      e.axiosInstance.post('/api/search', {
        searchKey: searchKey
      }).then(function (response) {
        setProductList(response.data.body);
        console.log(productList);
      })
    }
    return (
    <Box sx={{m:3, flexGrow: 1 }}>
    <Box sx={{my:2, flexGrow: 1 }}> Would you like to search for the prices of some groceries? Type the name of the food in the box! </Box>

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
              <TableCell>Url</TableCell>
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
                <TableCell>{row.productUrl}</TableCell>
                <TableCell>{row.brandName}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.retailerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    )
}