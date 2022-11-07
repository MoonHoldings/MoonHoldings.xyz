<script setup>
import { Line } from 'vue-chartjs'
import { computed, reactive } from 'vue'
import { useCoinStore } from '@/stores/coin'
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
import decorateNumber from '@/utils/decorateNumber'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

const coinStore = useCoinStore()

const willBeginAtZero = computed(() => {
  const maxValue = Math.max(...coinStore.chartValues)

  if (maxValue >= 10000) {
    return false
  } else {
    return true
  }
})

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.4,
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
      beginAtZero: willBeginAtZero,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        callback: function (value, index, ticks) {
          return `$${decorateNumber(value)}`
        },
        color: '#000',
        font: {
          size: 15,
        },
        count: 5,
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
  labels: coinStore.chartLabels,
  datasets: [
    {
      data: coinStore.chartValues,
      borderColor: '#da57ff',
      borderWidth: 5,
      tension: 0.4,
    },
  ],
})
</script>

<template>
  <Line
    class="line-chart"
    :chart-options="chartOptions"
    :chart-data="chartData"
    height="250"
    chart-id="line-chart"
  />
</template>
