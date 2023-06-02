import { Button, Card, CardContent, CardHeader, Container, Dialog, DialogTitle, FormControlLabel, FormLabel, Grid, InputLabel, LinearProgress, Link, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Switch, TextField, alpha, useTheme } from "@mui/material";
import { Box, styled, width } from "@mui/system";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SetStateAction, useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Iconify from "src/components/iconify";
import Label from "src/components/label/Label";
import Editor from "src/components/editor";
import _mock from "src/_mock/_mock";
import Upload from "src/components/upload/Upload";
import { TreeItem, TreeItemProps, TreeView } from "@mui/lab";

interface ViewException {
    handleClose: () => void;
    data : Props,
}


  function ExceptionView({handleClose,data}:ViewException) {
    return (
        <Container >
            <DialogTitle>Job Exception: {data.id}</DialogTitle>

            <Grid container  direction='row' spacing={2}  lg={12} sx={{margin:1}}>
                <Grid item  lg={6}   >
                    <FormLabel id="Notes">Reason</FormLabel>
                    <TextareaAutosize style={{width:'100%',height:'160px',color:'white',backgroundColor:'#212b36',borderColor:'#45505c'}} value={_mock.text.description(1)} color="primary" />
                </Grid>
                <Grid item  lg={6}   >
                    <Stack>
                    <Box  >
                                            <FormLabel id="accessor">Job Accessor</FormLabel>
                                            <Select
                                                sx={{width:'100%'}}
                                                label="accessor"
                                                value={10}
                                                variant="outlined"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>John Doe</MenuItem>
                                                <MenuItem value={20}>Double Storey</MenuItem>
                                                <MenuItem value={30}>Cannot Determine</MenuItem>

                                            </Select>
                    </Box>
                    <Box  sx={{width:'100%',marginTop:3}}>
                        <FormLabel id="priority">Priority</FormLabel>
                        <Select
                                                sx={{width:'100%'}}
                                                label="priority"
                                                value='10'
                                                variant="outlined"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>High</MenuItem>
                                                <MenuItem value={20}>Double Storey</MenuItem>
                                                <MenuItem value={30}>Cannot Determine</MenuItem>

                                            </Select>
                    </Box>
                    
                                        
                    </Stack>
                </Grid>

            </Grid>
            <Grid >
            <Button variant='soft' color='primary' onClick={handleClose} sx={{margin:3,marginLeft:100}}>
                                        Save
                                    </Button>
                                    <Button variant='soft' color='error'  sx={{margin:3}}>
                                        Reprocess
                                    </Button>
                                    <Button variant='soft' color='secondary' onClick={handleClose} sx={{margin:3}}>
                                        Back
                                    </Button>
            </Grid>
        </Container>
    )
}

type Props =  {
    id: string;
    name: string;
    email: string;
    lastLogin: Date;
    occupency: number;
    rating: number;
    status: string;
    isAdmin: boolean;
    lastName: string;
    firstName: string;
    createdDate: Date;
  };
  interface ViewJobDialogProp {
    handleClose: () => void;
      data : Props,
  }
  
export default function ViewJobs({handleClose,data}:ViewJobDialogProp) {
    const theme = useTheme();
    const [dwelling, setDwelling] = useState('');
    const [createdDate, setCreatedDate] = useState<Date | null>(new Date());
    const handleChange = (event: SelectChangeEvent) => {
        setDwelling(event.target.value);
    };
    const StyledTreeView = styled(TreeView)({
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    });

    const handleException = () => {
        setOpen(true)
    }
    const handleExceptionClose = () => {
        setOpen(false)

    }
  
    const options=[
        { value: 'option 1', label: 'New' },
        { value: 'option 2', label: 'Existing' },
        
      ]
      const [preview, setPreview] = useState(false);

  const [files, setFiles] = useState<(File | string)[]>([]);
     const [open, setOpen] = useState(false);


  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
 return (
    <Container  >
         <Dialog
                    fullWidth
                    maxWidth='lg'
                    open={open}
                    onClose={handleExceptionClose}
                >
                       <ExceptionView data={data}  handleClose={handleExceptionClose}/>

            </Dialog>
                  <DialogTitle>Job: {data.id}</DialogTitle>
                                <Grid container direction='row' spacing={1}  lg={12} sx={{margin:1}}>
                                <Grid item  lg={6}   >
                                        
                                        <TextField name="fullName" label="Job Requestor" sx={{width:'100%'}} value={data.firstName } />
                                        <Box style={{width:'100%',marginTop:24}}>
                                            <FormLabel id="job-type">Job Type</FormLabel>
                                            <RadioGroup  aria-label='Job Type' sx={{marginLeft:0.3}} name="email" aria-labelledby="Job Type" value="option 1"
                                                defaultValue="top" row >
                                            {options.map((option) => (
                                                <FormControlLabel
                                                
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Radio  />}
                                                    label={option.label}
                                                />
                                                ))}
                                            </RadioGroup>
                                        </Box>
                                        <Box  sx={{width:'100%',marginTop:3}}>
                                        <FormLabel >Reprocess Details: <Link href="#"><Iconify icon="carbon:view-filled" />View Job</Link></FormLabel>
                                        </Box>
                                        <Box  sx={{width:'100%',marginTop:3}}>
                                            <FormLabel id="Dwelling">Dwelling</FormLabel>
                                            <Select
                                                sx={{width:'100%'}}
                                                label="Dwelling"
                                                value={dwelling}
                                                onChange={handleChange}
                                                variant="outlined"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Single Storey</MenuItem>
                                                <MenuItem value={20}>Double Storey</MenuItem>
                                                <MenuItem value={30}>Cannot Determine</MenuItem>

                                            </Select>
                                        </Box>
                                        <TextField name="fullName"  label="Climate Zone" sx={{width:'100%',marginTop:3}} value={data.firstName } />
                                        <TextField name="fullName" label="Requestor Email" sx={{width:'100%',marginTop:3}} value={data.email } />
                                        <Box  sx={{width:'100%',marginTop:2}}>
                                        <FormLabel >Job Status: {data.status}</FormLabel>
                                        <LinearProgress variant="determinate" sx={{width:'100%',marginTop:3}} value={data.occupency} />
                                        </Box>
                                         <Upload
                                            sx={{width:'100%',marginTop:3}}
                                            multiple
                                            thumbnail={preview}
                                            files={files}
                                            onDrop={handleDropMultiFile}
                                            onRemove={handleRemoveFile}
                                            onRemoveAll={handleRemoveAllFiles}
                                            onUpload={() => console.log('ON UPLOAD')}
                                        />
                                    
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField name="fullName" label="Job Assessor" sx={{width:'100%'}} value={data.name}/>
                                        <TextField name="email" label="Priority" value='high' sx={{width:'100%',marginTop:3}}/>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Created Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Assigned Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Completed Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Assessor Process Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Cancelled Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <StyledTreeView
                                        sx={{width:'100%',marginTop:3}}
                                        defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" />}
                                        defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" />}
                                        defaultEndIcon={null}
                                        >
                                         <TreeItem nodeId="1" label="Documents">
                                            <TreeItem nodeId="2" label="Double_story.pdf" />
                                            <TreeItem nodeId="3" label="Document.csv" />
                                            <TreeItem nodeId="4" label="somefile.txt" />
                                        </TreeItem>
                                        
                                        </StyledTreeView>
                                </Grid>
                                </Grid>
                                <Grid container direction='row' lg={6} sx={{margin:3}}>
                                {/* <Card>
                                    <CardHeader
                                    title="Upload Multi File"
                                    action={
                                        <FormControlLabel
                                        control={
                                            <Switch
                                            checked={preview}
                                            onChange={(event) => setPreview(event.target.checked)}
                                            />
                                        }
                                        label="Show Thumbnail"
                                        />
                                    }
                                    />
                                    <CardContent> */}
                                   
                                    {/* </CardContent>
                                </Card> */}
                                </Grid>
                                <Grid spacing={3}>
                                    <FormLabel id="Notes">Notes</FormLabel>
                                    <TextareaAutosize style={{width:'100%',height:'100px',color:'white',backgroundColor:'#212b36',borderColor:'#45505c'}} value={_mock.text.description(1)} color="primary" />
                                </Grid>
                                <Grid spacing={3}>
                                    <Button variant='soft' onClick={handleClose} sx={{margin:3}}>
                                        Save
                                    </Button>
                                    
                                    <Button variant='soft' color='secondary' onClick={handleClose} sx={{margin:3,marginLeft:70}}>
                                        Archive Job
                                    </Button>
                                    <Button variant='soft' color='error' onClick={handleException} sx={{margin:3}}>
                                        Exception
                                    </Button>
                                    <Button variant='soft' color='secondary' onClick={handleClose} sx={{margin:3}}>
                                        Add Notes
                                    </Button>
                                </Grid>
    </Container>
 )
}