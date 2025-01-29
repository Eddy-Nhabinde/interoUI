import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SimpleBackdrop = ({open}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        invisible={false} 
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export {SimpleBackdrop}