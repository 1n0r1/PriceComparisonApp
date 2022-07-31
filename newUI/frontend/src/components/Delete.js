import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Delete(e) {
    const [deleteProduct, setDeleteProduct] = useState('');

    const postDeleteProduct = () => {
        e.axiosInstance.post('/api/delete', {
          deleteProduct: deleteProduct
        }).then(function (response) {
          console.log("deleted");
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

            <Button onClick={postDeleteProduct}> Delete Product </Button>
        </Box>
    )
}