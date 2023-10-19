import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { convertToTitleCase } from '../utils';
import { Typography } from '@mui/material';

const sizing = {
    margin: { right: 3 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};

const PieChartWidget = (props) => {
    const { metricName, good, medium, poor, goodRange, mediumRange, poorRange } = props;
    const data = [
        { label: `Good (${goodRange})`, value: good, color: '#0cce6b', range: goodRange },
        { label: `Needs Improvement (${mediumRange})`, value: medium, color: '#ffa400', range: mediumRange },
        { label: `Poor (${poorRange})`, value: poor, color: '#ff4e42', range: poorRange }
    ];

    return (
        <>
            <PieChart
                series={[
                    {
                        outerRadius: 100,
                        data,
                        arcLabel: (item) => `${item.range}`,
                        arcLabelMinAngle: 45,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: 14,
                    },
                }}
                {...sizing}
            />
            <p>
                <Typography variant='body1'><center><strong>{metricName}</strong></center></Typography>
            </p>
        </>
    );
}

export default PieChartWidget;