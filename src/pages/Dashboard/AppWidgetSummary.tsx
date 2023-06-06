// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import Iconify from 'src/components/iconify';
import { fShortenNumber } from 'src/utils/formatNumber';
import { CSSProperties, useState } from 'react';
// utils
// components

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface AppWidgetSummaryProp  {
  color: string,
  icon: string,
  title: string,
  total: number,
  sx: CSSProperties
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }:AppWidgetSummaryProp) {
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme:any) => theme.palette[color].darker,
        bgcolor: (theme:any) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: (theme:any) => theme.palette[color].dark,
          backgroundImage: (theme:any) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                         Import Card
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                         Copy Data
                      </MenuItem>
                     
                    </Menu>
    </Card>
  );
}
