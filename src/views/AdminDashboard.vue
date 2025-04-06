// AdminDashboard.vue
<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
            <div class="container mx-auto flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2 ml-2">
                    <router-link to="/" class="flex items-center gap-2 font-bold">
                        <img src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj" alt="UTECH" class="h-8 w-8 rounded-full"/>
                        <span>UTech: Student Finance Queue</span>
                    </router-link>
                </div>
                <div class="flex items-center gap-4">
                    <button
                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] text-white h-9 w-9 relative">
                        <Bell class="h-5 w-5" />
                        <span
                            class="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-black bg-white rounded-full border border-black">
                            2
                        </span>
                    </button>
                    <div class="relative">
                        <button @click="isUserMenuOpen = !isUserMenuOpen"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#d0c72f] text-white h-9 px-4 py-2 flex items-center gap-2 mr-2">
                            <User class="h-4 w-4" />
                            <span>Admin Name</span>
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
        <main class="flex-1 pb-10 flex justify-center items-start pt-10">
            <div class="w-full max-w-6xl px-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div class="ml-2">
                        <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p class="text-muted-foreground">Manage tellers and view queue analytics.</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2">
                            <Download class="h-4 w-4" />
                            Export Reports
                        </button>
                        <button @click="isAddTellerOpen = true"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 flex items-center gap-2 mr-2">
                            <Plus class="h-4 w-4" />
                            Add Teller
                        </button>
                    </div>
                </div>

                <div class="w-full">
                    <div class="flex flex-col space-y-2">
                        <div class="grid w-full grid-cols-2 md:w-[400px]">
                            <button @click="activeTab = 'tellers'" :class="[
                                'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ml-2',
                                activeTab === 'tellers' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                            ]">
                                Teller Management
                            </button>
                            <button @click="activeTab = 'analytics'" :class="[
                                'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                activeTab === 'analytics' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                            ]">
                                Queue Analytics
                            </button>
                        </div>

                        <div v-if="activeTab === 'tellers'" class="space-y-6">
                            <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2 mr-2">
                                <div class="flex flex-col space-y-1.5 p-6">
                                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Teller Management
                                    </h3>
                                    <p class="text-sm text-muted-foreground">View, add, edit, or remove tellers from the
                                        system.</p>
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
                                        <div class="text-3xl font-bold">8</div>
                                        <p class="text-sm text-muted-foreground">2 currently active</p>
                                    </div>
                                </div>
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Avg. Service Time
                                        </h3>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-3xl font-bold">7.2 min</div>
                                        <p class="text-sm text-muted-foreground">Across all tellers</p>
                                    </div>
                                </div>
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm mr-2">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Satisfaction Rate
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
                            <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2 mr-2">
                                <div class="flex flex-col space-y-1.5 p-6">
                                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Queue Analytics</h3>
                                    <p class="text-sm text-muted-foreground">View trends and statistics about the
                                        student queue.</p>
                                </div>
                                <div class="p-6">
                                    <AdminQueueStats />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm ml-2">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Today's Queue</h3>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-3xl font-bold">42</div>
                                        <p class="text-sm text-muted-foreground">7 currently waiting</p>
                                    </div>
                                </div>
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Avg. Wait Time
                                        </h3>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-3xl font-bold">18 min</div>
                                        <p class="text-sm text-muted-foreground">↓ 12% from last week</p>
                                    </div>
                                </div>
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Peak Hours</h3>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-3xl font-bold">11am-1pm</div>
                                        <p class="text-sm text-muted-foreground">Monday & Wednesday</p>
                                    </div>
                                </div>
                                <div class="rounded-lg border bg-card text-card-foreground shadow-sm mr-2">
                                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 class="text-lg font-semibold leading-none tracking-tight">Top Issue</h3>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-3xl font-bold">Financial Aid</div>
                                        <p class="text-sm text-muted-foreground">38% of all queries</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="border-t py-6 ">
            <div class="container mx-auto text-center">
                <p class="text-sm leading-loose text-muted-foreground">
                © 2025 UTechStudentQueue. All rights reserved.
                </p>
            </div>
        </footer>

        <AdminAddTellerDialog :open="isAddTellerOpen" @update:open="isAddTellerOpen = $event" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, Bell, User, LogOut, Download, Plus } from 'lucide-vue-next'
import AdminTellerTable from '@/views/AdminTellerTable.vue'
import AdminQueueStats from '@/views/AdminQueueStats.vue'
import AdminAddTellerDialog from '@/views/AdminAddTellerDialog.vue'

const isUserMenuOpen = ref(false)
const isAddTellerOpen = ref(false)
const activeTab = ref('tellers')
</script>