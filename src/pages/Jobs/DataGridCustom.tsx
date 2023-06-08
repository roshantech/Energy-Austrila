import { MouseEvent, SetStateAction, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, Rating, LinearProgress, IconButton, MenuItem, Menu, Backdrop, CircularProgress, Grid } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowSelectionModel,
  getGridNumericOperators,
  GridFilterInputValueProps,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
// utils
import Iconify from 'src/components/iconify';
import { CustomAvatar } from 'src/components/custom-avatar';
import Label from 'src/components/label';
import { fPercent } from 'src/utils/formatNumber';
// components

// ----------------------------------------------------------------------

interface ActionsMenuProps {
  onView: (item: boolean) => void;
}

function ActionsMenu({onView}: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Perform deletion logic for the selected row
    onView(true)
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleDelete}><Iconify icon="carbon:view-filled" sx={{marginRight:1}}/>  View</MenuItem>

      </Menu>
      
    </div>
  );
}
// ----------------------------------------------------------------------

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
  }[];
interface ChildProps {
  data : Props,
  sendData: (data: string) => void;
}

export default function DataGridCustom({ data ,sendData}:ChildProps) {
  const columns: GridColDef[] = [
    // OPTIONS
    // https://mui.com/x/api/data-grid/grid-col-def/#main-content
    // - hide: false (default)
    // - editable: false (default)
    // - filterable: true (default)
    // - sortable: true (default)
    // - disableColumnMenu: false (default)
  
    // FIELD TYPES
    // --------------------
    // 'string' (default)
    // 'number'
    // 'date'
    // 'dateTime'
    // 'boolean'
    // 'singleSelect'
  
    {
      field: 'id',
      width: 76,

    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      align: 'center',
      headerAlign: 'center',
      width: 64,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <CustomAvatar name={params.row.name} sx={{ width: 36, height: 36 }} />,
    },
    {
      field: 'name',
      headerName: 'Assessor',
      flex: 1,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'Requestor',
      flex: 1,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
          {params.row.email}
        </Typography>
      ),
    },
    {
      field: 'lastLogin',
      type: 'dateTime',
      headerName: 'Last login',
      align: 'right',
      headerAlign: 'right',
      width: 170,
      editable:true,
    },
    {
      field: 'createdDate',
      type: 'dateTime',
      headerName: 'Created Date',
      align: 'right',
      headerAlign: 'right',
      width: 170,
      editable:true,

    },
    // {
    //   field: 'rating',
    //   type: 'number',
    //   headerName: 'Rating',
    //   width: 160,
    //   disableColumnMenu: true,
    //   renderCell: (params) => (
    //     <Rating size="small" value={params.row.rating} precision={0.5} readOnly />
    //   ),
    // },
    {
      field: 'status',
      type: 'singleSelect',
      headerName: 'Status',
      valueOptions: ['Assigned', 'In Progress', 'On Hold','Urgent Job','Exception','New','Cancelled'],
      align: 'center',
      headerAlign: 'center',
      width: 160,
      editable:true,
      renderCell: (params) => RenderStatus(params.row.status),
    },
    
    // {
    //   field: 'occupency',
    //   type: 'number',
    //   headerName: 'Occupency',
    //   align: 'center',
    //   headerAlign: 'center',
    //   width: 160,
    //   editable:true,
    //   renderCell: (params) => (
    //     <Stack spacing={1} direction="row" alignItems="center" sx={{ px: 1, width: 1, height: 1 }}>
    //       <LinearProgress
    //         value={params.row.occupency}
    //         variant="determinate"
    //         color={
    //           (params.row.occupency < 30 && 'error') ||
    //           (params.row.occupency > 30 && params.row.occupency < 70 && 'warning') ||
    //           'primary'
    //         }
    //         sx={{ width: 1, height: 6 }}
    //       />
    //       <Typography variant="caption" sx={{ width: 80 }}>
    //         {fPercent(params.row.occupency)}
    //       </Typography>
    //     </Stack>
    //   ),
    // },
    {
      field: 'action',
      headerName: 'Action',
      align: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <ActionsMenu   onView={() => {handleView(params.row)}} />
        </>
  
        
      ),
    },
  ];
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };
  const handleView = (row:any) => {
    sendData(row.id)
  }

  if (columns.length > 0) {
    const ratingColumn = columns.find((column) => column.field === 'rating')!;
    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue,
    }));
    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators,
    };
  }


  const selected = data.filter((row) => selectionModel.includes(row.id));


  return (
    <DataGrid
     // checkboxSelection
      disableRowSelectionOnClick
      rows={data}
      columns={columns}
      pagination
      onRowSelectionModelChange={(newSelectionModel: any) => {
        setSelectionModel(newSelectionModel);
      }}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
}

// ----------------------------------------------------------------------
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------

function RenderStatus(getStatus: string) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label
      variant={isLight ? 'soft' : 'filled'}
      color={(getStatus === 'Exception' && 'error') || (getStatus === 'Urgent Job' && 'warning') ||(getStatus === 'On Hold' && 'secondary') ||(getStatus === 'Cancelled' && 'warning') || 'success'}
      sx={{ mx: 'auto' }}
    >
      {getStatus}
    </Label>
  );
}

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue }: GridFilterInputValueProps) {
  return (
    <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
      <Rating
        size="small"
        precision={0.5}
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
      />
    </Box>
  );
}
