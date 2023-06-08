import { useLocation, Outlet } from 'react-router-dom';
// @mui
import { AppBar, Box, Stack, Toolbar, useTheme } from '@mui/material';
import NavSectionHorizontal from 'src/components/nav-section/horizontal';
import Iconify from 'src/components/iconify';
import { HEADER } from 'src/config-global';



// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = false;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Stack spacing={2} sx={{ mb: 0 }}>
          <AppBar
            position="static"
            component="nav"
            color="default"
            sx={{
              boxShadow: 0,
              width:"100",
              position:'fixed',
              zIndex:1
              // top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
              
            }}
          >
              <Toolbar>
                <img src={!isDarkMode ? './logo.png' : './logodark.png'} alt="Logo"  style={{ width: '50px', height: '50px' }}/>
              <NavSectionHorizontal data={NAV_ITEMS} />             
               <NavSectionHorizontal data={NavRightItems} sx={{margin:0}}/>

            </Toolbar>
          </AppBar>
        </Stack>
    
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop:8
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
}
const NavRightItems = [
  {subheader: 'Profile',
  items: [
  {
    title: 'Profile',
    path: '#',
    icon: <Iconify icon="healthicons:ui-user-profile" />,
    children: [
      { title: 'Brodcast', path: '#' ,icon: <Iconify icon="ph:broadcast-bold" />},
      { title: 'Help', path: '#' ,icon: <Iconify icon="ic:baseline-help" />},
      { title: 'logout', path: '#' ,icon: <Iconify icon="solar:logout-3-bold" />},
    ],
  },]}
]

const NAV_ITEMS = [
  {
    subheader: 'Marketing',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <Iconify icon="carbon:dashboard" />,
      },
      {
        title: 'Jobs',
        path: '/jobs',
        icon: <Iconify icon="eos-icons:job" />,
      },
      {
        title: 'Teams',
        path: '#',
        icon: <Iconify icon="fluent:people-team-48-filled" />,
        children: [
          { title: 'Workflow Team', path: '#' },
          { title: 'Assessor Team ', path: '/accessorlist' },
        ],
      },
      {
        title: 'Report',
        path: '/three',
        icon: <Iconify icon="carbon:report" />,
      },
      
     
    ],
  },
  
];
