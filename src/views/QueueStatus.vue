<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
    <div class="bg-primary px-4 py-6 text-primary-foreground">
      <div class="text-center">
        <h2 class="text-xl font-semibold">You are in the queue</h2>
        <div class="mt-4 flex justify-center">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground text-4xl font-bold text-primary"
            >
              {{ queueData.position || '--' }}
            </div>
        </div>
        <p class="mt-4 text-sm">Your position in line</p>
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between">
        <div class="text-center">
          <p class="text-sm font-medium text-muted-foreground">Estimated Wait Time</p>
          <p class="text-2xl font-bold">{{ queueData.estimatedTime }} min</p>
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-muted-foreground">Teller Desk</p>
          <p class="text-2xl font-bold">{{ queueData.tellerDesk || '--' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const queueData = ref({
  position: 0,
  estimatedTime: 0,
})

let ws = null

onMounted(async () => {
  let session = JSON.parse(localStorage.getItem('session'))
  console.log('session', session)
  if (!session || !session.id || !session.token) {
    console.error('Session id or token missing, cannot establish WebSocket connection')
    return
  }
  try {
    // Use id and token from session for WebSocket connection
    const { id, token } = session

    ws = new WebSocket(`ws://localhost:8080/queue/updates/${id}?token=${token}`)

    ws.onopen = () => {
      console.log('WebSocket connection opened')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('WebSocket message received:', data)
        if (Array.isArray(data)) {
          // Find current student data by matching id from session inside nested student object
          const session = JSON.parse(localStorage.getItem('session'))
          console.log('Session id:', session.id)
          console.log('Ids in WebSocket data:', data.map(item => item.student?.id))
          // Try matching by student.id or student.id_num
          let currentStudent = data.find(item => item.student?.id === session.id)
          if (!currentStudent) {
            currentStudent = data.find(item => item.student?.id_num === session.id)
          }
          if (currentStudent) {
            const student = currentStudent.student
queueData.value = {
  position: currentStudent.queuePosition || currentStudent.position,
  estimatedTime: currentStudent.estimatedWaitTime || currentStudent.currentWaitTime,
  name: student.name,
  idNum: student.idNum || student.id_num,
  typeOfIssue: student.typeOfIssue,
  tellerDesk: currentStudent.teller || null
}
            console.log('Updated queueData:', queueData.value)
          } else {
            console.warn('Current student data not found in WebSocket array')
          }
        } else {
          queueData.value = {
            position: data.position || data.queuePosition,
            estimatedTime: data.currentWaitTime,
            name: data.name,
            idNum: data.idNum,
            typeOfIssue: data.typeOfIssue,
            tellerDesk: data.teller || null
          }
          console.log('Updated queueData:', queueData.value)
        }

        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
        }
      } catch (error) {
        console.error('Error setting up WebSocket:', error)
      }
    }
  } catch (error) {
    console.error('Error setting up WebSocket:', error)
  }
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
})
</script>
