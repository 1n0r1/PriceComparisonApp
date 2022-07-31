import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function Update(e) {
    const [updateProduct, setUpdateProduct] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateRetailer, setUpdateRetailer] = useState('');
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [invalidId, setInvalidId] = useState(false);

    const postUpdateProduct = () => {
        e.axiosInstance.post('/api/update', {
            updateProduct: updateProduct,
            updatePrice: updatePrice,
            updateRetailer: updateRetailer,
            username: e.login.username,
            password: e.login.password
        }).then(function (response) {
            if (response.data.message === 'update successful') {
                console.log("Update success");
                setErrorUpdate(false);
                setInvalidId(false);
            } else if (response.data.message === 'invalid productId') {
                setInvalidId(true);
            } else {
                setErrorUpdate(true);
            }
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
            {e.login.username===null ? <Alert severity="error">
                Please login before you update
            </Alert>: <></>}
            {errorUpdate ? <Alert severity="error">
                Something happened. Try logout and login again
            </Alert>: <></>}
            {invalidId ? <Alert severity="error">
                Could not find the product id
            </Alert>: <></>}

            <Button disabled={e.login.username===null} onClick={postUpdateProduct}> Update Price </Button>
        </Box>
    )
}