import Iconify from 'src/components/iconify';
import { CSSProperties, useState } from 'react';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import _mock, { randomInArray } from 'src/_mock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Scrollbar from 'src/components/scrollbar';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/formatTime';
import {
    List,
    Paper,
    Avatar,
    ListItemText,
    ListItemButton,
    ListItemAvatar,
    Grid,
    Container,
    Stack,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    IconButton,
    Backdrop,
    RadioGroup,
    Radio,
    Dialog,
    DialogTitle,
    InputAdornment,
    Box,
    FormLabel,
    Select,
    MenuItem,
    Switch,
  } from '@mui/material';
  import { alpha, styled, useTheme } from '@mui/material/styles';
import DataGridCustom from './DataGridCustom';
import ViewJobs from './viewJobs';

export default function Jobs() {
    const [start, setStart] = useState<Date | null>(new Date());
    const [end, setEnd] = useState<Date | null>(new Date());
    const [open, setOpen] = useState(false);
    const them = useTheme();
    const isDarkMode = them.palette.mode === 'dark';
  

    const pickerCalendar = useDateRangePicker(new Date(), new Date());
    const StyledListContainer = styled(Paper)(({ theme }) => ({
        width: '100%',
        border: `solid 1px ${theme.palette.divider}`,
      }));

      const card:CSSProperties =  {
        // backgroundColor:isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400],
        display: 'flex',
        borderRadius:0,
        flexDirection: 'column',
        alignItems: 'center',
      }
    const  count:CSSProperties= {
        marginTop:1,
        fontSize: '28px',
        fontWeight: 'bold',
      }
    const  label:CSSProperties= {
        fontSize: '16px',
        marginTop: '8px',
      }
    const [rowid, setrowid] = useState('');

    const handleView = (value : string) => {
        setrowid(value)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const options=[
        { value: 'option 1', label: 'New' },
        { value: 'option 2', label: 'Existing' },
        
      ]
    
    const [filterStatus, setFilterStatus] = useState('all');
    const [filteredData, setFilteredData] = useState(_dataGrid);

    const handleFilterChange = (status:string) => {
        setFilterStatus(status);
        // Filter the data based on the selected status
        if (status === 'all'){
            setFilteredData(_dataGrid);
        }else{
            const filtered = _dataGrid.filter((item) => item.status === status);
            setFilteredData(filtered);
        }
    };
    const getStatusCounts = (status:string) => {
        let  statusCounts = 0
        if (status === 'all'){
            statusCounts = _dataGrid.length;
        }else{
            _dataGrid.forEach((item) => {
                if (item.status === status) {
                    statusCounts += 1;
                } 
            })
        }
        return statusCounts;
        
    };
    const [quillSimple, setQuillSimple] = useState('');
    return (
        <Container  sx={{maxWidth:'1710px !important',marginTop:2 }}>
             <Dialog
                    fullWidth
                    maxWidth='lg'
                    open={open}
                    onClose={handleClose}
                >
                       <ViewJobs handleClose={handleClose} data={_dataGrid.filter((row)=> row.id === rowid)[0]}/>

            </Dialog>
            <Grid container spacing={3} >
                <Grid container direction="column" item xs={12} sm={12} md={2.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Stack direction="row" spacing={1} sx={{width:'250px'}}>
                        <Card style={{display: 'flex',
                            borderRadius:0,
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor:'#3d7575',
                            width:'100%',
                            }}>
                            <CardContent>
                            <Typography variant="body1" style={label}>
                                In Progress
                            </Typography>
                            <Typography variant="h1" style={count}>
                                {10}
                            </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{display: 'flex',
                            borderRadius:0,
                            flexDirection: 'column',
                            alignItems: 'center',
                            width:'100%',
                            backgroundColor:'#2b4a39',
                            }} >
                            <CardContent>
                            <Typography variant="body1" style={label}>
                                Completed 
                            </Typography>
                            <Typography variant="h1" style={count}>
                                10K
                            </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                    <Stack direction="row" spacing={1}  sx={{width:'250px',margin:1}}>
                        <Card style={{display: 'flex',
                            borderRadius:0,
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor:'#007c7c',
                            width:'100%',
                            }} >
                            <CardContent>
                            <Typography variant="body1" style={label}>
                                New
                            </Typography>
                            <Typography variant="h1" style={count}>
                                {10}
                            </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{display: 'flex',
                            borderRadius:0,
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor:'#46b47f',
                            width:'100%',
                            }}>
                            <CardContent>
                            <Typography variant="body1" style={label}>
                                Assigned 
                            </Typography>
                            <Typography variant="h1" style={count}>
                                {10}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid   item xs={12} sm={12} md={9.5} spacing={3} sx={{marginTop:'auto'}}>
                    {/* <Grid container direction="row">   
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={filterStatus === 'all'} onClick={() => {handleFilterChange('all')}}
                            color="info"
                            size="medium"
                            icon={<Iconify icon="material-symbols:all-match-sharp" />}
                            checkedIcon={<Iconify icon="material-symbols:all-match-sharp" />}
                            />
                        } 
                    label="All"
                    />              
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={filterStatus === 'In Progress'} onClick={() => {handleFilterChange('In Progress')}}
                            color="info"
                            size="medium"
                            icon={<Iconify icon="carbon:in-progress" />}
                            checkedIcon={<Iconify icon="carbon:in-progress" />}
                            />
                        }
                    label="In Progress"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Urgent Jobs'} onClick={() => {handleFilterChange('Urgent Jobs')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="fluent:alert-urgent-24-filled" />}
                        checkedIcon={<Iconify icon="fluent:alert-urgent-24-filled" />}
                        />
                    }
                    label="Urgent Jobs"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Assessment Complete'} onClick={() => {handleFilterChange('Assessment Complete')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="ic:baseline-assessment" />}
                        checkedIcon={<Iconify icon="ic:baseline-assessment" />}
                        />
                    }
                    label="Assessment Complete"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'New'} onClick={() => {handleFilterChange('New')}}

                        color="info"
                        size="medium"
                        icon={<Iconify icon="clarity:new-solid" />}
                        checkedIcon={<Iconify icon="clarity:new-solid" />}
                        />
                    }
                    label="New"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Job complete'} onClick={() => {handleFilterChange('Job complete')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="carbon:task-complete" />}
                        checkedIcon={<Iconify icon="carbon:task-complete" />}
                        />
                    }
                    label="Job complete"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Cancelled'} onClick={() => {handleFilterChange('Cancelled')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="pajamas:status-cancelled" />}
                        checkedIcon={<Iconify icon="pajamas:status-cancelled" />}
                        />
                    }
                    label="Cancelled"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'On Hold'} onClick={() => {handleFilterChange('On Hold')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="pajamas:status-paused" />}
                        checkedIcon={<Iconify icon="pajamas:status-paused" />}
                        />
                    }
                    label="On Hold"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Assigned'} onClick={() => {handleFilterChange('Assigned')}}
                        color="info"
                        size="medium"
                        icon={<Iconify icon="mdi:assignment" />}
                        checkedIcon={<Iconify icon="mdi:assignment" />}
                        />
                    }
                    label="Assigned"
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={filterStatus === 'Exception'} onClick={() => {handleFilterChange('Exception')}}
                        color="error"
                        size="medium"
                        icon={<Iconify icon="ant-design:exception-outlined" />}
                        checkedIcon={<Iconify icon="ant-design:exception-outlined" />}
                        />
                    }
                    label="Exception"
                    />
                </Grid> */}
                        <Grid container direction="row"  >

                        <TextField  variant='outlined' size="small" sx={{width:'40%' ,marginTop:1 ,height:'50px'}} placeholder="Search Job"  type="search"  InputProps={{
                            startAdornment: <InputAdornment position="start"><Iconify icon="bi:search" width={24}  /></InputAdornment>,
                            }}/>
                            <Button variant='soft' size='medium' sx={{marginLeft:1,marginTop:1,height:'40px'}}>search</Button>
                            <Button variant='soft'size='medium' color='secondary' sx={{marginLeft:1,marginTop:1,height:'40px'}}>Reset </Button>
                            <FormControlLabel control={<Switch defaultChecked sx={{marginLeft:1}}/>} label="Case Sensitive" />                        
                        </Grid>
                        <Grid container direction="row" sx={{marginTop:3}}>
                        <IconButton   size="large"   onClick={pickerCalendar.onOpen}>
                            <Iconify icon="bi:calendar-range-fill" width={30}/>
                        </IconButton>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>

                        <DesktopDatePicker
                            label="Start"
                            value={fDate(pickerCalendar.startDate)}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                setStart(newValue);
                            }}
                            renderInput={(params) => <TextField  {...params} margin="dense" sx={{marginRight:1}} />}
                        />
                        <DesktopDatePicker
                            label="End"
                            value={fDate(pickerCalendar.endDate)}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                setEnd(newValue);
                            }}
                            renderInput={(params) => <TextField  {...params} margin="dense" />}
                        />
                        <DateRangePicker
                            variant="calendar"
                            open={pickerCalendar.open}
                            startDate={pickerCalendar.startDate}
                            endDate={pickerCalendar.endDate}
                            onChangeStartDate={pickerCalendar.onChangeStartDate}
                            onChangeEndDate={pickerCalendar.onChangeEndDate}
                            onClose={pickerCalendar.onClose}
                            isError={pickerCalendar.isError}
                        />
                        </LocalizationProvider>
                       
                        </Grid>
                        <Grid container direction="row" sx={{marginTop:3 ,marginBottom:2}}>
                            <Box  sx={{width:'40%'}}>
                                            <FormLabel id="Dwelling">Assigned To</FormLabel>
                                            <Select
                                                sx={{width:'100%'}}
                                                label="Dwelling"
                                                value={10}
                                                size='medium'
                                                placeholder='Accessor List'
                                                variant="outlined"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>John Con</MenuItem>
                                                <MenuItem value={20}>Double Storey</MenuItem>
                                                <MenuItem value={30}>Cannot Determine</MenuItem>

                                            </Select>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* <Grid container direction="row" spacing={2} sx={{  mt: 3}}>
                    </Grid> */}

            </Grid>
            <Grid container  spacing={4} sx={{ marginBottom:'10px'}}>
                <Grid item xs={12} sm={12} md={2.5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <StyledListContainer sx={{height:'550px',minWidth:'250px',width:'250px',marginLeft:'7px',borderRadius:0}}>
                    <Scrollbar>
                    <List >
                        <ListItemButton selected={filterStatus === 'all'} onClick={() => {handleFilterChange('all')}}>
                            <ListItemAvatar>
                                <Avatar>
                                <Iconify icon="material-symbols:all-match-sharp" width={24} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="All" secondary={`count:${  getStatusCounts('all')}`} />
                        </ListItemButton>
                        <ListItemButton  selected={filterStatus === 'New'} onClick={() => {handleFilterChange('New')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="clarity:new-solid" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="New" secondary={`count:${  getStatusCounts('New')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'In Progress'} onClick={() => {handleFilterChange('In Progress')}} >
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="carbon:in-progress" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="In Progress" secondary={`count:${  getStatusCounts('In Progress')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'Urgent Jobs'} onClick={() => {handleFilterChange('Urgent Jobs')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="fluent:alert-urgent-24-filled" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Urgent Jobs" secondary={`count:${  getStatusCounts('Urgent Jobs')}`}/>
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'Assigned'} onClick={() => {handleFilterChange('Assigned')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="mdi:assignment" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Assigned" secondary={`count:${  getStatusCounts('Assigned')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'Assessment Complete'} onClick={() => {handleFilterChange('Assessment Complete')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="ic:baseline-assessment" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Assessment Complete" secondary={`count:${  getStatusCounts('Assessment Complete')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'Job Complete'} onClick={() => {handleFilterChange('Job Complete')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="carbon:task-complete" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Job Complete" secondary={`count:${  getStatusCounts('Job Complete')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'On Hold'} onClick={() => {handleFilterChange('On Hold')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="pajamas:status-paused" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="On Hold" secondary={`count:${  getStatusCounts('On Hold')}`} />
                        </ListItemButton>
                        <ListItemButton selected={filterStatus === 'Cancelled'} onClick={() => {handleFilterChange('Cancelled')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="pajamas:status-cancelled" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancelled" secondary={`count:${  getStatusCounts('Cancelled')}`} />
                        </ListItemButton>
                        <ListItemButton sx={{
        color: '#d53343',
        '&.Mui-selected': {
          backgroundColor: '#d53343',
          color: 'white',
        },
      }}   selected={filterStatus === 'Exception'} onClick={() => {handleFilterChange('Exception')}}>
                        <ListItemAvatar>
                            <Avatar>
                            <Iconify icon="ant-design:exception-outlined" width={24} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Exception" secondary={`count:${  getStatusCounts('Exception')}`} />
                        </ListItemButton>
                    </List>
                    </Scrollbar>
                    </StyledListContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={9.5} sx={{display: 'flex', justifyContent: 'center',height:'600px', alignItems: 'center'}}>
                     <DataGridCustom data={filteredData} sendData={handleView}/>
                </Grid>
            </Grid>
        </Container>
    )
}

const _dataGrid = [...Array(40)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.name.fullName(index),
    email: _mock.email(index),
    lastLogin: _mock.time(index),
    occupency: _mock.number.percent(index),
    rating: _mock.number.rating(index),
    status: randomInArray(['Assigned', 'In Progress',"Job Complete","Assessment Complete", 'On Hold','Urgent Jobs','Exception','New','Cancelled']),
    isAdmin: _mock.boolean(index),
    firstName: `${_mock.name.lastName(index) }  ${ _mock.name.firstName(index)}`,
    lastName: _mock.name.firstName(index),
    createdDate: _mock.time(index),
  }));

