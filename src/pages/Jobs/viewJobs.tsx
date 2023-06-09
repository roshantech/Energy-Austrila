import { Button, Card, CardContent, CardHeader, Accordion ,AccordionDetails ,AccordionSummary ,Container, Dialog, DialogTitle,Avatar, FormControlLabel, FormLabel, Grid, InputLabel, LinearProgress, Link, ListItem, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent,  Switch, TextField, alpha, useTheme, Stack, Typography, IconButton } from "@mui/material";
import { Box, styled, width } from "@mui/system";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SetStateAction, useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Iconify from "src/components/iconify";
import Label from "src/components/label/Label";

import Editor from "src/components/editor";
import _mock from "src/_mock/_mock";
import { m, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Upload from "src/components/upload/Upload";
import { TreeItem, TreeItemProps, TreeView,LoadingButton } from "@mui/lab";
import FormProvider,{RHFTextField} from "src/components/hook-form";
import { fDate } from "src/utils/formatTime";
import FileThumbnail from "src/components/file-thumbnail";
import { varFade } from "src/components/animate";

interface ViewException {
    handleClose: () => void;
    data : Props,
}

type FormValuesProps = {
    comment: string;
    name: string;
    email: string;
  };
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
    jobType: string;
    lastName: string;
    firstName: string;
    createdDate: Date;
  };
  interface ViewJobDialogProp {
    handleClose: () => void;
      data : Props,
      edit:boolean;
  }
  
export default function ViewJobs({handleClose,data,edit }:ViewJobDialogProp) {
    const theme = useTheme();
    const [dwelling, setDwelling] = useState('');
    const [quillSimple, setQuillSimple] = useState(``);
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
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleTextboxClick = () => {
    setIsEditorOpen(true);
  };
  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    comment: '',
    name: '',
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (dat: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', dat);
    } catch (error) {
      console.error(error);
    }
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordianChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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
                                        
                                        <TextField name="fullName" label="Job Requestor" sx={{width:'100%'}} value={data.firstName } disabled={edit} />
                                        <Box style={{width:'100%',marginTop:24}}>
                                            <FormLabel id="job-type">Job Type</FormLabel>
                                            <RadioGroup  aria-label='Job Type'  sx={{marginLeft:0.3}} name="email" aria-labelledby="Job Type" value="option 1"
                                                defaultValue="top" row >
                                            {options.map((option) => (
                                                <FormControlLabel
                                                    disabled={edit}
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Radio  />}
                                                    label={option.label}
                                                />
                                                ))}
                                            </RadioGroup>
                                        </Box>
                                        <Box  sx={{width:'100%',marginTop:3}}>
                                        <FormLabel >Reprocess Details: <Link href="#" ><Iconify icon="carbon:view-filled" />View Job</Link></FormLabel>
                                        </Box>
                                        <Box  sx={{width:'100%',marginTop:3}}>
                                            <FormLabel id="Dwelling">Dwelling</FormLabel>
                                            <Select
                                                 disabled={edit}
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
                                        <TextField name="fullName" disabled={edit} label="Climate Zone" sx={{width:'100%',marginTop:3}} value={data.firstName } />
                                        <TextField name="fullName" disabled={edit} label="Requestor Email" sx={{width:'100%',marginTop:3}} value={data.email } />
                                        <Box  sx={{width:'100%',marginTop:2}}>
                                        <FormLabel >Job Status: {data.status}</FormLabel>
                                        <LinearProgress variant="determinate" sx={{width:'100%',marginTop:3}} value={data.occupency} />
                                        </Box>
                                         
                                    
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField disabled={edit} name="fullName" label="Job Assessor" sx={{width:'100%'}} value={data.name}/>
                                        <TextField disabled={edit} name="email" label="Priority" value='high' sx={{width:'100%',marginTop:3}}/>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            disabled={edit}
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Created Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            disabled={edit}
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Assigned Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            disabled={edit}
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Completed Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            disabled={edit}
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Assessor Process Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                            disabled={edit}
                                            renderInput={(props) => <TextField {...props}   sx={{width:'100%',marginTop:3}}/>}
                                            label="Cancelled Date"
                                            value={data.createdDate}
                                            onChange={setCreatedDate}
                                            /> 
                                        </LocalizationProvider>
                                        {/* <StyledTreeView
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
                                        
                                        </StyledTreeView> */}
                                        
                                </Grid>
                                </Grid>
                                <Grid item lg={12} >
                                    {!edit &&(<Upload
                                            sx={{width:'100%',marginTop:3}}
                                            multiple
                                            thumbnail={preview}
                                            files={files}
                                            onDrop={handleDropMultiFile}
                                            onRemove={handleRemoveFile}
                                            onRemoveAll={handleRemoveAllFiles}
                                            onUpload={() => console.log('ON UPLOAD')}
                                        />)}
                                <Accordion expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')} sx={{marginTop:3}}>
                                            <AccordionSummary
                                            expandIcon={<Iconify icon="" />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                Public Documents
                                            </Typography>
                                            {expanded !== 'panel1' &&(<>   
                                                            <Typography sx={{ color: 'text.secondary' }}>Public Document</Typography>
                                                        {publicDocuments.map((list) => (
                                                                
                                                                    <FileThumbnail file={list.fileType} />
                                                                    
                                                               
                                                            ))
                                                        }</>)}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                    {
                                                        publicDocuments.map((list,key) => (
                                                            <>
                                                                {/* <FileThumbnail file={list.fileType} />
                                                                <Typography >
                                                                    {list.fileName}
                                                                </Typography> */}
                                                                <Stack
                                                                    key={key}
                                                                    component={m.div}
                                                                    {...varFade().inUp}
                                                                    spacing={2}
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    sx={{
                                                                    my: 1,
                                                                    px: 1,
                                                                    py: 0.75,
                                                                    borderRadius: 0.75,
                                                                    border: (t) => `solid 1px ${t.palette.divider}`,
                                                                    }}
                                                                >
                                                                    <FileThumbnail file={list.fileType} />

                                                                    <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                                                                    <Typography variant="subtitle2" noWrap>
                                                                        {list.fileName}
                                                                    </Typography>

                                                                    {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                                        { fData(size)}
                                                                    </Typography> */}
                                                                    </Stack>

                                                                    {!edit && (
                                                                    <IconButton edge="end" size="small" >
                                                                        <Iconify icon="eva:close-fill" />
                                                                    </IconButton>
                                                                    )}
                                                                </Stack>
                                                            </>
                                                        ))
                                                    }
                                               

                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'panel2'} onChange={handleAccordianChange('panel2')}  sx={{marginBottom:3}}>
                                            <AccordionSummary
                                            expandIcon={<Iconify icon="" />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                            >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Confidential Documents</Typography>
                                            {edit &&(<Typography sx={{ color: 'text.secondary' }}>
                                                You are currently not an owner
                                            </Typography>)}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container direction="row" >
                                                        {
                                                            confidentialDocuments.map((list) => (
                                                                <>
                                                                    <FileThumbnail file={list.fileType} />
                                                                    <Typography >
                                                                        {list.fileName}
                                                                    </Typography>
                                                                </>
                                                            ))
                                                        }
                                                </Grid>
                                               
                                            </AccordionDetails>
                                        </Accordion>
                                </Grid>

                                <Grid item  lg={12}>
                                <Typography id="Notes"  sx={{fontSize:'20px' ,marginTop:1}}>Comments</Typography>
                                {!edit && (
                        
                                             <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                                <Stack spacing={3} alignItems="flex-end">
                                                    <RHFTextField
                                                    
                                                    name="comment"
                                                    placeholder="Write some of your comments..."
                                                    multiline
                                                    rows={3}
                                                    />

                                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                                    Post comment
                                                    </LoadingButton>
                                                </Stack>
                                            </FormProvider>)}
                                            <Box>
                                            <ListItem
                                                disableGutters
                                                sx={{
                                                alignItems: 'flex-start',
                                                py: 3,
                                               
                                                }}
                                            >
                                                <Avatar  src={_mock.image.avatar(10)} sx={{ mr: 2, width: 48, height: 48 }} />

                                                <Stack>
                                                <Typography variant="subtitle1"> {_mock.name.fullName(1)} </Typography>

                                                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                                    {fDate(_mock.time(1))}
                                                </Typography>

                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {_mock.text.description(1)}
                                                </Typography>
                                                </Stack>

                                                
                                            </ListItem>
                                            </Box>
                                </Grid>
                                <Grid container spacing={3}>
                                    
                                    <Button variant='soft' color='secondary' onClick={handleClose} sx={{margin:3}}>
                                        Archive Job
                                    </Button>
                                    <Button variant='soft' color='error' onClick={handleException} sx={{margin:3}}>
                                        Exception
                                    </Button>
                                    <Button variant='soft' onClick={handleClose} sx={{margin:3,marginLeft:70}}>
                                        Save
                                    </Button>
                                    <Button variant='soft' color='secondary' onClick={handleClose} sx={{margin:3}}>
                                        Back
                                    </Button>
                                </Grid>
    </Container>
 )
}

const publicDocuments = [
    { fileName: 'public_report', fileType: 'pdf' },
    { fileName: 'public_presentation', fileType: 'pptx' },
    { fileName: 'public_budget', fileType: 'xlsx' },
    { fileName: 'public_policy', fileType: 'docx' },
  ];
const confidentialDocuments = [
    { fileName: 'confidential_contract', fileType: 'pdf' },
    { fileName: 'confidential_strategy', fileType: 'docx' },
    { fileName: 'confidential_financials', fileType: 'xlsx' },
    { fileName: 'confidential_prototype', fileType: 'zip' },
  ];