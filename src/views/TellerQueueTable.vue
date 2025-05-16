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
          <tr v-for="student in queueData" :key="student.idNum"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td class="p-4 align-middle font-medium">{{ student.position }}</td>
            <td class="p-4 align-middle">{{ student.name }}</td>
            <td class="p-4 align-middle">{{ student.idNum }}</td>
            <td class="p-4 align-middle">{{ student.typeOfIssue }}</td>
            <td class="p-4 align-middle">{{ student.currentWaitTime }} min</td>
            <td class="p-4 align-middle text-right">
              <button @click="callStudent(student.idNum)"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3">
                Call
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
    <!-- <div v-if="selectedStudent" class="mt-4 p-4 border rounded bg-gray-50">
      <h2 class="text-lg font-semibold mb-2">Selected Student Information</h2>
      <p><strong>Name:</strong> {{ selectedStudent.name }}</p>
      <p><strong>ID:</strong> {{ selectedStudent.id }}</p>
      <p><strong>Student ID Number:</strong> {{ selectedStudent.idNum }}</p>
      <p><strong>Faculty:</strong> {{ selectedStudent.collegeFaculty || 'Unknown' }}</p>
      <p><strong>Issue Type:</strong> {{ selectedStudent.typeOfIssue }}</p>
      <p><strong>Email:</strong> {{ selectedStudent.email || 'N/A' }}</p>
      <p><strong>Phone:</strong> {{ selectedStudent.phone || 'N/A' }}</p>
      <p><strong>Estimated Wait Time:</strong> {{ selectedStudent.estimatedWaitTime }} min</p>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { api } from '@/services/api'
import axios from 'axios'

const emit = defineEmits('student-info')
// Reactive state
const queueData = ref([])
const selectedStudent = ref(null)
let eventSource = null;
const reconnectInterval = 5000
// Constants
const STUDENT_ENDPOINT = '/students/byID'
const STUDENT_STATUS_ENDPOINT = '/students'
const TELLER_DESK_NUM = parseInt(localStorage.getItem("desk_num") ?? "0", 10);

const connectSse = () => {
  console.log("Connecting to SSE...");
  eventSource = new EventSource(`https://student-queue-f9fmhac6gcgpf4dd.canadacentral-01.azurewebsites.net/updates`);
  // eventSource = new EventSource(`http://localhost:8080/updates`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (!("status" in data)) {
        queueData.value = transformQueueData(data);
      }
    } catch (error) {
      console.error("Error parsing SSE data:", error);
    }
  };

  eventSource.onerror = () => {
    console.error("Error in SSE connection");
    eventSource.close();
    reconnectSSE();
  };
};

const reconnectSSE = () => {
  console.log(`Reconnecting in ${reconnectInterval / 1000} seconds...`);
  setTimeout(() => {
    connectSse();
  }, reconnectInterval);
};

// Helper function to transform queue data
const transformQueueData = (data) => {
  return data
    .filter(item => item.position > 0) // First filter out items with position <= 0
    .map(item => ({
      currentWaitTime: item.currentWaitTime / 60000, // Convert to minutes
      idNum: item.idNum,
      name: item.name,
      position: item.position,
      studentId: item.studentId,
      typeOfIssue: item.typeOfIssue,
      estimatedWaitTime: item.estimatedWaitTime,
      queuePosition: item.queuePosition,
      timestamp: item.timestamp || Date.now(), // Fallback to current time if missing
      // eventType: item.event // Uncomment if you need to keep the original event type
    }));
};

// Student actions
const callStudent = async (studentId) => {
  try {
    // Fetch student info
    const [studentResponse, statusResponse] = await Promise.all([
      api.get(`${STUDENT_ENDPOINT}/${studentId}`),
      api.put(`${STUDENT_STATUS_ENDPOINT}/${studentId}/in-progress?desk_num=${TELLER_DESK_NUM}`)
    ])

    if (studentResponse.status != 200 || statusResponse.status != 200) {
      throw new Error(studentResponse.ok ? 'Failed to update status' : 'Failed to fetch student')
    }

    const studentInfo = await studentResponse.data
    selectedStudent.value = studentInfo

    // Emit event with normalized data
    emit('student-info', {
      id: studentInfo.id,
      name: studentInfo.name,
      id_num: studentInfo.id_num,
      collegeFaculty: studentInfo.collegeFaculty || 'Unknown',
      typeOfIssue: studentInfo.typeOfIssue,
      email: studentInfo.email || 'N/A',
      phone: studentInfo.phone || 'N/A',
      estimatedWaitTime: studentInfo.estimatedWaitTime,
    })

    // axios({
    //   url: 'https://formspree.io/f/xqaqddbq',
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json'
    //   },
    //   data: {
    //     email: studentInfo.email,
    //     message: `Hello!\n It's your time to go the counter ${TELLER_DESK_NUM}`
    //   }
    // }).then((response) => { console.log(response); })

    console.log(`Successfully called student ${studentId}`)
  } catch (error) {
    console.error('Error calling student:', error.message)
    // Consider adding user feedback here (e.g., toast notification)
  }
}

// Lifecycle hooks
onMounted(() => {
  connectSse()
})

onBeforeUnmount(() => {
  if (eventSource) eventSource.close();
});
</script>
