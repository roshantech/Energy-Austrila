import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader,StackProps, CardMedia, CircularProgress, Container, Divider, Grid, InputAdornment, LinearProgress, MenuItem, Select, Stack,Tab,Tabs,TextField, Typography, makeStyles, styled, useTheme, Paper, TextFieldProps, ToggleButtonGroup, ToggleButton } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import { fNumber, fShortenNumber } from "src/utils/formatNumber";
import { orderBy, round } from "lodash";
import { alpha } from '@mui/material/styles';
import Label from "src/components/label";
import TextMaxLine from "src/components/text-max-line";
import _mock, { randomNumber, randomNumberRange } from "src/_mock";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Iconify from "src/components/iconify";
import Editor from "src/components/editor/Editor";
import { CSSProperties, Fragment, useRef, useState } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AppWidgetSummary from "./AppWidgetSummary";
import Chart, { useChart } from '../../components/chart';

export default function DashBoard() {
    const series = [5,10, 15,60, 10];

    const chartOptions = useChart({
        labels: ['New','Assigned','In Progress',"Job Complete","Others"],
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
      const list = [...Array(20)].map((country, index) => ({
        id: _mock.id(index),
        name: _mock.name.fullName(index),
        android:_mock.number.age(index)-20 ,
        windows: round(_mock.number.rating(index)) ,
        apple: _mock.number.age(index + 10),
        flag: _mock.image.random(index+5),
      }));
      const chart = {categories: ['0-3', '3-6', '6-9', '9-12', '<12'],
      colors: [theme.palette.primary.main, theme.palette.warning.main],
      seriesBar: [
        {
          type: 'Week',
          data: [
            { name: 'Expenses', data: [10, 34, 13, 56, 77] },
          ],
        },
        {
          type: 'Month',
          data: [
            { name: 'Expenses', data: [45, 77, 99, 88, 77] },
          ],
        },
        {
          type: 'Year',
          data: [
            { name: 'Expenses', data: [80, 55, 34, 114, 80] },
          ],
        },
      ],}
      const { categories, colors, seriesBar } = chart;

      const [seriesData, setSeriesData] = useState('Year');
    
      const chartOptionBar = useChart({
        colors,
        stroke: {
          show: true,
          width: 4,
          colors: ['transparent'],
        },
        xaxis: {
          categories,
          title: {
            text: 'Days', 
            style: {
              fontSize: '16px', 
            },
          },
          
          labels:{
            show:true,
            style: {
              fontSize: '13px', 
            },
          },
        },
        yaxis:{
          title: {
            text: 'Jobs', 
            style: {
              fontSize: '16px', 
            },
          },
          labels:{
            show:true,
            style: {
              fontSize: '13px', 
            },
          },
        },
        tooltip: {
          y: {
            formatter: (va: number) => `$${va}`,
          },
        },
 
      });

      const [selectedValue, setSelectedValue] =  useState<any>(statusCountsArray[0] );
      const handleChange = (hello:any,sel:any) => {
        statusCountsArray.forEach((valu) => {
          if (valu.timeFrame === sel){
            setSelectedValue(valu)
          }
        })
      }


      
    return (
      
        <Box  sx={{width:'100% ',marginTop:2,marginRight:2}}>
           
            <Grid container spacing={1} sx={{marginLeft:'auto',marginRight:'auto',width:'90%'}}>
            
            <Grid item xs={12} sm={12} md={9.7}  sx={{height:'300px'}}>
             
            <Grid container flexDirection='row' justifyContent='end' sx={{marginRight:2,marginTop:3,marginLeft:'-38px'}}>
                <ToggleButtonGroup size="medium" value={selectedValue.timeFrame} onChange={(event,val) => {handleChange(event,val)}} color="success">
                  <ToggleButton  value='Today'>Today</ToggleButton>
                  <ToggleButton value='Yesterday'>Yesterday</ToggleButton>
                  <ToggleButton value='Week'>Week</ToggleButton>
                  <ToggleButton value='Month'>Month</ToggleButton>
                  <ToggleButton value='All'>All</ToggleButton>
                </ToggleButtonGroup>
                </Grid>
                <Grid container direction='row' spacing={1} sx={{margin:1,marginTop:1}}>
                  <Grid item xs={12} sm={6} md={2.9} >
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }} >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">In Progress</Typography>
                      <Typography variant="h3">{fNumber(20)} / <span style={{fontSize:'20px',color:'#ff5630'}}>4</span></Typography>
                    </Box>
                    <Iconify icon="carbon:in-progress" width={24}/>

                  </Card>                
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.9} >
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }} >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">Assigned</Typography>
                      <Typography variant="h3">{fNumber(4)} / <span style={{fontSize:'20px',color:'#ff5630'}}>0</span></Typography>
                    </Box>
                    <Iconify icon="ic:baseline-assessment" width={24}/>

                  </Card>                  </Grid>
                  <Grid item xs={12} sm={6} md={2.9} >
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }} >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">Completed</Typography>
                      <Typography variant="h3">{fNumber(132)} / <span style={{fontSize:'20px',color:'#ff5630'}}>13</span></Typography>
                    </Box>
                    <Iconify icon="carbon:task-complete" width={24}/>

                  </Card>                  </Grid>
                  <Grid item xs={12} sm={6} md={2.9} >
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }} >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">On Hold</Typography>
                        <Typography variant="h3">{fNumber(2)} / <span style={{fontSize:'20px',color:'#ff5630'}}>0</span></Typography>
                      </Box>
                        <Iconify icon="pajamas:status-paused" width={24}/>
                    </Card>                  
                  </Grid>
                </Grid>
             
              {/* <Grid container direction='row' spacing={1} sx={{margin:1,marginTop:1}}>
                <Grid item xs={12} sm={6} md={2.9} >
                  <AppWidgetSummary title="In Progress" total={714000} icon='carbon:in-progress' color='primary' sx={{height:'100px'}} />
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
              </Grid> */}
            </Grid>
            <Grid item xs={12} sm={12} md={2.3} sx={{}}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 ,height:'400px'}} >
                <Stack spacing={2} sx={{width:"fit-content" ,display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft:'auto',marginRight:'auto'}}>
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
              </Card>
            </Grid>
            
        </Grid>
        {/* <Divider variant="middle" sx={{marginTop:'10px'}}/> */}
        
        <Grid container spacing={1} sx={{marginLeft:'auto',marginRight:'auto',width:'90%',marginBottom:'10px'}}>
        <Grid  container direction="column" item xs={12} sm={12} md={3} sx={{position:'absolute',top:'300px',marginLeft:2}} >
              <Grid item xs={12} sm={12} md={3} >
                <Card sx={{maxWidth:352 ,width:'auto',borderRadius:2}} >
                  <CardHeader title="Progress Chart" />
                  <StyledChartWrapper dir="ltr">
                    <Chart type="pie" series={series} options={chartOptions}   height={492} />
                  </StyledChartWrapper>
                </Card>
              </Grid>
            </Grid>
            <Grid container direction="row" item xs={12} sm={12} md={6.2}  sx={{height:'350px',position:'absolute',marginLeft:47,top:'300px'}}>
              <Card sx={{width:'100%',height:'510px'}}>
                <CardHeader title="Requestor List" subheader="" />

                <Scrollbar>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    {list.map((country) => (
                      <CountryItem key={country.id} country={country} />
                    ))}
                  </Stack>
                </Scrollbar>
              </Card>
            </Grid>
            <Grid container direction="row" item xs={12} sm={12} md={2.1} sx={{height:'800px',position:'absolute',marginLeft:174.6,marginTop:2}}>
            <Card sx={{width:'100%'}}>
              <CardHeader title="Assessor List" subheader="" />
                      
              <Stack spacing={3} sx={{ p: 3 ,height:'300px'}} >
                
                {orderBy(_appAuthors, ['favourite'], ['desc']).map((author, index) => (
                  <AuthorItem key={author.id} author={author} index={index} />
                ))}
              </Stack>
            </Card>
            </Grid>

          {/* <Grid container direction="row" item xs={12} sm={12} md={9} >
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
            </Grid> */}
            
        </Grid>
        <Grid container spacing={1} sx={{marginLeft:'auto',marginRight:'auto',width:'90%',marginBottom:'10px'}}>
        <Card  sx={{marginTop:45,marginLeft:2.8,width:"1346px"}}>
          <CardHeader
            title="Job Aging Chart"
            subheader=""
            action={
              <CustomSmallSelect
                value={seriesData}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSeriesData(event.target.value)
                }
              >
                {seriesBar.map((option:any) => (
                  <option key={option.type} value={option.type}>
                    {option.type}
                  </option>
                ))}
              </CustomSmallSelect>
            }
          />

          {seriesBar.map((item:any) => (
            <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
              {item.type === seriesData && (
                <Chart type="bar" series={item.data} options={chartOptionBar} height={364} />
              )}
            </Box>
          ))}
        </Card>
        </Grid>
       
        </Box>
    )
}
const CustomSmallSelect = styled((props: TextFieldProps) => (
  <TextField select SelectProps={{ native: true }} {...props} />
))(({ theme }) => ({
  '& fieldset': {
    display: 'none',
  },
  '& select': {
    ...theme.typography.subtitle2,
    padding: theme.spacing(0.5, 0, 0.5, 1),
    paddingRight: '28px !important',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: Number(theme.shape.borderRadius) * 0.75,
    backgroundColor: alpha(theme.palette.grey[500], 0.08),
  },
}));
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
const CHART_HEIGHT = 459;
const LEGEND_HEIGHT = 70;

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

const StyledBlock = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: '1 1',
});

const StyledItemIcon = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  
}));

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  android: number;
  windows: number;
  apple: number;
  flag: string;
};

type CountryItemProps = {
  country: ItemProps;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <StyledBlock sx={{ minWidth: 120 }}>
        {/* <Image disabledEffect alt={country.name} src={country.flag} sx={{ width: 28, mr: 1 }} /> */}
        <Avatar   src={country.flag }sx={{marginRight:1}}/>
        <Typography variant="subtitle2">{country.name}</Typography>
      </StyledBlock>

      <StyledBlock>
        <StyledItemIcon icon="carbon:in-progress" />
        <Typography variant="body2">{fShortenNumber(country.android)}</Typography>
      </StyledBlock>

      <StyledBlock>
        <StyledItemIcon icon="ic:baseline-assessment" />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </StyledBlock>

      <StyledBlock sx={{ minWidth: 88 }}>
        <StyledItemIcon icon="carbon:task-complete"  color='primary'/>
        {/* <Iconify icon="carbon:task-complete" color='green' width={10} /> */}
        <Typography variant="body2">{fShortenNumber(country.apple)}</Typography>
      </StyledBlock>
    </Stack>
  );
}


const _appAuthors = [...Array(30)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.random(index),
  favourite: _mock.number.percent(index),
  android:_mock.number.age(index)-20 ,
  windows: round(_mock.number.rating(index)) ,
  apple: _mock.number.age(index + 10),
}));

type AuthorItemProps = {
  author: AuthoItemProps;
  index: number;
};

type AuthoItemProps = {
  id: string;
  name: string;
  avatar: string;
  favourite: number;
  android:number ,
  windows: number ,
  apple: number,
};

function AuthorItem({ author, index }: AuthorItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>
        <Typography variant="caption"  sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}>In Progress :{author.android} | Completed :{author.windows}  </Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          Occupancy:
          {fShortenNumber(author.favourite)}
          <Iconify icon="fa-solid:percentage" width={16} sx={{ mr: 0.5 }} />
        </Typography>
      </Box>

      {/* <Iconify
        icon="ant-design:trophy-filled"
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      /> */}
    </Stack>
  );
}
const statusCountsArray = [
  {
    timeFrame: "Today",
    statusCounts: {
      inProgress: 3,
      onHold: 1,
      complete: 2,
      assigned: 0,
    },
  },
  {
    timeFrame: "Yesterday",
    statusCounts: {
      inProgress: 2,
      onHold: 2,
      complete: 1,
      assigned: 1,
    },
  },
  {
    timeFrame: "Week",
    statusCounts: {
      inProgress: 5,
      onHold: 3,
      complete: 7,
      assigned: 2,
    },
  },
  {
    timeFrame: "Month",
    statusCounts: {
      inProgress: 10,
      onHold: 5,
      complete: 12,
      assigned: 8,
    },
  },
  {
    timeFrame: "All",
    statusCounts: {
      inProgress: 50,
      onHold: 20,
      complete: 60,
      assigned: 30,
    },
  },
];