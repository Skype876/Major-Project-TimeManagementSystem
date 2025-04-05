//StudentPortal.vue
<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-[#e0d63f] text-black">
            <div class="container flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2">
                    <router-link to="/" class="flex items-center gap-2 font-bold">
                        <img src="https://unevoc.unesco.org/fileadmin/up/utech_web.jpg" alt="UTECH" class="h-8 w-8 ml-2"/>
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
                                    <input id="name" placeholder="John Doe" required
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                </div>
                                <div class="space-y-2">
                                    <label for="student-id"
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Student
                                        ID</label>
                                    <input id="student-id" placeholder="S12345678" required
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <label for="faculty"
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Faculty</label>
                                    <select id="faculty" required
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
                                    <label for="issue-type"
                                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Issue
                                        Type</label>
                                    <select id="issue-type" required
                                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="" disabled selected>Select Issue</option>
                                        <option value="financial-aid">Financial Aid</option>
                                        <option value="tuition">Tuition Payment</option>
                                        <option value="scholarship">Scholarship</option>
                                        <option value="loan">Student Loan</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label for="email"
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email
                                    Address</label>
                                <input id="email" type="email" placeholder="john.doe@example.com" required
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>
                            <div class="space-y-2">
                                <label for="phone"
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone
                                    Number (for notifications)</label>
                                <input id="phone" type="tel" placeholder="+1 (555) 123-4567"
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
                        <p class="text-sm text-muted-foreground">Please rate your experience with our service.</p>
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
                    <QueueStatus :position="queueData.position" :estimatedTime="queueData.estimatedTime" />

                    <div class="w-full">
                        <div class="flex flex-col space-y-2">
                            <div class="grid w-full grid-cols-2">
                                <button @click="activeTab = 'status'" :class="[
                                    'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    activeTab === 'status' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                                ]">
                                    Queue Status
                                </button>
                                <button @click="activeTab = 'info'" :class="[
                                    'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    activeTab === 'info' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                                ]">
                                    Your Information
                                </button>
                            </div>

                            <div v-if="activeTab === 'status'" class="space-y-4">
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div class="flex flex-col space-y-1.5 p-6">
                                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Your Queue Status
                                        </h3>
                                        <p class="text-sm text-muted-foreground">Real-time information about your
                                            position in the queue.</p>
                                    </div>
                                    <div class="p-6 space-y-4">
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Position</p>
                                                <p class="text-2xl font-bold">{{ queueData.position }}</p>
                                            </div>
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Estimated Wait Time
                                                </p>
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
                                        <h3 class="text-2xl font-semibold leading-none tracking-tight">Your Information
                                        </h3>
                                        <p class="text-sm text-muted-foreground">Details you provided when joining the
                                            queue.</p>
                                    </div>
                                    <div class="p-6 space-y-4">
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Name</p>
                                                <p>John Doe</p>
                                            </div>
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Student ID</p>
                                                <p>S12345678</p>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Faculty</p>
                                                <p>Engineering</p>
                                            </div>
                                            <div class="space-y-2">
                                                <p class="text-sm font-medium text-muted-foreground">Issue Type</p>
                                                <p>Financial Aid</p>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <p class="text-sm font-medium text-muted-foreground">Contact Information</p>
                                            <p>john.doe@example.com</p>
                                            <p>+1 (555) 123-4567</p>
                                        </div>
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
import { Clock, ArrowLeft } from 'lucide-vue-next'
import QueueStatus from '@/views/QueueStatus.vue'

const isInQueue = ref(false)
const queueData = ref({
    position: 5,
    estimatedTime: 25,
    tellerDesk: null,
})
const activeTab = ref('status')

const handleJoinQueue = () => {
    isInQueue.value = true
    // In a real app, this would make an API call to add the student to the queue
}

const handleExitQueue = () => {
    isInQueue.value = false
    // In a real app, this would make an API call to remove the student from the queue
}

const handleSubmitFeedback = () => {
    isInQueue.value = false
    // In a real app, this would make an API call to submit feedback
}
</script>