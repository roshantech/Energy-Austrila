import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Grid, InputAdornment, LinearProgress, MenuItem, Select, Stack,Tab,Tabs,TextField, Typography, makeStyles, styled, useTheme } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import TextMaxLine from "src/components/text-max-line";
import _mock from "src/_mock";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Iconify from "src/components/iconify";
import Editor from "src/components/editor/Editor";
import { CSSProperties, Fragment, useRef, useState } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AppWidgetSummary from "./AppWidgetSummary";
import Chart, { useChart } from '../../components/chart';

export default function DashBoard() {
    const chartOptions = useChart({
        labels: ['New','Urgent Jobs','Assigned','In Progress', "Assessment Complete","Job Complete", 'On Hold','Exception','Cancelled'],
        legend: {
          position: 'top',
          itemMargin: {
            vertical: 8,
          },
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          enabled: true,
          dropShadow: {
            enabled: false,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
      });
     

      const logs = [
        '* Total Assessors Active : 10',
        '* Total Assessors On Leave : 2',
        '  ** Assessor John ABC on leave today',
        '  ** Assessor ABC XYZ on leave today'
      ];

      const logsBrodcast =[
        '01Jun23 10:00:00 Job XYZ123 assigned to Assessor Kylie Mayers',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:00:00 Job XYZ123 assigned to Assessor Kylie Mayers',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:00:00 Job XYZ123 assigned to Assessor Kylie Mayers',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:00:00 Job XYZ123 assigned to Assessor Kylie Mayers',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
        '01Jun23 10:05:00 Job ABRACA assigned to Assessor Roger Federer',
      ]
      const [value, setValue] = useState<Date | null>(new Date());
      const theme = useTheme();
      const isDarkMode = theme.palette.mode === 'dark';
      const cardRef = useRef({});
      const codeSnippetStyle: CSSProperties = {
        fontFamily: 'Courier New, monospace',
        backgroundColor: isDarkMode ? theme.palette.grey[800] : theme.palette.grey[200],
        // padding: '10px',
        paddingLeft:'10px',
        margin: '0',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.5',
        overflowX: 'auto',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: '200px',
      };
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
      const [currentTab, setCurrentTab] = useState('one');
      const interpolateColor = (color1: { r: any; g: any; b: any; }, color2: { r: any; g: any; b: any; }, ratio: number) => {
        const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
        const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
        const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
        return `rgb(${r},${g},${b})`;
      };
    
      const getGradientColorBySatisfactionRate = (rate: number) => {
        const startColor = { r: 100, g: 0, b: 0 }; 
        const endColor = { r: 0, g: 100, b: 0 }; 
    
        const ratio = rate / 100;
        const color = interpolateColor(startColor, endColor, ratio);
        return color;
      };
    
    return (
      
        <Box  sx={{width:'100% ',marginTop:2,marginRight:2}}>
           
            <Grid container spacing={1} sx={{marginLeft:'auto',marginRight:'auto',width:'90%'}}>
            <Grid item xs={12} sm={12} md={2} >
              <Stack spacing={2} sx={{width:"fit-content" ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar alt="Remy Sharp" src={_mock.image.random(7)}  sx={{boxShadow: "z23", width: 150, height: 150,borderRadius:1 }} variant="square" />
                <TextMaxLine line={1}>
                  <Label sx={{marginTop:0.1 ,width:'230px',fontSize:14}} >Roshan Bhagat</Label>
                </TextMaxLine>
                
                <Label color="secondary" variant="outlined" sx={{width:'230px',fontSize:14}}>Role : Management</Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props}   sx={{width:'230px'}}/>}
                      label="Last Login Date"
                      disabled
                      value={Date.now()}
                      onChange={setValue}
                    /> 
                  </LocalizationProvider>
                <Button variant="outlined" sx={{width:'230px',fontSize:14}}> View Profile</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
              <Grid container flexDirection='row' justifyContent='end' sx={{marginRight:3,marginTop:5,marginLeft:'-38px'}}>
                <ButtonGroup size="medium"  variant="text" color="success">
                  <Button>Today</Button>
                  <Button>Yesterday</Button>
                  <Button>Week</Button>
                  <Button>Month</Button>
                  <Button>All</Button>
                </ButtonGroup>
              </Grid>
              <Grid container direction='row' spacing={1} sx={{margin:1,marginTop:1}}>
                <Grid item xs={12} sm={6} md={2.9} >
                  <AppWidgetSummary title="In Progress" total={714000} icon='carbon:in-progress' color='primary' sx={{}} />
                </Grid>
                <Grid item xs={12} sm={6} md={2.9} >
                  <AppWidgetSummary title="Assigned" total={714000} icon='ic:baseline-assessment' color='secondary' sx={{}} />
                </Grid>
                <Grid item xs={12} sm={6} md={2.9} >
                  <AppWidgetSummary title="Completed" total={714000} icon='carbon:task-complete' color='warning' sx={{}} />
                </Grid>
                <Grid item xs={12} sm={6} md={2.9} >
                  <AppWidgetSummary title="On Hold" total={714000} icon='pajamas:status-paused' color='error' sx={{}} />
                </Grid>
              </Grid>
            </Grid>
            
        </Grid>
        <Divider variant="middle" sx={{marginTop:'10px'}}/>
        
        <Grid container spacing={1} sx={{marginLeft:'auto',marginRight:'auto',width:'90%',marginTop:'10px',marginBottom:'10px'}}>
          <Grid container direction="row" item xs={12} sm={12} md={9} >
              <Stack direction="column" spacing={1} sx={{width:'100%'}}>
                <TextField variant='outlined' size="small" sx={{maxWidth:'400px'}} placeholder="Search Assessor"  type="search"  InputProps={{
                  startAdornment: <InputAdornment position="start"><Iconify icon="bi:search" width={24}  /></InputAdornment>,
                }}/>
                <Grid  container sx={{
                 
                  height:'550px',
                }}>
                  <Scrollbar>
                    <Grid  container spacing={3} sx={{

                   marginLeft:'-25px !important',
                }}>
                      {assessors.map((assessor, index) => (
                        <Grid key={index}  item xs={12} sm={12} lg={6} md={6} >
                            <Card sx={{ display: 'flex' ,flexDirection:'row'  ,justifyContent:'start',borderRadius:0}}>
                            <CardMedia
                              component="img"
                              sx={{ width: 100 }}
                              image={_mock.image.random(index)}
                              alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography  component="div" variant="h6">
                                    {assessor.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  Open : {assessor.open}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  Solved : {assessor.solved}
                                </Typography>
                              </CardContent>
                              
                            </Box>
                            <Box sx={{marginLeft: 'auto'}}>
                            
                              <div
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '5%',
                                  backgroundColor: getGradientColorBySatisfactionRate(assessor.satisfactionRate),
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexDirection:'column',
                                  justifyContent: 'center',
                                  margin: '16px',
                                }}
                              >
                              
                                <Typography variant="h4" component="span" style={{ color: '#fff' }}>
                                  {assessor.satisfactionRate}%
                                </Typography>
                                <Typography style={{ color: '#fff' }}>
                                Occupancy
                              </Typography>
                              </div>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Scrollbar>
                </Grid>
              </Stack>
            </Grid>
            <Grid  container direction="column" item xs={12} sm={12} md={3} >
              <Grid item xs={12} sm={12} md={3}  sx={{marginTop:5.9}}>
                <Card sx={{maxWidth:440 ,width:'auto',borderRadius:0}} >
                  <CardHeader title="Progress Chart" />
                  <StyledChartWrapper dir="ltr">
                    <Chart type="pie" series={series} options={chartOptions}   height={492} />
                  </StyledChartWrapper>
                </Card>
              </Grid>
              {/* <Card style={{
              fontSize: '48px',
              fontWeight: 'bold',
              width:'fit-content',
              textAlign: 'center',
              borderRadius:1,
              maxWidth:'240px',
              color: theme.palette.primary.main,
              }}>
                <CardContent>
                
                  <CircularProgress
                    variant="determinate"
                    value={80}
                    size={160}
                    thickness={4}
                    color="primary"
                    style={{
                      strokeLinecap: 'round',
                    }}
                  />
                  <Box
                      sx={{
                        top:'70px',
                        left:'70px',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        style={{fontSize:'48px'}}
                      >{`${Math.round(80)}%`}</Typography>
                    </Box>
                    <Label sx={{marginTop:0.1 ,width:'200px'}}>Target Range: 75% - 85%</Label>
                  <Typography variant="body1" style={{
                    fontSize: '16px',
                    marginTop: '8px',
                  }}>
                    Occupency Rate
                  </Typography>
                </CardContent>
              </Card> */}
            </Grid>
        </Grid>
       
        </Box>
    )
}
const series = [10,15, 10,60, 25,35, 15,100,105];

const TABS = [
  {
    value: 'one',
    icon: <Iconify icon="eva:phone-call-fill" width={24} />,
    label: 'Item One',
  },
  {
    value: 'two',
    icon: <Iconify icon="eva:heart-fill" width={24} />,
    label: 'Item Two',
  },
  {
    value: 'three',
    label: 'Item Three',
    disabled: true,
  },
  {
    value: 'four',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Item Four',
  },
]

const assessors = [
  {
    name: 'John Alice Smith',
    open: 10,
    solved: 5,
    satisfactionRate: 10,
  },
  {
    name: 'Michael Emma Johnson',
    open: 20,
    solved: 15,
    satisfactionRate: 50,
  },
  {
    name: 'David Sophia Brown',
    open: 5,
    solved: 2,
    satisfactionRate: 100,
  },
  {
    name: 'Daniel Olivia Davis',
    open: 8,
    solved: 4,
    satisfactionRate: 85,
  },
  {
    name: 'James Emily Wilson',
    open: 12,
    solved: 10,
    satisfactionRate: 70,
  },
  {
    name: 'Benjamin Mia Anderson',
    open: 3,
    solved: 1,
    satisfactionRate: 95,
  },
  {
    name: 'Alexander Ava Taylor',
    open: 7,
    solved: 6,
    satisfactionRate: 82,
  },
  {
    name: 'William Alice Clark',
    open: 15,
    solved: 12,
    satisfactionRate: 88,
  },
  {
    name: 'Sophia John Martin',
    open: 25,
    solved: 20,
    satisfactionRate: 78,
  },
  {
    name: 'Daniel Emma Smith',
    open: 18,
    solved: 15,
    satisfactionRate: 92,
  },
  {
    name: 'James Olivia Johnson',
    open: 9,
    solved: 7,
    satisfactionRate: 68,
  },
  {
    name: 'Michael Emily Brown',
    open: 22,
    solved: 18,
    satisfactionRate: 84,
  },
  {
    name: 'David Sophia Davis',
    open: 13,
    solved: 10,
    satisfactionRate: 76,
  },
  {
    name: 'Benjamin Mia Wilson',
    open: 6,
    solved: 4,
    satisfactionRate: 90,
  },
  {
    name: 'Alexander Ava Anderson',
    open: 30,
    solved: 25,
    satisfactionRate: 72,
  },
];
const CHART_HEIGHT = 499;
const LEGEND_HEIGHT = 110;

const StyledChartWrapper = styled('div')(({ theme }:any) => ({
  height: CHART_HEIGHT,

  // marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-graphical' :{
    transform:'translate(0, 0) !important',
  },

  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    width:'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center !important',
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));