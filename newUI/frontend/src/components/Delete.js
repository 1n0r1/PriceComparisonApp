import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function Delete(e) {
    const [deleteProduct, setDeleteProduct] = useState('');
    const [invalidId, setInvalidId] = useState(false);

    const postDeleteProduct = () => {
        e.axiosInstance.post('/api/delete', {
          deleteProduct: deleteProduct
        }).then(function (response) {
            if (response.data.message === 'delete successful') {
                console.log("Delete success");
                setInvalidId(false);
            } else {
                setInvalidId(true);
            }
        })
    }
    return (
        <Box sx={{m:3, flexGrow: 1 }}>
            <Box sx={{my:2, flexGrow: 1 }}> Is there a product in our database that doesn't exist anymore? Type the product ID in the box and we'll delete it from our database! </Box>

            <TextField size="small" 
                label="Product Id"
                id="outlined-size-small" onChange={(e) => {
                setDeleteProduct(e.target.value);
            }}/>
            {invalidId ? <Alert severity="error">
                Could not find the product id
            </Alert>: <></>}
            <Button onClick={postDeleteProduct}> Delete Product </Button>
        </Box>
    )
}