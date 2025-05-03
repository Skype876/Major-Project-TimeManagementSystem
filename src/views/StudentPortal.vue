<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
      <div class="container mx-auto flex h-16 items-center justify-between py-4">
        <div class="flex items-center gap-2">
          <router-link to="/" class="flex items-center gap-2 font-bold">
            <img
              src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj"
              alt="UTECH" class="h-8 w-8 ml-2 rounded-full" />
            <span>UTech: Student Finance Queue</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] h-9 px-4 py-2 mr-2">
              <ArrowLeft class="mr-2 h-4 w-4" />
              Back to Home
            </button>
          </router-link>
        </div>
      </div>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <div class="container py-6 md:py-8 flex flex-col items-center">
        <div class="text-center w-full max-w-md mb-8">
          <h1 class="text-3xl font-bold tracking-tighter md:text-4xl">UTech: Student Portal</h1>
          <p class="text-muted-foreground md:text-xl mt-2">
            Join the queue for student financing services and track your position in real-time.
          </p>
        </div>

        <div v-if="!isInQueue" class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Join the Queue</h3>
            <p class="text-sm text-muted-foreground">
              Please fill out the form below to join the queue for student financing services.
            </p>
          </div>
          <div class="p-6">
            <form @submit.prevent="handleJoinQueue" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="name"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full
                    Name</label>
                  <input id="name" placeholder="John Doe" v-model="formData.name" required
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
                <div class="space-y-2">
                  <label for="student-id"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Student
                    ID</label>
                  <input id="student-id" placeholder="S12345678" required v-model="formData.id_num"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="faculty"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Faculty</label>
                  <select id="faculty" required v-model="formData.collegeFaculty"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select Faculty</option>
                    <option value="arts">Arts & Humanities</option>
                    <option value="business">Business</option>
                    <option value="engineering">Engineering</option>
                    <option value="science">Science</option>
                    <option value="medicine">Medicine</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label for="student-level"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Student
                    Level</label>
                  <select id="student-level" v-model="formData.studentLevel" required
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select Level</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Post-graduate">Post-graduate</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label for="issue-type"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Issue
                    Type</label>
                  <select id="issue-type" required v-model="formData.typeOfIssue"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select Issue</option>
                    <option value="account balance">Account / Balance Query</option>
                    <option value="fee payment">Fee Payment Issues</option>
                    <option value="adjustment">Account Adjustment</option>
                    <option value="slb">SLB Issues</option>
                    <option value="graduation">Graduation Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div class="space-y-2">
                <label for="email"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email
                  Address</label>
                <input id="email" type="email" placeholder="john.doe@example.com" required v-model="formData.email"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div class="space-y-2">
                <label for="phone"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone
                  Number (for notifications)</label>
                <input id="phone" type="tel" v-model="formData.phone" placeholder="+1 (555) 123-4567"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <button type="submit"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full">
                Join Queue
              </button>
            </form>
          </div>
        </div>

        <div v-else-if="queueData.tellerDesk"
          class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Service Completed</h3>
            <p class="text-sm text-muted-foreground">
              Please rate your experience with our service.
            </p>
          </div>
          <div class="p-6">
            <form @submit.prevent="handleSubmitFeedback" class="space-y-4">
              <div class="space-y-2">
                <label for="rating"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Rating</label>
                <div class="flex justify-center py-4">
                  <div class="flex gap-2">
                    <button v-for="star in 5" :key="star" type="button"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
                      {{ star }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <label for="feedback"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Additional
                  Feedback (Optional)</label>
                <textarea id="feedback"
                  class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Share your thoughts about our service..."></textarea>
              </div>
              <button type="submit"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        <div v-else class="space-y-6 w-full max-w-md">
          <QueueStatus :position="queueData.position" :estimatedTime="queueData.estimatedTime"
            :ticketNumber="queueData.ticketNumber" />

          <div class="w-full">
            <div class="flex flex-col space-y-2">
              <div class="grid w-full grid-cols-2">
                <button @click="activeTab = 'status'" :class="[
                  'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  activeTab === 'status'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground',
                ]">
                  Queue Status
                </button>
                <button @click="activeTab = 'info'" :class="[
                  'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                  activeTab === 'info'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground',
                ]">
                  Your Information
                </button>
              </div>

              <div v-if="activeTab === 'status'" class="space-y-4">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">
                      Your Queue Status
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Real-time information about your position in the queue.
                    </p>
                  </div>
                  <div class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Position</p>
                        <p class="text-2xl font-bold">{{ queueData.position }}</p>
                      </div>
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Estimated Wait Time</p>
                        <p class="text-2xl font-bold">{{ queueData.estimatedTime }} minutes</p>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-muted-foreground">Status</p>
                      <div class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-full bg-green-500"></div>
                        <p>Active in queue</p>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-muted-foreground">Notification</p>
                      <p>You will receive a notification when your turn is approaching.</p>
                    </div>
                  </div>
                  <div class="flex items-center p-6 pt-0">
                    <button @click="handleExitQueue"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 w-full">
                      Exit Queue
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'info'">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">
                      Your Information
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Details you provided when joining the queue.
                    </p>
                  </div>
                  <div class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Name</p>
                        <p>{{ queueData.name }}</p>
                      </div>
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Student ID</p>
                        <p>{{ queueData.idNum }}</p>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Faculty</p>
                        <p>{{ queueData.collegeFaculty }}</p>
                      </div>
                      <div class="space-y-2">
                        <p class="text-sm font-medium text-muted-foreground">Issue Type</p>
                        <p>{{ queueData.typeOfIssue }}</p>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-muted-foreground">Contact Information</p>
                      <p>{{ queueData.email }}</p>
                      <p>{{ queueData.phone }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="border-t py-6">
      <div class="container mx-auto text-center">
        <p class="text-sm leading-loose text-muted-foreground">
          © 2025 UTechStudentQueue. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import QueueStatus from '@/views/QueueStatus.vue'
import { authApi } from '@/services/api'

// Reactive state
const isInQueue = ref(false)
const activeTab = ref('status')
const websocket = ref(null)

// Form data with default values
const formData = ref({
  name: '',
  id_num: '',
  collegeFaculty: '',
  studentLevel: '',
  phone: '',
  email: '',
  typeOfIssue: ''
})

// Queue data with type safety through default values
const queueData = ref({
  position: 0,
  estimatedTime: 0,
  tellerDesk: null,
  name: '',
  idNum: '',
  typeOfIssue: '',
  collegeFaculty: '',
  studentLevel: '',
  email: '',
  phone: ''
})

// Computed properties
const minutes = computed(() => Math.floor(queueData.value.estimatedTime / 60000))

// Constants
const WEBSOCKET_URL = 'wss://student-queue-f9fmhac6gcgpf4dd.canadacentral-01.azurewebsites.net/queue/updates'
const SESSION_KEY = 'session'

// Methods
const initializeWebSocket = (id, token) => {
  try {
    websocket.value = new WebSocket(`${WEBSOCKET_URL}/${id}?token=${token}`)

    websocket.value.onopen = () => console.log('WebSocket connection established')

    websocket.value.onmessage = (event) => {
      try {
        const [data] = JSON.parse(event.data)
        updateQueueData(data)
      } catch (error) {
        console.error('Error processing WebSocket message:', error)
      }
    }

    websocket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

  } catch (error) {
    console.error('WebSocket initialization failed:', error)
    throw error
  }
}

const updateQueueData = (data) => {
  queueData.value = {
    position: data.position || data.queuePosition,
    estimatedTime: data.estimatedWaitTime,
    tellerDesk: data.teller || null,
    name: data.student.name,
    idNum: data.student.id_num,
    typeOfIssue: data.student.typeOfIssue,
    collegeFaculty: data.student.collegeFaculty || '',
    studentLevel: data.student.studentLevel || '',
    email: data.student.email || '',
    phone: data.student.phone || ''
  }
}

const loadSession = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY))
  if (session?.id && session?.token) {
    isInQueue.value = true
    initializeWebSocket(session.id, session.token)
  }
}

const handleJoinQueue = async () => {
  try {
    const { data } = await authApi.post('/students', formData.value)

    if (!data) throw new Error('No data received from server')

    isInQueue.value = true
    updateQueueData({
      ...data,
      student: {
        name: data.name,
        id_num: data.idNum,
        typeOfIssue: data.typeOfIssue,
        collegeFaculty: data.collegeFaculty,
        studentLevel: data.studentLevel,
        email: data.email,
        phone: data.phone
      },
      position: data.queuePosition,
      estimatedWaitTime: data.estimatedWaitTime
    })

    // Persist only necessary session data
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      id: data.id,
      token: data.token
    }))

  } catch (error) {
    console.error('Queue join error:', error)
    alert(`Failed to join queue: ${error.message || 'Please try again.'}`)
  }
}

const handleExitQueue = async () => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY))
    if (!session?.id) throw new Error('No active session found')

    await authApi.put(`/students/${session.id}/exit`)

    cleanupQueueSession()

  } catch (error) {
    console.error('Queue exit error:', error)
    alert(`Failed to exit queue: ${error.message || 'Please try again.'}`)
  }
}

const handleSubmitFeedback = async () => {
  try {
    const rating = document.querySelector('button[aria-pressed="true"]')?.textContent || '5'
    const feedback = document.getElementById('feedback').value
    const studentId = document.getElementById('student-id').value

    if (!studentId) throw new Error('Student ID is required')

    await authApi.post('/feedback', {
      studentId,
      rating: parseInt(rating),
      feedback
    })

    cleanupQueueSession()

  } catch (error) {
    console.error('Feedback submission error:', error)
    alert(`Failed to submit feedback: ${error.message || 'Please try again.'}`)
  }
}

const cleanupQueueSession = () => {
  isInQueue.value = false
  localStorage.removeItem(SESSION_KEY)
  if (websocket.value) {
    websocket.value.close()
    websocket.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  loadSession()
})

onUnmounted(() => {
  if (websocket.value) {
    websocket.value.close()
  }
})
</script>
