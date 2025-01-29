import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ClickableAndDeletableChips = ({clearParams}) => {
    

  const handleDelete = () => {
    clearParams()
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Não foram encontrados dados" color="warning"
        onDelete={()=>handleDelete()}
      />
    </Stack>
  );
}

export {ClickableAndDeletableChips};