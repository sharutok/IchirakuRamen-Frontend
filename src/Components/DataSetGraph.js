import React, { useEffect, useState } from 'react'
import '../CSS/DataSetGraph.scss'
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'

const dataUrl = `http://localhost:8080/graph/data/count`
function DataSetGraph() {
    const [noOfVenInPlant, setnoOfVenInPlant] = useState([])
    const [statusOfVenInPlant, setstatusOfVenInPlant] = useState([])
    let arr1 = []
    let arr2 = []

    const dataSet = async () => {
        const resp = await fetch(dataUrl)
        const result = await resp.json()
        console.log(result);
        setnoOfVenInPlant(result.VendorsInEachPlant)
        setstatusOfVenInPlant(result.vendorStatus)
    }

    noOfVenInPlant.map(x => {
        arr1.push(x.count)
    })
    console.log(arr1);

    statusOfVenInPlant.map(y => {
        arr2.push(y.count)
    })

    useEffect(() => {
        dataSet()
    }, [])



    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const plant = ["CHD", "CHN", "RPR", "HO", "SIL"]
    return (
        <div class="charts">
            <div className="bar" >
                <Bar
                    data={{
                        labels: plant
                        , datasets: [{
                            label: 'Approved',
                            data: arr2.slice(0, 5),
                            backgroundColor: [
                                '#a2a7a5',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                        },
                        {
                            label: "Pending",
                            data: arr2.slice(5, 10),
                            backgroundColor: [
                                '#165e74',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                        }
                        ],
                    }}
                    width={50}
                    height={300}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Status of vendors in each plant',
                            },
                        },
                    }}
                ></Bar>

            </div>
            <div className="pie">
                <Doughnut
                    options={{ options }}
                    data={{
                        labels: plant
                        , datasets: [
                            {
                                data: arr1,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.7)',
                                    'rgba(54, 162, 235, 0.7)',
                                    'rgba(255, 206, 86, 0.7)',
                                    'rgba(75, 192, 192, 0.7)',
                                    'rgba(153, 102, 255, 0.7)',
                                    'rgba(255, 159, 64, 0.7)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 0.1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                            }
                        ],
                    }}
                    width={50}
                    height={300}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Number of vendors in each plant',
                            },
                        },
                    }}
                >

                </Doughnut>
            </div>
        </div>
    )
}

export default DataSetGraph

