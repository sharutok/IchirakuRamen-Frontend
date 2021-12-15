import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
import '../CSS/DatasetGraph2.scss'
Chart.register(CategoryScale)
function DatasetGraph2({ status, plant }) {

    return (
        <div className='chart2'>

            <div className="bar2">
                <Bar
                    data={{
                        labels: ["Vendors"]
                        , datasets: [
                            {
                                barPercentage: 0.5,
                                label: 'Approved',
                                data: [status.approved],
                                backgroundColor: [
                                    '#3a0ca3',
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
                                    '#4361ee',
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
        </div>


    )
}

export default DatasetGraph2
