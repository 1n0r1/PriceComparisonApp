import React, {useState} from 'react';
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
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';

export default function AdvancedSearch(e){
    const [searchKey, setSearchKey] = useState('');
    const [productList, setProductList] = useState('');
    const [tagList, setTagList] = useState([]);
    const postSearchProduct = () => {
      console.log('Searching ', searchKey);
      console.log(tagList);
      e.axiosInstance.post('/api/advancedsearch', {
        searchKey: searchKey,
        tagList: tagList
      }).then(function (response) {
        setProductList(response.data.body);
        setTagList(response.data.tagList);
        console.log(response.data.tagList);
      })
    }

    function onChangeFactory(tag) {
        return function() {
            console.log(tag);
            var temp = [...tagList];
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].Tag === tag) {
                    if (temp[i].check===1){
                        temp[i].check = 0;
                    } else {
                        temp[i].check = 1;
                    }
                    break;
                }
            }
            setTagList(temp);
        };
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Box sx={{m:3, flexGrow: 1 }}>
                <Box sx={{my:2, flexGrow: 1 }}> Would you like to search for the prices of some groceries? Type the name of the food in the box! </Box>

                <TextField size="small" 
                    label="Product Name"
                    id="outlined-size-small"
                    onChange={(e) => {
                    setSearchKey(e.target.value);
                }}/>

                <Button onClick={postSearchProduct}> Search </Button>
                <Stack direction="row">
                    <Box sx={{my:2, flexGrow: 1 }}>
                        <FormGroup>
                            {tagList && tagList.map((row) => (
                                <FormControlLabel control={
                                    <Checkbox   checked={row.check===1}
                                                onChange={onChangeFactory(row.Tag)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                    />} 
                                label={row.Tag + " (" + row.count + ")"} />
                            ))}
                        </FormGroup>
                    </Box>
                    <Box sx={{my:2, flexGrow: 1 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Product Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Url</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell> Retailer</TableCell>
                                <TableCell> Added/Updated By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productList && productList.map((row) => (
                                <TableRow>
                                    <TableCell>{row.productId}</TableCell>
                                    <TableCell>{row.productName}</TableCell>
                                    <TableCell>{row.productUrl}</TableCell>
                                    <TableCell>{row.brandName}</TableCell>
                                    <TableCell>{row.tagList}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.retailerName}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Stack>
            </Box>

        </React.Fragment>
    );
};
