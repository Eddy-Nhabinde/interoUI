import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ChartDownloader = ({ chartInstance }) => {

    const downloadChart = () => {
        var a = document.createElement('a');
        a.href = chartInstance.toBase64Image();
        a.download = 'my_file_name.png';
        a.click();
    }

    return (
        <Tooltip title="Baixar gráfico para png">
            <IconButton onClick={() => downloadChart()} style={{ color: '#566179' }} aria-label="upload picture" component="label">
                <FileDownloadIcon />
            </IconButton>
        </Tooltip>
    )
}

export { ChartDownloader }