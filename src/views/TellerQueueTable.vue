<template>
  <div class="rounded-md border">
    <div class="w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">
              Position
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Student ID
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Issue Type
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Wait Time
            </th>
            <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr
            v-for="student in queueData"
            :key="student.id"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td class="p-4 align-middle font-medium">{{ student.queuePosition }}</td>
            <td class="p-4 align-middle">{{ student.name }}</td>
            <td class="p-4 align-middle">{{ student.id_num }}</td>
            <td class="p-4 align-middle">{{ student.typeOfIssue }}</td>
            <td class="p-4 align-middle">{{ student.currentWaitTime }} min</td>
            <td class="p-4 align-middle text-right">
              <button
                @click="callStudent(student.id)"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3"
              >
                Call
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="selectedStudent" class="mt-4 p-4 border rounded bg-gray-50">
      <h2 class="text-lg font-semibold mb-2">Selected Student Information</h2>
      <p><strong>Name:</strong> {{ selectedStudent.name }}</p>
      <p><strong>ID:</strong> {{ selectedStudent.id }}</p>
      <p><strong>Student ID Number:</strong> {{ selectedStudent.id_num }}</p>
      <p><strong>Faculty:</strong> {{ selectedStudent.collegeFaculty || 'Unknown' }}</p>
      <p><strong>Issue Type:</strong> {{ selectedStudent.typeOfIssue }}</p>
      <p><strong>Email:</strong> {{ selectedStudent.email || 'N/A' }}</p>
      <p><strong>Phone:</strong> {{ selectedStudent.phone || 'N/A' }}</p>
      <p><strong>Estimated Wait Time:</strong> {{ selectedStudent.estimatedWaitTime }} min</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useEventBus } from '@vueuse/core'

const queueData = ref([])
const socket = ref(null)
const selectedStudent = ref(null) // reactive variable to store fetched student info
const eventBus = useEventBus('call-student')

onMounted(() => {
  // Connect to WebSocket when component mounts
  socket.value = new WebSocket('ws://localhost:8080/queue/updates')

  socket.value.onopen = () => {
    console.log('Connected to queue WebSocket')
  }

  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    // Flatten the student info and merge with queuePosition and estimatedWaitTime
    queueData.value = data.map(item => ({
      id: item.student.id,
      name: item.student.name,
      id_num: item.student.id_num,
      collegeFaculty: item.student.collegeFaculty,
      studentLevel: item.student.studentLevel,
      phone: item.student.phone,
      email: item.student.email,
      typeOfIssue: item.student.typeOfIssue,
      ticketNumber: item.student.ticketNumber,
      status: item.student.status,
      arrivalTime: item.student.arrivalTime,
      currentWaitTime: item.student.currentWaitTime,
      estimatedWaitTime: item.estimatedWaitTime,
      queuePosition: item.queuePosition,
      timestamp: item.timestamp
    }))
  }



  socket.value.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
})

const callStudent = async (studentId) => {
  try {
    // Fetch student info from the new endpoint
    const response = await fetch(`http://127.0.0.1:8080/students/byID/${studentId}`)
    if (!response.ok) throw new Error('Failed to fetch student info')
    const studentInfo = await response.json()
    selectedStudent.value = studentInfo // store fetched info

    // Existing POST request to mark student as in-progress
    const postResponse = await fetch(`http://localhost:8080/students/${studentId}/in-progress`, {
      method: 'PUT',
    })
    if (!postResponse.ok) throw new Error('Failed to call student')

    // Emit event with student data (can be adjusted as needed)
    eventBus.emit({
      id: studentInfo.id,
      name: studentInfo.name,
      id_num: studentInfo.id_num,
      collegeFaculty: studentInfo.collegeFaculty || 'Unknown',
      typeOfIssue: studentInfo.typeOfIssue,
      email: studentInfo.email || 'N/A',
      phone: studentInfo.phone || 'N/A',
      estimatedWaitTime: studentInfo.estimatedWaitTime,
    })

    console.log(`Called student ${studentId}`)
  } catch (error) {
    console.error('Error calling student:', error)
  }
}

onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>

  
    
