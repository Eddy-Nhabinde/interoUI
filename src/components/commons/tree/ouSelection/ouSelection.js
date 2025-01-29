import React from 'react';
import { IconButton, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function OUSelection({ isFetching, handleClickMenu, cancelSelection, selectedOu }) {
    let ou = ""

    if (selectedOu)
        ou = selectedOu.label

    return (
        <div style={{
            margin: '0 0 0 -1px',
            padding: 8,
            width: "250px"
        }} >
            {
                !ou ?
                    <Button
                        onClick={handleClickMenu}
                        style={{
                            fontSize: 11,
                            fontWeight: 425,
                            paddingBottom: 5,
                            cursor: "pointer",
                            width: "160px",
                            textTransform: 'capitalize'
                        }} variant='outlined' >
                        {isFetching ? <CircularProgress size={"19px"} /> : "Select Organisation Unit"}
                    </Button>
                    :
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 28,
                        marginTop: 8,
                        marginBottom: 4,
                        paddingLeft: 5,
                        borderLeft: '2px solid #2A628F',
                        color:"#2A628F"
                    }}>
                        <div>{ou}</div>
                        <div style={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <IconButton style={{
                                float: 'right',
                                width: 24,
                                height: 24,
                                padding: 0,
                                color:"#E84855"
                            }} onClick={cancelSelection} >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
            }
        </div>
    )
}