import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './VerticalChartSkeleton.css'

const VerticalChartSkeleton = () => {
  return (
    <Box className='box-skeleton'>
      <Skeleton animation='wave' height='34%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='80%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='70%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='60%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='50%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='40%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='30%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='20%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='10%' variant='rectangular' className='mr-3'/>
      <Skeleton animation='wave' height='55%' variant='rectangular' className='mr-3'/>
    </Box>
  );
}
export {VerticalChartSkeleton};
