<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
      <div class="container mx-auto flex h-16 items-center justify-between py-4">
        <div class="flex items-center gap-2 ml-2">
          <router-link to="/" class="flex items-center gap-2 font-bold">
            <img
              src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj"
              alt="UTECH" class="h-8 w-8 rounded-full" />
            <span>UTech: Student Finance Queue</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <button @click="toggleExportMenu"
            class="inline-flex min-w-[80px] items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2 relative">
            <Download class="h-4 w-4" />
            Report
          </button>
          <div v-if="showExportMenu"
            class="fixed top-16 right-4 rounded-md shadow-lg bg-popover text-popover-foreground z-50 p-8 space-y-4 w-80"
            @click.stop>
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
              <button @click="showExportMenu = false" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
              <button @click="generateReport" class="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">
                Generate Report
              </button>
            </div>
          </div>
          <button @click="isAddTellerOpen = true"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 flex items-center gap-2 mr-2">
            <Plus class="h-4 w-4" />
            Add Teller
          </button>
          <div class="relative">
            <button @click="isUserMenuOpen = !isUserMenuOpen"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] text-white h-9 px-4 py-2 flex items-center gap-2 mr-2">
              <User class="h-4 w-4" />
              <span>Teller Name</span>
            </button>
            <div v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover text-popover-foreground z-50">
              <div class="py-1 px-2 text-sm font-medium">My Account</div>
              <div class="h-px bg-muted my-1"></div>
              <button
                class="flex w-full items-center px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">Profile</button>
              <button
                class="flex w-full items-center px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">Settings</button>
              <div class="h-px bg-muted my-1"></div>
              <router-link to="/">
                <button
                  class="flex w-full items-center px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                  @click="logout()">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1 pb-10 flex justify-center items-start pt-10">
      <div class="w-full max-w-6xl px-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div class="ml-2">
            <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p class="text-muted-foreground">Manage tellers and view queue analytics.</p>
          </div>
          <div class="flex items-center gap-4"></div>
        </div>
        <div class="w-full">
          <div class="flex flex-col space-y-2">
            <div class="grid w-full grid-cols-2 md:w-[400px]">
              <button @click="activeTab = 'tellers'" :class="[
                'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ml-2',
                activeTab === 'tellers'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground',
              ]">
                Representative Management
              </button>
              <button @click="activeTab = 'analytics'" :class="[
                'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                activeTab === 'analytics'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground',
              ]">
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
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2 mr-2" style="height: 300px">
                <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-2xl font-semibold leading-none tracking-tight">
                    Queue Analytics
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    View trends and statistics about the student queue.
                  </p>
                </div>
                <div class="p-6" style="height: 220px">
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
                    {{peakHours.reduce((sum, h) => sum + h.count, 0)}} people joined at peak hours
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
        <!-- New report display section -->
        <div v-if="isReportGenerated"
          class="fixed inset-0 backdrop-blur-sm bg-transparent flex justify-center items-center z-50 p-4"
          @click.self="closeReportMenu">
          <div class="bg-white rounded-lg shadow-lg max-w-[90vw] w-full max-h-[90vh] overflow-auto p-6 space-y-6">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-2xl font-bold">Generated Report</h2>
                <p class="text-sm text-muted-foreground">
                  {{ reportTypeDescription }} {{ reportDateDescription }}
                </p>
              </div>
              <button @click="exportReportExcel"
                class="ml-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                aria-label="Export report as Excel">
                Export Excel
              </button>
              <button @click="closeReportMenu" class="text-red-600 hover:text-red-800 font-bold text-xl"
                aria-label="Close report modal">
                &times;
              </button>
            </div>
            <div class="space-y-6 overflow-auto max-h-[70vh]">
              <div>
                <h3 class="text-lg font-semibold mb-2">Summary</h3>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Total Service Representatives: {{ reportData.totalServiceReps }}</li>
                  <li>Active Service Representatives: {{ reportData.activeServiceReps }}</li>
                  <li>Average Service Time: {{ reportData.averageServiceTimeMinutes }} minutes</li>
                  <li>Total Students Joined Today: {{ reportData.totalStudentsJoinedToday }}</li>
                  <li>
                    Top Issue: {{ reportData.topIssue }} ({{ reportData.topIssuePercentage }}%)
                  </li>
                </ul>
                <h3 class="text-lg font-semibold mt-4 mb-2">Service Representatives</h3>
                <table class="w-full text-sm border border-gray-300 rounded">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-2 text-left">Name</th>
                      <th class="border border-gray-300 p-2 text-left">Email</th>
                      <th class="border border-gray-300 p-2 text-left">Status</th>
                      <th class="border border-gray-300 p-2 text-left">Students Served</th>
                      <th class="border border-gray-300 p-2 text-left">Avg. Wait Time (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="rep in reportData.serviceReps" :key="rep.id">
                      <td class="border border-gray-300 p-2">{{ rep.name }}</td>
                      <td class="border border-gray-300 p-2">{{ rep.email }}</td>
                      <td class="border border-gray-300 p-2">{{ rep.status }}</td>
                      <td class="border border-gray-300 p-2">{{ rep.studentsServed }}</td>
                      <td class="border border-gray-300 p-2">{{ rep.averageWaitTimeMinutes }}</td>
                    </tr>
                  </tbody>
                </table>
                <h3 class="text-lg font-semibold mt-4 mb-2">Service Representatives Chart</h3>
                <div class="mb-6" style="height: 250px" v-if="peakHoursChartData.labels.length > 0">
                  <Bar :data="peakHoursChartData" :options="peakHoursChartOptions" />
                </div>
                <h3 class="text-lg font-semibold mt-4 mb-2">Issues Summary</h3>
                <table class="w-full text-sm border border-gray-300 rounded">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-2 text-left">Issue Name</th>
                      <th class="border border-gray-300 p-2 text-left">Count</th>
                      <th class="border border-gray-300 p-2 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="issue in reportData.issuesSummary" :key="issue.issueName">
                      <td class="border border-gray-300 p-2">{{ issue.issueName }}</td>
                      <td class="border border-gray-300 p-2">{{ issue.count }}</td>
                      <td class="border border-gray-300 p-2">{{ issue.percentage }}%</td>
                    </tr>
                  </tbody>
                </table>
                <h3 class="text-lg font-semibold mt-4 mb-2">Issues Summary Chart</h3>
                <div class="mb-6" style="height: 250px" v-if="issuesSummaryChartData.labels.length > 0">
                  <Bar :data="issuesSummaryChartData" :options="issuesSummaryChartOptions" />
                </div>
                <h3 class="text-lg font-semibold mt-4 mb-2">Detailed Issue Status Summary</h3>
                <table class="w-full text-sm border border-gray-300 rounded">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-300 p-2 text-left">Issue Name</th>
                      <th class="border border-gray-300 p-2 text-left">Completed Count</th>
                      <th class="border border-gray-300 p-2 text-left">Not Completed Count</th>
                      <th class="border border-gray-300 p-2 text-left">Total Count</th>
                      <th class="border border-gray-300 p-2 text-left">Percentage Completed</th>
                      <th class="border border-gray-300 p-2 text-left">Percentage Not Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in reportData.detailedIssueStatusSummary" :key="detail.issueName">
                      <td class="border border-gray-300 p-2">{{ detail.issueName }}</td>
                      <td class="border border-gray-300 p-2">{{ detail.completedCount }}</td>
                      <td class="border border-gray-300 p-2">{{ detail.notCompletedCount }}</td>
                      <td class="border border-gray-300 p-2">{{ detail.totalCount }}</td>
                      <td class="border border-gray-300 p-2">{{ detail.percentageCompleted }}%</td>
                      <td class="border border-gray-300 p-2">
                        {{ detail.percentageNotCompleted }}%
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h3 class="text-lg font-semibold mt-4 mb-2">Detailed Issue Status Summary Chart</h3>
                <div class="mb-6" style="height: 250px" v-if="detailedIssueStatusChartData.labels.length > 0">
                  <Bar :data="detailedIssueStatusChartData" :options="detailedIssueStatusChartOptions" />
                </div>
                <!-- Added Student Levels section -->
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">Student Levels</h3>
                    <table class="w-full text-sm border border-gray-300 rounded">
                      <thead>
                        <tr class="bg-gray-100">
                          <th class="border border-gray-300 p-2 text-left">Student Level</th>
                          <th class="border border-gray-300 p-2 text-left">Count</th>
                          <th class="border border-gray-300 p-2 text-left">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="level in studentLevels" :key="level.studentLevel">
                          <td class="border border-gray-300 p-2">{{ level.studentLevel }}</td>
                          <td class="border border-gray-300 p-2">{{ level.count }}</td>
                          <td class="border border-gray-300 p-2">{{ level.percentage }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mb-6" style="height: 250px" v-if="studentLevelsChartData.labels.length > 0">
                    <Bar :data="studentLevelsChartData" :options="studentLevelsChartOptions" />
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
import { ref, onMounted, computed, nextTick } from 'vue'
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
import { api, authApi } from '@/services/api'
import * as XLSX from 'xlsx'

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
      label: 'People Joined',
      backgroundColor: '#3b82f6',
      data: [],
    },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Queue Peak Hours',
    },
  },
}

const showExportMenu = ref(false)
const selectedReportType = ref('daily')
const selectedDate = ref(new Date().toISOString().substr(0, 10))
const reportData = ref(null)

// Added studentLevels reactive ref and chart data
const studentLevels = ref([])

const studentLevelsChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Student Levels',
      backgroundColor: ['#3b82f6', '#f87171', '#34d399', '#fbbf24', '#a78bfa'],
      data: [],
    },
  ],
})

const studentLevelsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' },
    title: { display: true, text: 'Student Levels' },
  },
}

const exportMenuAlignRight = ref(true)
const isReportGenerated = ref(false)

function toggleExportMenu() {
  showExportMenu.value = !showExportMenu.value
  if (!showExportMenu.value) {
    isReportGenerated.value = false
  }
  if (showExportMenu.value) {
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
    const response = await api.get(
      `/users/reports?type=${selectedReportType.value}&date=${selectedDate.value}`,
    )
    if (response.status != 200 && response.status != 201) {
      throw new Error('Failed to fetch report')
    }
    const data = await response.data
    if (!data) {
      alert('No data found for the selected report')
      return
    }
    console.log('Fetched report data:', data)
    // Relax validation: allow missing fields but warn
    if (
      (data.peakHours && !Array.isArray(data.peakHours)) ||
      (data.issuesSummary && !Array.isArray(data.issuesSummary)) ||
      (data.detailedIssueStatusSummary && !Array.isArray(data.detailedIssueStatusSummary))
    ) {
      alert('Report data has malformed fields')
      return
    }
    // Fallback for renamed detailedIssueStatusSummary field
    if (!data.detailedIssueStatusSummary) {
      if (data.detailedIssueSummary && Array.isArray(data.detailedIssueSummary)) {
        data.detailedIssueStatusSummary = data.detailedIssueSummary
      } else if (data.issueStatusSummary && Array.isArray(data.issueStatusSummary)) {
        data.detailedIssueStatusSummary = data.issueStatusSummary
      } else {
        data.detailedIssueStatusSummary = []
      }
    }
    reportData.value = data
    console.log('Setting isReportGenerated to true')
    isReportGenerated.value = true
    updateReportCharts(data)
  } catch (error) {
    alert('Error generating report: ' + error.message)
  }
}

function exportReportExcel() {
  if (!reportData.value) {
    alert('No report data to export')
    return
  }
  const wb = XLSX.utils.book_new()

  // Summary sheet
  const summaryData = [
    ['Summary', 'Value'],
    ['Total Service Representatives', reportData.value.totalServiceReps],
    ['Active Service Representatives', reportData.value.activeServiceReps],
    ['Average Service Time (minutes)', reportData.value.averageServiceTimeMinutes],
    ['Total Students Joined Today', reportData.value.totalStudentsJoinedToday],
    ['Top Issue', reportData.value.topIssue],
    ['Top Issue Percentage', reportData.value.topIssuePercentage],
  ]
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

  // Service Representatives sheet
  const serviceRepsData = [
    ['Name', 'Email', 'Status', 'Students Served', 'Avg. Wait Time (min)'],
    ...reportData.value.serviceReps.map((rep) => [
      rep.name,
      rep.email,
      rep.status,
      rep.studentsServed,
      rep.averageWaitTimeMinutes,
    ]),
  ]
  const wsServiceReps = XLSX.utils.aoa_to_sheet(serviceRepsData)
  XLSX.utils.book_append_sheet(wb, wsServiceReps, 'Service Representatives')

  // Issues Summary sheet
  const issuesSummaryData = [
    ['Issue Name', 'Count', 'Percentage'],
    ...reportData.value.issuesSummary.map((issue) => [
      issue.issueName,
      issue.count,
      issue.percentage,
    ]),
  ]
  const wsIssuesSummary = XLSX.utils.aoa_to_sheet(issuesSummaryData)
  XLSX.utils.book_append_sheet(wb, wsIssuesSummary, 'Issues Summary')

  // Detailed Issue Status Summary sheet
  const detailedIssueStatusData = [
    [
      'Issue Name',
      'Completed Count',
      'Not Completed Count',
      'Total Count',
      'Percentage Completed',
      'Percentage Not Completed',
    ],
    ...reportData.value.detailedIssueStatusSummary.map((detail) => [
      detail.issueName,
      detail.completedCount,
      detail.notCompletedCount,
      detail.totalCount,
      detail.percentageCompleted,
      detail.percentageNotCompleted,
    ]),
  ]
  const wsDetailedIssueStatus = XLSX.utils.aoa_to_sheet(detailedIssueStatusData)
  XLSX.utils.book_append_sheet(wb, wsDetailedIssueStatus, 'Detailed Issue Status')

  // Student Levels sheet
  const studentLevelsData = [
    ['Student Level', 'Count', 'Percentage'],
    ...((reportData.value.studentLevels && Array.isArray(reportData.value.studentLevels))
      ? reportData.value.studentLevels.map((level) => [
        level.studentLevel,
        level.count,
        level.percentage,
      ])
      : []),
  ]
  const wsStudentLevels = XLSX.utils.aoa_to_sheet(studentLevelsData)
  XLSX.utils.book_append_sheet(wb, wsStudentLevels, 'Student Levels')

  XLSX.writeFile(wb, 'report.xlsx')
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
      'space-y-4',
      'w-80',
      'export-menu',
      'flex',
      'flex-col',
      'justify-between',
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
    'space-y-4',
    'w-80',
    exportMenuAlignRight.value ? 'right-0' : 'left-0',
    'export-menu',
  ]
})

const closeReportMenu = () => {
  console.log('closeReportMenu called')
  reportData.value = null
  isReportGenerated.value = false
  showExportMenu.value = false
  activeTab.value = 'tellers' // Reset to default tab on close

  // Reset chart data to empty to avoid rendering errors
  peakHoursChartData.value.labels = []
  peakHoursChartData.value.datasets[0].data = []

  issuesSummaryChartData.value.labels = []
  issuesSummaryChartData.value.datasets[0].data = []

  nextTick(() => {
    // Additional cleanup if needed
  })
}

// New reactive refs for report charts
const peakHoursChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'People Joined',
      backgroundColor: '#3b82f6',
      data: [],
    },
  ],
})

const peakHoursChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Peak Hours' },
  },
  scales: {
    y: { beginAtZero: true },
  },
}

const issuesSummaryChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Issue Percentage',
      backgroundColor: ['#3b82f6', '#f87171', '#34d399', '#fbbf24', '#a78bfa'],
      data: [],
    },
  ],
})

const issuesSummaryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' },
    title: { display: true, text: 'Issues Summary' },
  },
}

const detailedIssueStatusChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Completed Count',
      backgroundColor: '#34d399',
      data: [],
    },
    {
      label: 'Not Completed Count',
      backgroundColor: '#f87171',
      data: [],
    },
  ],
})

const detailedIssueStatusChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Detailed Issue Status Summary' },
  },
  scales: {
    y: { beginAtZero: true },
  },
}

function updateReportCharts(data) {
  // Peak Hours chart
  if (Array.isArray(data.peakHours)) {
    peakHoursChartData.value.labels = data.peakHours.map((h) => formatHour(h.hour))
    peakHoursChartData.value.datasets[0].data = data.peakHours.map((h) => h.count)
  } else {
    peakHoursChartData.value.labels = []
    peakHoursChartData.value.datasets[0].data = []
  }

  // Issues Summary chart
  if (Array.isArray(data.issuesSummary)) {
    issuesSummaryChartData.value.labels = data.issuesSummary.map((i) => i.issueName)
    issuesSummaryChartData.value.datasets[0].data = data.issuesSummary.map((i) => i.percentage)
  } else {
    issuesSummaryChartData.value.labels = []
    issuesSummaryChartData.value.datasets[0].data = []
  }

  // Detailed Issue Status chart
  if (Array.isArray(data.detailedIssueStatusSummary)) {
    detailedIssueStatusChartData.value.labels = data.detailedIssueStatusSummary.map(
      (i) => i.issueName,
    )
    detailedIssueStatusChartData.value.datasets[0].data = data.detailedIssueStatusSummary.map(
      (i) => i.completedCount,
    )
    detailedIssueStatusChartData.value.datasets[1].data = data.detailedIssueStatusSummary.map(
      (i) => i.notCompletedCount,
    )
  } else {
    detailedIssueStatusChartData.value.labels = []
    detailedIssueStatusChartData.value.datasets[0].data = []
    detailedIssueStatusChartData.value.datasets[1].data = []
  }
}

function formatHour(hour) {
  const h = parseInt(hour)
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

// Watch reportData to update charts when new data arrives
import { watch } from 'vue'
watch(reportData, (newData) => {
  if (newData) {
    console.log('Full fetched report data:', newData)
    console.log('detailedIssueStatusSummary:', newData.detailedIssueStatusSummary)
    updateReportCharts(newData)
    totalServiceReps.value = newData.totalServiceReps
    activeServiceReps.value = newData.activeServiceReps
    averageServiceTimeMinutes.value = newData.averageServiceTimeMinutes
    totalStudentsJoinedToday.value = newData.totalStudentsJoinedToday
    peakHours.value = newData.peakHours
    topIssue.value = newData.topIssue
    topIssuePercentage.value = newData.topIssuePercentage
    studentLevels.value = newData.studentLevels || []

    // Update studentLevels chart data
    if (Array.isArray(studentLevels.value)) {
      studentLevelsChartData.value.labels = studentLevels.value.map((s) => s.studentLevel)
      studentLevelsChartData.value.datasets[0].data = studentLevels.value.map((s) => s.percentage)
    } else {
      studentLevelsChartData.value.labels = []
      studentLevelsChartData.value.datasets[0].data = []
    }
  }
})

const reportDateDescription = computed(() => {
  if (!selectedDate.value) return ''
  const date = new Date(selectedDate.value)
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  switch (selectedReportType.value) {
    case 'daily':
      return `for ${month} ${day}, ${year}`
    case 'weekly':
      return `for the week of ${month} ${day}, ${year}`
    case 'monthly':
      return `for the month of ${month} ${year}`
    case 'annual':
      return `for the year of ${year}`
    default:
      return ''
  }
})

const reportTypeDescription = computed(() => {
  switch (selectedReportType.value) {
    case 'daily':
      return 'Daily Report'
    case 'weekly':
      return 'Weekly Report'
    case 'monthly':
      return 'Monthly Report'
    case 'annual':
      return 'Annual Report'
    default:
      return ''
  }
})

const logout = async () => {
  try {
    await authApi.post("/logout")
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('user')
    // Consider redirecting to login page after logout
  } catch (error) {
    console.error('Logout failed:', error)
    // Consider adding user-facing error notification here
  }
}
</script>