import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
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
        { label: `Good (${goodRange})`, value: Number(good), color: '#0cce6b', range: goodRange },
        { label: `Needs Improvement (${mediumRange})`, value: Number(medium), color: '#ffa400', range: mediumRange },
        { label: `Poor (${poorRange})`, value: Number(poor), color: '#ff4e42', range: poorRange }
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
            <Typography variant='body1' mt={1} sx={{ textAlign: 'center', fontWeight: 'bold'}}>
                {metricName}
            </Typography>
        </>
    );
}

export default PieChartWidget;