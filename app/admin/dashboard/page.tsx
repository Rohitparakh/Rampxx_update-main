"use client";
import React from 'react';
import Sidebar from "@/app/admin/sidebar/sidebar";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DashBoardPage = () => {
  const viewerData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Viewers',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
      },
    ],
  };

  const engagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Engagement',
        data: [200, 400, 300, 500],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Chart',
        font: {
          size: 16,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-semibold">Dashboard Content</h1>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-medium">Viewers Over Time</h2>
              <div className="h-64">
                <Line 
                  data={viewerData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        ...chartOptions.plugins.title,
                        text: 'Viewers Over Time'
                      }
                    }
                  }} 
                />
              </div>
            </div>
            <div className="lg:col-span-2 p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-medium">Weekly Engagement</h2>
              <div className="h-64">
                <Bar 
                  data={engagementData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        ...chartOptions.plugins.title,
                        text: 'Weekly Engagement'
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;