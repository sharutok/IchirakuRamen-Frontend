import React, { useEffect, useState } from 'react'
import '../CSS/DataSetGraph.scss'
import { Bar, Doughnut } from 'react-chartjs-2'


const dataUrl = `http://localhost:8080/graph/data/count`
function DataSetGraph() {
    const [noOfVenInPlant, setnoOfVenInPlant] = useState([])
    const [statusOfVenInPlant, setstatusOfVenInPlant] = useState([])
    let arr1 = []
    let arr2 = []

    const dataSet = async () => {
        const resp = await fetch(dataUrl)
        const result = await resp.json()
        // console.log(result);
        setnoOfVenInPlant(result.VendorsInEachPlant)
        setstatusOfVenInPlant(result.vendorStatus)
    }

    noOfVenInPlant.map(x => {
        return arr1.push(x.count)
    })


    statusOfVenInPlant.map(y => {
        return arr2.push(y.count)
    })

    useEffect(() => {
        dataSet()
    }, [])

    const plant = ["CHD", "CHN", "RPR", "HO", "SIL"]
    return (
        <div className='charts'>
            <div className="bar" >
                <Bar
                    data={{
                        labels: plant
                        , datasets: [{
                            label: 'Approved',
                            data: arr2.slice(0, 5),
                            backgroundColor: [
                                '#3a0ca3',

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
                                '#4361ee',
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
                    data={{
                        labels: plant
                        , datasets: [
                            {
                                data: arr1,
                                backgroundColor: [
                                    "#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#a8dadc",

                                ],
                                borderColor: [
                                    "#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#a8dadc",
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

