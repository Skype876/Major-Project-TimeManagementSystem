<template>
    <div class="rounded-md border">
        <div class="w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
                <thead class="[&_tr]:border-b">
                    <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Desk</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Students Served
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Avg. Service Time
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]"></th>
                    </tr>
                </thead>
                <tbody class="[&_tr:last-child]:border-0">
                    <tr v-for="teller in tellerData" :key="teller.id"
                        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td class="p-4 align-middle font-medium">{{ teller.id }}</td>
                        <td class="p-4 align-middle">{{ teller.name }}</td>
                        <td class="p-4 align-middle">{{ teller.email }}</td>
                        <td class="p-4 align-middle">{{ teller.desk }}</td>
                        <td class="p-4 align-middle">
                            <span :class="`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${teller.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`">
                                {{ teller.status }}
                            </span>
                        </td>
                        <td class="p-4 align-middle">{{ teller.studentsServed }}</td>
                        <td class="p-4 align-middle">{{ teller.avgServiceTime }}</td>
                        <td class="p-4 align-middle">{{ teller.rating }}</td>
                        <td class="p-4 align-middle">
                            <div class="flex gap-2">
                                <button @click="callTeller(teller)"
                                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3">
                                    Call
                                </button>
                                <div class="relative">
                                    <button @click="toggleMenu(teller.id)"
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                                        <MoreHorizontal class="h-4 w-4" />
                                        <span class="sr-only">Open menu</span>
                                    </button>
                                    <div v-if="activeMenu === teller.id"
                                        class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover text-popover-foreground z-50">
                                        <div class="py-1 px-2 text-sm font-medium">Actions</div>
                                        <div class="h-px bg-muted my-1"></div>
                                        <button
                                            class="flex w-full items-center px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
                                            <Pencil class="mr-2 h-4 w-4" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            class="flex w-full items-center px-2 py-2 text-sm text-destructive hover:bg-accent hover:text-destructive rounded-sm">
                                            <Trash class="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { MoreHorizontal, Pencil, Trash } from 'lucide-vue-next'

const activeMenu = ref(null)

const toggleMenu = (id) => {
    if (activeMenu.value === id) {
        activeMenu.value = null
    } else {
        activeMenu.value = id
    }
}

const callTeller = (teller) => {
    // In a real app, this would make an API call to assign the teller
    console.log(`Calling teller ${teller.name}`)
    // Emit event to parent or use state management to pass to TellerDashboard
    // For now we'll just log it
}

const tellerData = ref([
    {
        id: "T001",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        desk: 1,
        status: "Active",
        studentsServed: 342,
        avgServiceTime: "7.2 min",
        rating: "4.8/5",
    },
    {
        id: "T002",
        name: "Michael Chen",
        email: "michael.c@example.com",
        desk: 2,
        status: "Active",
        studentsServed: 289,
        avgServiceTime: "8.5 min",
        rating: "4.6/5",
    },
    {
        id: "T003",
        name: "Emily Rodriguez",
        email: "emily.r@example.com",
        desk: 3,
        status: "Inactive",
        studentsServed: 156,
        avgServiceTime: "6.8 min",
        rating: "4.9/5",
    },
    {
        id: "T004",
        name: "David Kim",
        email: "david.k@example.com",
        desk: 4,
        status: "Inactive",
        studentsServed: 201,
        avgServiceTime: "7.5 min",
        rating: "4.7/5",
    },
    {
        id: "T005",
        name: "Jessica Patel",
        email: "jessica.p@example.com",
        desk: 5,
        status: "Active",
        studentsServed: 178,
        avgServiceTime: "6.9 min",
        rating: "4.5/5",
    },
])
</script>