<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
      <div class="container mx-auto flex h-16 items-center justify-between py-4">
        <div class="flex items-center gap-2 ml-2">
          <router-link to="/" class="flex items-center gap-2 font-bold">
            <img
              src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj"
              alt="UTECH"
              class="h-8 w-8 rounded-full"
            />
            <span>UTech: Student Finance Queue</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
<button
  @click="toggleExportMenu"
  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2 relative"
>
  <Download class="h-4 w-4" />
  Report
</button>
<div v-if="showExportMenu" :class="exportMenuClasses" class="mt-2 rounded-md shadow-lg bg-popover text-popover-foreground z-50 p-4 max-h-[600px] overflow-auto space-y-4">
  <div>
    <label class="block mb-1 font-semibold">Report Type</label>
    <select v-model="selectedReportType" class="w-full p-2 border rounded" aria-label="Select report type">
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="annual">Annual</option>
    </select>
  </div>
  <div>
    <label class="block mb-1 font-semibold">Date</label>
    <input type="date" v-model="selectedDate" class="w-full p-2 border rounded" />
  </div>
  <div class="flex justify-between">
    <button @click="showExportMenu = false" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
    <button @click="generateReport" class="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Generate Report</button>
  </div>

  <div v-if="reportData">
    <div
      class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
      @click="closeReportMenu"
    ></div>
    <div
      class="fixed z-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg bg-popover text-popover-foreground p-4 max-h-[600px] overflow-auto space-y-4 w-80 flex flex-col justify-between h-[600px]"
      @click.stop
    >
      <h3 class="font-semibold">Report Summary</h3>
      <ul class="list-disc list-inside space-y-1 overflow-auto flex-grow">
        <li>Total Service Reps: {{ reportData.totalServiceReps }}</li>
        <li>Active Service Reps: {{ reportData.activeServiceReps }}</li>
        <li>Average Service Time (min): {{ reportData.averageServiceTimeMinutes }}</li>
        <li>Total Students Joined: {{ reportData.totalStudentsJoinedToday }}</li>
        <li>Top Issue: {{ reportData.topIssue }} ({{ reportData.topIssuePercentage }}%)</li>
      </ul>

      <h3 class="font-semibold">Peak Hours</h3>
      <Bar :data="peakHoursChartData" :options="chartOptions" style="height: 200px;" />

      <div class="flex justify-end mt-auto">
        <button @click="fetchAndExportReport" class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Export</button>
      </div>
    </div>
  </div>
</div>
          <button
            @click="isAddTellerOpen = true"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 flex items-center gap-2 mr-2"
          >
            <Plus class="h-4 w-4" />
            Add Teller
          </button>
        </div>
      </div>
    </header>
    <main class="flex-1 pb-10 flex justify-center items-start pt-10">
      <div class="w-full max-w-6xl px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div class="ml-2">
            <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p class="text-muted-foreground">Manage tellers and view queue analytics.</p>
          </div>
          <div class="flex items-center gap-4">
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col space-y-2">
            <div class="grid w-full grid-cols-2 md:w-[400px]">
              <button
                @click="activeTab = 'tellers'"
                :class="[
                  'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ml-2',
                  activeTab === 'tellers'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground',
                ]"
              >
                Representative Management
              </button>
              <button
                @click="activeTab = 'analytics'"
                :class="[
                  'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  activeTab === 'analytics'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground',
                ]"
              >
                Queue Analytics
              </button>
            </div>

            <div v-if="activeTab === 'tellers'" class="space-y-6">
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2 mr-2">
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-2xl font-semibold leading-none tracking-tight">
                    Customer Service Rep Management
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    View, add, edit, or remove tellers from the system.
                  </p>
                </div>
                <div class="p-6">
                  <AdminTellerTable />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">Total Tellers</h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">{{ totalServiceReps }}</div>
                    <p class="text-sm text-muted-foreground">
                      {{ activeServiceReps }} currently active
                    </p>
                  </div>
                </div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">
                      Avg. Service Time
                    </h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">{{ averageServiceTimeMinutes }} min</div>
                    <p class="text-sm text-muted-foreground">
                      Across all Customer Service Representatives
                    </p>
                  </div>
                </div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm mr-2">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">
                      Satisfaction Rate
                    </h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">4.6/5</div>
                    <p class="text-sm text-muted-foreground">Based on 124 ratings</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'analytics'" class="space-y-6">
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2 mr-2" style="height: 300px;">
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-2xl font-semibold leading-none tracking-tight">
                    Queue Analytics
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    View trends and statistics about the student queue.
                  </p>
                </div>
                <div class="p-6" style="height: 220px;">
                  <Bar :data="chartData" :options="chartOptions" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">Today's Queue</h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">{{ totalStudentsJoinedToday }}</div>
                    <!-- <p class="text-sm text-muted-foreground">7 currently waiting</p> -->
                  </div>
                </div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">
                      Avg. Wait Time
                    </h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">{{ averageServiceTimeMinutes }} min</div>
                  </div>
                </div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">Peak Hours</h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">
                      <template v-for="hour in peakHours" :key="hour.hour">
                        {{ formatHour(hour.hour)
                        }}<span v-if="hour !== peakHours[peakHours.length - 1]">, </span>
                      </template>
                    </div>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {{ peakHours.reduce((sum, h) => sum + h.count, 0) }} people joined at peak hours
                  </p>
                </div>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">Top Issue</h3>
                  </div>
                  <div class="p-6 pt-0">
                    <div class="text-3xl font-bold">{{ topIssue }}</div>
                    <p class="text-sm text-muted-foreground">
                      {{ topIssuePercentage }}% of all queries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <footer class="border-t py-6">
    <div class="container mx-auto text-center">
      <p class="text-sm leading-loose text-muted-foreground">
        © 2025 UTechStudentQueue. All rights reserved.
      </p>
    </div>
  </footer>
  <div>
    <AdminAddTellerDialog :open="isAddTellerOpen" @update:open="isAddTellerOpen = $event" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Clock, Bell, User, LogOut, Download, Plus } from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import AdminTellerTable from './AdminTellerTable.vue'
import AdminQueueStats from './AdminQueueStats.vue'
import AdminAddTellerDialog from './AdminAddTellerDialog.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const isUserMenuOpen = ref(false)
const isAddTellerOpen = ref(false)
const activeTab = ref('tellers')

const totalServiceReps = ref(0)
const activeServiceReps = ref(0)
const averageServiceTimeMinutes = ref(0)
const totalStudentsJoinedToday = ref(0)
const peakHours = ref([])
const topIssue = ref('')
const topIssuePercentage = ref(0)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "People Joined",
      backgroundColor: "#3b82f6",
      data: [],
    },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Queue Peak Hours",
    },
  },
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/users/service-reps')
    if (!response.ok) {
      throw new Error('Failed to fetch service reps stats')
    }
    const data = await response.json()
    totalServiceReps.value = data.totalServiceReps
    activeServiceReps.value = data.activeServiceReps
    averageServiceTimeMinutes.value = data.averageServiceTimeMinutes
    totalStudentsJoinedToday.value = data.totalStudentsJoinedToday
    peakHours.value = data.peakHours
    topIssue.value = data.topIssue
    topIssuePercentage.value = data.topIssuePercentage

    // Update chart data
    chartData.value.labels = peakHours.value.map((h) => formatHour(h.hour))
    chartData.value.datasets[0].data = peakHours.value.map((h) => h.count)
  } catch (error) {
    console.error('Error fetching service reps stats:', error)
  }
})

const formatHour = (hour24) => {
  let hour = parseInt(hour24, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  if (hour === 0) hour = 12
  return `${hour}${ampm}`
}

function exportReports() {
  // This function is now replaced by fetchAndExportReport triggered from menu
}

const showExportMenu = ref(false)
const selectedReportType = ref('daily')
const selectedDate = ref(new Date().toISOString().substr(0, 10))
const reportData = ref(null)

const exportMenuAlignRight = ref(true)
const isReportGenerated = ref(false)

function toggleExportMenu() {
  showExportMenu.value = !showExportMenu.value
  if (!showExportMenu.value) {
    isReportGenerated.value = false
  }
  if (showExportMenu.value) {
    // Check if menu will overflow viewport width, adjust alignment
    nextTick(() => {
      const menu = document.querySelector('.export-menu')
      if (menu) {
        const rect = menu.getBoundingClientRect()
        if (rect.right > window.innerWidth) {
          exportMenuAlignRight.value = false
        } else {
          exportMenuAlignRight.value = true
        }
      }
    })
  }
}

async function generateReport() {
  if (!selectedDate.value) {
    alert('Please select a date')
    return
  }
  try {
    const response = await fetch(`http://localhost:8080/reports?type=${selectedReportType.value}&date=${selectedDate.value}`)
    if (!response.ok) {
      throw new Error('Failed to fetch report')
    }
    const data = await response.json()
    if (!data) {
      alert('No data found for the selected report')
      return
    }
    reportData.value = data
    isReportGenerated.value = true
  } catch (error) {
    alert('Error generating report: ' + error.message)
  }
}

const exportMenuClasses = computed(() => {
  if (isReportGenerated.value) {
    return [
      'fixed',
      'top-1/2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'rounded-md',
      'shadow-lg',
      'bg-popover',
      'text-popover-foreground',
      'z-50',
      'p-4',
      'max-h-[600px]',
      'overflow-auto',
      'space-y-4',
      'w-80',
      'export-menu',
      'flex',
      'flex-col',
      'justify-between',
      'h-[600px]',
    ]
  }
  return [
    'absolute',
    'mt-2',
    'rounded-md',
    'shadow-lg',
    'bg-popover',
    'text-popover-foreground',
    'z-50',
    'p-4',
    'max-h-[600px]',
    'overflow-auto',
    'space-y-4',
    'w-80',
    exportMenuAlignRight.value ? 'right-0' : 'left-0',
    'export-menu',
  ]
})


import { nextTick } from 'vue'

const closeReportMenu = () => {
  reportData.value = null
  isReportGenerated.value = false
  // Also close the export menu if open
  showExportMenu.value = false
  nextTick(() => {
    // Additional cleanup if needed
  })
}
</script>
