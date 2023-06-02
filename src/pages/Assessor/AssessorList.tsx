import Iconify from "src/components/iconify";
import { Button, Container, Grid, InputAdornment, TextField } from "@mui/material";
import _mock, { randomInArray } from "src/_mock";
import DataGridAssessor from "./DataGridCustom";




export default function AccessorList() {

    const handleView = () => {

    }

    return (
        
            <Container  sx={{maxWidth:'1710px !important',marginTop:2 }}>
                <Grid container sx={{marginTop:3,marginBottom:3}} justifyContent="space-between">
                    <Grid item>
                        <Button variant='contained'  size="medium" sx={{borderRadius:0}}>
                            Add Assessor User
                        </Button>
                    </Grid>
                    <Grid item>
                    <TextField  variant='outlined' size="small"  placeholder="Search Assessors"  type="search"  InputProps={{
                            startAdornment: <InputAdornment position="start"><Iconify icon="bi:search" width={24}  /></InputAdornment>,
                            }}/>
                    </Grid>
                </Grid>
                <DataGridAssessor data={_dataGrid}  sendData={handleView} />
            </Container>
        
    )
}


const _dataGrid = [...Array(40)].map((_, index) => ({
    id: index +1,
    name: _mock.name.fullName(index),
    email: _mock.email(index),
    lastLogin: _mock.time(index),
    occupency: _mock.number.percent(index),
    phoneNumber: _mock.phoneNumber(index),
    status: randomInArray(['active', 'inactive']),
    address: _mock.address.fullAddress(index),
    firstName: `${_mock.name.lastName(index) }  ${ _mock.name.firstName(index)}`,
    lastName: _mock.name.firstName(index),
    createdDate: _mock.time(index),
  }));

