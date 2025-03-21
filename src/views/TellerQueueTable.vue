<template>
    <div class="rounded-md border">
        <div class="w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
                <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">Position
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Student ID</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Issue Type</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Wait Time</th>
                        <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                </thead>
                <tbody class="[&_tr:last-child]:border-0">
                    <tr v-for="student in queueData" :key="student.id"
                        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td class="p-4 align-middle font-medium">{{ student.position }}</td>
                        <td class="p-4 align-middle">{{ student.name }}</td>
                        <td class="p-4 align-middle">{{ student.id }}</td>
                        <td class="p-4 align-middle">{{ student.issueType }}</td>
                        <td class="p-4 align-middle">{{ student.waitTime }} min</td>
                        <td class="p-4 align-middle text-right">
                            <button
                                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                Call
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const queueData = ref([
    {
        position: 1,
        name: "John Doe",
        id: "S12345678",
        issueType: "Financial Aid",
        waitTime: 15,
    },
    {
        position: 2,
        name: "Alice Johnson",
        id: "S23456789",
        issueType: "Tuition Payment",
        waitTime: 12,
    },
    {
        position: 3,
        name: "Bob Williams",
        id: "S34567890",
        issueType: "Scholarship",
        waitTime: 8,
    },
    {
        position: 4,
        name: "Carol Brown",
        id: "S45678901",
        issueType: "Student Loan",
        waitTime: 5,
    },
    {
        position: 5,
        name: "David Miller",
        id: "S56789012",
        issueType: "Financial Aid",
        waitTime: 2,
    },
])
</script>