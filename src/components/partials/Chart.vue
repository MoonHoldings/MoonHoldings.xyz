<script setup>
import { Line } from 'vue-chartjs'
import { reactive } from 'vue'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#000',
        font: {
          size: 14,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#000',
        stepSize: 10,
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
})
const chartData = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      data: [40, 20, 12],
      borderColor: '#da57ff',
      cubicInterpolationMode: 'monotone',
      tension: 0.5,
      borderWidth: 4,
    },
  ],
})
</script>

<template>
  <Line
    class="line-chart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    width="490"
    height="270"
    chart-id="line-chart"
  />
</template>
