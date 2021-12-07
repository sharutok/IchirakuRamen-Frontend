import React, { useEffect, useState } from 'react'
import { Bar, Pie, Doughnut, } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)
function DatasetGraph2({ status, plant }) {

    return (
        <div>
            <Bar
                data={{
                    labels: ["Vendors"]
                    , datasets: [
                        {
                            barPercentage: 0.5,
                            label: 'Approved',
                            data: [status.approved],
                            backgroundColor: [
                                '#adb5bd',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                        },
                        {
                            barPercentage: 0.5,
                            label: "Pending",
                            data: [status.pending],
                            backgroundColor: [
                                '#403d39',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.1)',
                            ],
                        },

                    ],
                }}
                width={50}
                height={300}
                options={{
                    responsive: true,
                    scales: {

                        x: {
                            stacked: true
                        }, y: {
                            stacked: true
                        },

                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Status of vendors in ${plant}`,
                        },
                    },
                }}
            ></Bar>
        </div>
    )
}

export default DatasetGraph2
