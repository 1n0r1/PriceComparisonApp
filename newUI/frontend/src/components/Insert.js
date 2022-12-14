import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function Insert(e) {
    
    const [insertProduct, setInsertProduct] = useState('');
    const [insertRetailer, setInsertRetailer] = useState('');
    const [insertPrice, setInsertPrice] = useState('');
    const [insertUrl, setInsertUrl] = useState('');
    const [insertBrand, setInsertBrand] = useState('');
    const [insertTag, setInsertTag] = useState('');
    const [errorInsert, setErrorInsert] = useState(false);

    const postInsertProduct = () => {
      console.log('Inserting ', insertProduct);
      e.axiosInstance.post('/api/insert', {
        insertProduct: insertProduct,
        insertRetailer: insertRetailer,
        insertPrice: insertPrice,
        insertUrl: insertUrl,
        insertBrand: insertBrand,
        insertTag: insertTag,
        username: e.login.username,
        password: e.login.password
      }).then(function (response) {
        if (response.data.message === 'insert successful') {
            console.log("Insert success");
            setErrorInsert(false);
        } else {
            setErrorInsert(true);
        }
      })
    };

    return (
        <Box sx={{m:3, flexGrow: 1 }}>
            <Box sx={{my:2, flexGrow: 1 }}> Would you like to insert some data on new products? Type the new data in the boxes and we'll insert it into our database! </Box>

            <TextField size="small" 
                label="Product Name"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertProduct(e.target.value);
            }}/>

            <TextField size="small" 
                label="Brand"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertBrand(e.target.value);
            }}/>

            <TextField size="small" 
                label="URL"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertUrl(e.target.value);
            }}/>

            <TextField size="small" 
                label="Price"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertPrice(e.target.value);
            }}/>

            <TextField size="small" 
                label="Retailer"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertRetailer(e.target.value);
            }}/>

            <TextField size="small" 
                label="Tag"
                id="outlined-size-small"
                onChange={(e) => {
                setInsertTag(e.target.value);
            }}/>
            {e.login.username===null ? <Alert severity="error">
                Please login before you insert
            </Alert>: <></>}
            {errorInsert ? <Alert severity="error">
                Something happened. Try logout and login again
            </Alert>: <></>}
            <Button disabled={e.login.username===null} onClick={postInsertProduct}> Insert Product </Button>
        </Box>
    )
}