import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../assets'
import MUIDataTable from 'mui-datatables';
import { convertToTitleCase } from '../utils';
import PieChart from './PieChart';
import PieChartWidget from './PieChart';

const DataTable = (props) => {
    const { data } = props;
    const columns = [
        {
            name: 'metricName',
            label: 'Metric Title',
        },
        {
            name: 'good',
            label: 'Good',
        },
        {
            name: 'medium',
            label: 'Needs Improvement',
        },
        {
            name: 'poor',
            label: 'Poor',
        },
        {
            name: 'p75',
            label: 'p75',
        },
    ];

    const dataRows = Object.keys(data.record.metrics).map((metricName) => {
        return {
            metricName: convertToTitleCase(metricName),
            good: (data.record.metrics[metricName].histogram[0].density * 100).toFixed(2) + '%',
            medium: (data.record.metrics[metricName].histogram[1].density * 100).toFixed(2) + '%',
            poor: (data.record.metrics[metricName].histogram[2].density * 100).toFixed(2) + '%',
            p75: data.record.metrics[metricName].percentiles.p75,
        };
    });

    const options = {
        filterType: 'dropdown', // Add a filter dropdown for each column
        selectableRows: 'none', // Disable row selection
        responsive: 'standard', // Enable responsive design
        download: false, // Disable download options
        print: false, // Disable print option
    };
    return (
        <Accordion key={data.record.key.origin} TransitionProps={{ unmountOnExit: true }} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant='h6'>Site: {data.record.key.origin}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ boxShadow: 'none' }}>
                <MUIDataTable
                    title={'Chrome UX Report'}
                    data={dataRows}
                    columns={columns}
                    options={options}
                    sx={{
                        '.MUIDataTableHeadCell-sortAction': {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Grid container spacing={3} mt={2}>
                    {Object.keys(data.record.metrics).map((metricName) => {
                        const good = (data.record.metrics[metricName].histogram[0].density * 100).toFixed(2);
                        const medium = (data.record.metrics[metricName].histogram[1].density * 100).toFixed(2);
                        const poor = (data.record.metrics[metricName].histogram[2].density * 100).toFixed(2);

                        const goodRange = `${data.record.metrics[metricName].histogram[0].start} - ${data.record.metrics[metricName].histogram[0].end}ms`
                        const mediumRange = `${data.record.metrics[metricName].histogram[1].start} - ${data.record.metrics[metricName].histogram[1].end}ms`
                        const poorRange = `${data.record.metrics[metricName].histogram[2].start}ms+`

                        return (
                            <Grid item xs={12} md={4}>
                                <center>
                                    <PieChartWidget
                                        metricName={convertToTitleCase(metricName)}
                                        good={good}
                                        medium={medium}
                                        poor={poor}
                                        goodRange={goodRange}
                                        mediumRange={mediumRange}
                                        poorRange={poorRange}
                                    />
                                </center>
                            </Grid>
                        );
                    })}
                </Grid>

            </AccordionDetails>
        </Accordion>
    )
}

export default DataTable