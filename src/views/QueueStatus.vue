<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
    <div class="bg-primary px-4 py-6 text-primary-foreground">
      <div class="text-center">
        <h2 class="text-xl font-semibold">You are in the queue</h2>
        <div class="mt-4 flex justify-center">
          <div
            class="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground text-4xl font-bold text-primary"
          >
            {{ queueData.position }}
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
          <p class="text-2xl font-bold">--</p>
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
  try {
    const response = await fetch(`http://localhost:8080/session/${session.studentId}`)
    if (!response.ok) throw new Error('Failed to fetch student id from session')
    const data = await response.json()
    console.log(data)
    const studentId = data.studentId

    ws = new WebSocket(`ws://localhost:8080/students/${studentId}/updates`)

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        queueData.value = {
          position: data.queuePosition,
          estimatedTime: data.currentWaitTime,
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  } catch (error) {
    console.error('Error fetching student id:', error)
  }
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
})
</script>
