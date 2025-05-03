// AdminDashboard.vue
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
          <div v-if="reportState.showExportMenu"
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
              <input type="date" v-model="reportState.selectedDate" class="w-full p-2 border rounded" />
            </div>
            <div class="flex justify-between">
              <button @click="reportState.showExportMenu = false" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
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
        <div v-if="reportState.isGenerated"
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
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Download, Plus } from 'lucide-vue-next'
import AdminTellerTable from '@/views/AdminTellerTable.vue'
import AdminAddTellerDialog from '@/views/AdminAddTellerDialog.vue'
import { api, authApi } from '@/services/api'
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
import * as XLSX from 'xlsx'

// Constants
const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  ANNUAL: 'annual'
}

// ChartJS setup (static registration)
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Base chart configuration
const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true }
  }
}

// Reactive state
const state = {
  // UI State
  ui: ref({
    isUserMenuOpen: false,
    isAddTellerOpen: false,
    activeTab: 'tellers',
    showExportMenu: false,
    isLoading: false
  }),

  // Stats data
  stats: ref({
    totalServiceReps: 0,
    activeServiceReps: 0,
    averageServiceTimeMinutes: 0,
    totalStudentsJoinedToday: 0,
    peakHours: [],
    topIssue: '',
    topIssuePercentage: 0,
    studentLevels: []
  }),

  // Report state
  report: ref({
    selectedType: REPORT_TYPES.DAILY,
    selectedDate: new Date().toISOString().slice(0, 10),
    data: null,
    isGenerated: false,
    alignRight: true
  })
}

// Chart data refs
const chartData = {
  peakHours: ref({
    labels: [],
    datasets: [{
      label: 'People Joined',
      backgroundColor: '#3b82f6',
      data: []
    }]
  }),
  studentLevels: ref({
    labels: [],
    datasets: [{
      label: 'Student Levels',
      backgroundColor: ['#3b82f6', '#f87171', '#34d399', '#fbbf24', '#a78bfa'],
      data: []
    }]
  }),
  issuesSummary: ref({
    labels: [],
    datasets: [{
      label: 'Issue Percentage',
      backgroundColor: ['#3b82f6', '#f87171', '#34d399', '#fbbf24', '#a78bfa'],
      data: []
    }]
  }),
  detailedIssueStatus: ref({
    labels: [],
    datasets: [
      {
        label: 'Completed Count',
        backgroundColor: '#34d399',
        data: []
      },
      {
        label: 'Not Completed Count',
        backgroundColor: '#f87171',
        data: []
      }
    ]
  })
}

// Computed properties
const computedProps = {
  exportMenuClasses: computed(() => {
    const baseClasses = [
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
      'export-menu'
    ]

    if (state.report.value.isGenerated) {
      return [
        ...baseClasses,
        'fixed',
        'top-1/2',
        'left-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'flex',
        'flex-col',
        'justify-between',
        'h-[600px]'
      ]
    }

    return [
      ...baseClasses,
      'absolute',
      'mt-2',
      state.report.value.alignRight ? 'right-0' : 'left-0'
    ]
  }),

  reportDateDescription: computed(() => {
    if (!state.report.value.selectedDate) return ''
    const date = new Date(state.report.value.selectedDate)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()

    switch (state.report.value.selectedType) {
      case REPORT_TYPES.DAILY: return `for ${month} ${day}, ${year}`
      case REPORT_TYPES.WEEKLY: return `for the week of ${month} ${day}, ${year}`
      case REPORT_TYPES.MONTHLY: return `for the month of ${month} ${year}`
      case REPORT_TYPES.ANNUAL: return `for the year of ${year}`
      default: return ''
    }
  }),

  reportTypeDescription: computed(() => {
    switch (state.report.value.selectedType) {
      case REPORT_TYPES.DAILY: return 'Daily Report'
      case REPORT_TYPES.WEEKLY: return 'Weekly Report'
      case REPORT_TYPES.MONTHLY: return 'Monthly Report'
      case REPORT_TYPES.ANNUAL: return 'Annual Report'
      default: return ''
    }
  })
}

// Methods
const methods = {
  formatHour(hour) {
    const h = parseInt(hour)
    if (h === 0) return '12 AM'
    if (h < 12) return `${h} AM`
    if (h === 12) return '12 PM'
    return `${h - 12} PM`
  },

  async toggleExportMenu() {
    state.ui.value.showExportMenu = !state.ui.value.showExportMenu

    if (!state.ui.value.showExportMenu) {
      state.report.value.isGenerated = false
      return
    }

    await nextTick()
    const menu = document.querySelector('.export-menu')
    if (menu) {
      const rect = menu.getBoundingClientRect()
      state.report.value.alignRight = rect.right <= window.innerWidth
    }
  },

  closeReportMenu() {
    state.report.value = {
      ...state.report.value,
      data: null,
      isGenerated: false
    }
    state.ui.value.showExportMenu = false
  },

  async fetchServiceRepStats() {
    try {
      const { data } = await api.get('/users/service-reps')

      if (!data) {
        throw new Error('No data received from service reps endpoint')
      }

      state.stats.value = {
        ...data,
        studentLevels: data.studentLevels || []
      }

      // Update charts
      this.updateCharts(data)
    } catch (error) {
      console.error('Error fetching service reps stats:', error)
      alert('Failed to load service representative statistics')
    }
  },

  updateCharts(data) {
    // Peak Hours chart
    if (Array.isArray(data.peakHours)) {
      chartData.peakHours.value = {
        labels: data.peakHours.map(h => this.formatHour(h.hour)),
        datasets: [{
          ...chartData.peakHours.value.datasets[0],
          data: data.peakHours.map(h => h.count)
        }]
      }
    }

    // Student Levels chart
    if (Array.isArray(data.studentLevels)) {
      chartData.studentLevels.value = {
        labels: data.studentLevels.map(s => s.studentLevel),
        datasets: [{
          ...chartData.studentLevels.value.datasets[0],
          data: data.studentLevels.map(s => s.percentage)
        }]
      }
    }

    // Issues Summary chart
    if (Array.isArray(data.issuesSummary)) {
      chartData.issuesSummary.value = {
        labels: data.issuesSummary.map(i => i.issueName),
        datasets: [{
          ...chartData.issuesSummary.value.datasets[0],
          data: data.issuesSummary.map(i => i.percentage)
        }]
      }
    }

    // Detailed Issue Status chart
    if (Array.isArray(data.detailedIssueStatusSummary)) {
      chartData.detailedIssueStatus.value = {
        labels: data.detailedIssueStatusSummary.map(i => i.issueName),
        datasets: [
          {
            ...chartData.detailedIssueStatus.value.datasets[0],
            data: data.detailedIssueStatusSummary.map(i => i.completedCount)
          },
          {
            ...chartData.detailedIssueStatus.value.datasets[1],
            data: data.detailedIssueStatusSummary.map(i => i.notCompletedCount)
          }
        ]
      }
    }
  },

  async generateReport() {
    if (!state.report.value.selectedDate) {
      alert('Please select a date')
      return
    }

    state.ui.value.isLoading = true

    try {
      const response = await api.get(
        `/reports?type=${state.report.value.selectedType}&date=${state.report.value.selectedDate}`
      )

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to fetch report')
      }

      const data = response.data

      if (!data) {
        alert('No data found for the selected report')
        return
      }

      // Handle field name variations
      if (!data.detailedIssueStatusSummary) {
        if (data.detailedIssueSummary && Array.isArray(data.detailedIssueSummary)) {
          data.detailedIssueStatusSummary = data.detailedIssueSummary
        } else if (data.issueStatusSummary && Array.isArray(data.issueStatusSummary)) {
          data.detailedIssueStatusSummary = data.issueStatusSummary
        } else {
          data.detailedIssueStatusSummary = []
        }
      }

      state.report.value.data = data
      state.report.value.isGenerated = true
      this.updateCharts(data)
    } catch (error) {
      console.error('Report generation error:', error)
      alert(`Error generating report: ${error.message}`)
    } finally {
      state.ui.value.isLoading = false
    }
  },

  exportReportExcel() {
    if (!state.report.value.data) {
      alert('No report data to export')
      return
    }

    const wb = XLSX.utils.book_new()
    const reportData = state.report.value.data

    // Helper function to create worksheet from array of arrays
    const createWorksheet = (data, sheetName) => {
      const ws = XLSX.utils.aoa_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
    }

    // Summary sheet
    createWorksheet([
      ['Summary', 'Value'],
      ['Total Service Representatives', reportData.totalServiceReps],
      ['Active Service Representatives', reportData.activeServiceReps],
      ['Average Service Time (minutes)', reportData.averageServiceTimeMinutes],
      ['Total Students Joined Today', reportData.totalStudentsJoinedToday],
      ['Top Issue', reportData.topIssue],
      ['Top Issue Percentage', reportData.topIssuePercentage]
    ], 'Summary')

    // Service Representatives sheet
    createWorksheet([
      ['Name', 'Email', 'Status', 'Students Served', 'Avg. Wait Time (min)'],
      ...(reportData.serviceReps || []).map(rep => [
        rep.name,
        rep.email,
        rep.status,
        rep.studentsServed,
        rep.averageWaitTimeMinutes
      ])
    ], 'Service Representatives')

    // Issues Summary sheet
    createWorksheet([
      ['Issue Name', 'Count', 'Percentage'],
      ...(reportData.issuesSummary || []).map(issue => [
        issue.issueName,
        issue.count,
        issue.percentage
      ])
    ], 'Issues Summary')

    // Detailed Issue Status Summary sheet
    createWorksheet([
      [
        'Issue Name',
        'Completed Count',
        'Not Completed Count',
        'Total Count',
        'Percentage Completed',
        'Percentage Not Completed'
      ],
      ...(reportData.detailedIssueStatusSummary || []).map(detail => [
        detail.issueName,
        detail.completedCount,
        detail.notCompletedCount,
        detail.totalCount,
        detail.percentageCompleted,
        detail.percentageNotCompleted
      ])
    ], 'Detailed Issue Status')

    // Student Levels sheet
    createWorksheet([
      ['Student Level', 'Count', 'Percentage'],
      ...((reportData.studentLevels && Array.isArray(reportData.studentLevels))
        ? reportData.studentLevels.map(level => [
          level.studentLevel,
          level.count,
          level.percentage
        ])
        : [])
    ], 'Student Levels')

    XLSX.writeFile(wb, 'report.xlsx')
  },

  async logout() {
    try {
      await authApi.post('/logout')
      // Clear all auth related data
      ['token', 'email', 'user'].forEach(key => localStorage.removeItem(key))
      // Redirect to login page
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }
}

// Watch for report data changes
watch(() => state.report.value.data, (newData) => {
  if (newData) {
    methods.updateCharts(newData)
  }
})

// Lifecycle hooks
onMounted(() => {
  methods.fetchServiceRepStats()
})
</script>
