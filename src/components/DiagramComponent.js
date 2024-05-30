import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DiagramComponent = ({ socket }) => {
    const [data, setData] = useState({
        labels: ['Votes'],
        datasets: [
            {
                label: 'Ja',
                backgroundColor: '#007bff',
                data: [50] // Initial value
            },
            {
                label: 'Nein',
                backgroundColor: '#dc3545',
                data: [50] // Initial value
            }
        ]
    });

    useEffect(() => {
        // Subscribe to socket event to receive updates for total values
        socket.on('updateValues', ({ ja, nein }) => {
            setData({
                labels: ['Votes'],
                datasets: [
                    {
                        label: 'Ja',
                        backgroundColor: '#007bff',
                        data: [ja]
                    },
                    {
                        label: 'Nein',
                        backgroundColor: '#dc3545',
                        data: [nein]
                    }
                ]
            });
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('updateValues');
        };
    }, [socket]);

    return (
        <div>
            <Bar
                data={data}
                options={{
                    scales: {
                        x: {
                            type: 'category',
                            stacked: true
                        },
                        y: {
                            stacked: true
                        }
                    }
                }}
            />
        </div>
    );
};

export default DiagramComponent;
