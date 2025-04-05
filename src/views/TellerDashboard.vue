//TellerDashboard.vue
<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-[#e0d63f] text-black">
            <div class="container flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2">
                    <router-link to="/" class="flex items-center gap-2 font-bold">
                        <img src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj" alt="UTECH" class="h-8 w-8 ml-2 rounded-full"/>
                        <span>UTech: Student Finance Queue</span>
                    </router-link>
                </div>
                <div class="flex items-center gap-4">
                    <button
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] text-black h-9 w-9 relative">
                        <Bell class="h-5 w-5" />
                        <span
                            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            3
                        </span>
                    </button>
                    <div class="relative">
                        <button @click="isUserMenuOpen = !isUserMenuOpen"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] text-black h-9 px-4 py-2 flex items-center gap-2 mr-2">
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
                                    class="flex w-full items-center px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
                                    <LogOut class="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-1">
            <div class="container py-8">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div class="ml-2">
                        <h1 class="text-3xl font-bold tracking-tight">Teller Dashboard</h1>
                        <p class="text-muted-foreground">Manage student queue and track your performance.</p>
                    </div>
                    <div class="flex items-center gap-4 mr-2">
                        <div class="flex items-center gap-2 bg-[#e0d63f]/20 px-3 py-1 rounded-md">
                            <div class="h-3 w-3 rounded-full bg-green-500"></div>
                            <span class="text-sm font-medium">Online</span>
                        </div>
                        <div class="flex items-center gap-2 bg-[#e0d63f]/20 px-3 py-1 rounded-md">
                            <span class="text-sm font-medium">Desk #3</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="md:col-span-2 space-y-6">
                        <div v-if="currentStudent" class="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div class="flex flex-col space-y-1.5 p-6">
                                <h3 class="text-2xl font-semibold leading-none tracking-tight">Current Student</h3>
                                <p class="text-sm text-muted-foreground">Student details and service information</p>
                            </div>
                            <div class="p-6 space-y-6">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Name</p>
                                        <p class="font-medium">{{ currentStudent.name }}</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Student ID</p>
                                        <p class="font-medium">{{ currentStudent.id }}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Faculty</p>
                                        <p>{{ currentStudent.faculty }}</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Issue Type</p>
                                        <p>{{ currentStudent.issueType }}</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Email</p>
                                        <p>{{ currentStudent.email }}</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p>{{ currentStudent.phone }}</p>
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium text-muted-foreground">Wait Time</p>
                                    <p>{{ currentStudent.waitTime }} minutes</p>
                                </div>
                                <div class="flex gap-4">
                                    <button @click="handleCompleteService"
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 flex-1">
                                        Complete Service
                                    </button>
                                    <button
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-[#e0d63f]/20 text-black h-10 px-4 py-2 flex-1">
                                        Reassign
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2">
                            <div class="flex flex-col space-y-1.5 p-6">
                                <h3 class="text-2xl font-semibold leading-none tracking-tight">No Active Student</h3>
                                <p class="text-sm text-muted-foreground">Call the next student in the queue to begin
                                    service</p>
                            </div>
                            <div class="p-6">
                                <button @click="handleNextStudent"
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
                                    Call Next Student
                                </button>
                            </div>
                        </div>

                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2">
                            <div class="flex flex-col space-y-1.5 p-6">
                                <h3 class="text-2xl font-semibold leading-none tracking-tight">Queue Management</h3>
                                <p class="text-sm text-muted-foreground">View and manage students in the queue</p>
                            </div>
                            <div class="p-6">
                                <TellerQueueTable />
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm mr-2">
                            <div class="flex flex-col space-y-1.5 p-6">
                                <h3 class="text-2xl font-semibold leading-none tracking-tight">Performance Dashboard
                                </h3>
                                <p class="text-sm text-muted-foreground">Your service performance metrics</p>
                            </div>
                            <div class="p-6">
                                <TellerPerformance />
                            </div>
                        </div>

                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm mr-2">
                            <div class="flex flex-col space-y-1.5 p-6">
                                <h3 class="text-2xl font-semibold leading-none tracking-tight">Quick Stats</h3>
                                <p class="text-sm text-muted-foreground">Today's service statistics</p>
                            </div>
                            <div class="p-6 space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Students Served</p>
                                        <p class="text-2xl font-bold">12</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Avg. Service Time</p>
                                        <p class="text-2xl font-bold">8.5 min</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Current Queue</p>
                                        <p class="text-2xl font-bold">7</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted-foreground">Satisfaction</p>
                                        <p class="text-2xl font-bold">4.7/5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="border-t py-6 md:py-0">
            <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 StudentQueue. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, Bell, User, LogOut } from 'lucide-vue-next'
import TellerQueueTable from '@/views/TellerQueueTable.vue'
import TellerPerformance from '@/views/TellerPerformance.vue'

const isUserMenuOpen = ref(false)
const currentStudent = ref(null)

const handleNextStudent = () => {
    // In a real app, this would make an API call to get the next student
    currentStudent.value = {
        name: "Jane Smith",
        id: "S87654321",
        faculty: "Business",
        issueType: "Scholarship",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        waitTime: 18,
    }
}

const handleCompleteService = () => {
    currentStudent.value = null
    // In a real app, this would make an API call to mark the service as completed
}
</script>