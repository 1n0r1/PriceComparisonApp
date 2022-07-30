import React, {useState} from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Update() {
    const [updateProduct, setUpdateProduct] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateRetailer, setUpdateRetailer] = useState('');

    const postUpdateProduct = () => {
        Axios.post('http://localhost:3002/api/update', {
            updateProduct: updateProduct,
            updatePrice: updatePrice,
            updateRetailer: updateRetailer
        }).then(function (response) {
            console.log("Update success");
        })
    }

    return (
        <Box sx={{m:3, flexGrow: 1 }}>
            <Box sx={{my:2, flexGrow: 1 }}> Would you like to update some data on currently existing products? Type in your up-to-date data in the boxes and we'll update it in our database! </Box>

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
        </Box>
    )
}