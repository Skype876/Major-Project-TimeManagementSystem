<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="handleClose"></div>
            <div class="z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 class="text-lg font-semibold leading-none tracking-tight">Add New Teller</h2>
                    <p class="text-sm text-muted-foreground">Create a new teller account for the student financing
                        office.</p>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <label for="name"
                                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <input id="name"
                                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Full Name" required />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <label for="email"
                                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <input id="email" type="email"
                                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="email@example.com" required />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <label for="desk"
                                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Desk
                            </label>
                            <select id="desk"
                                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="" disabled selected>Select Desk</option>
                                <option value="1">Desk 1</option>
                                <option value="2">Desk 2</option>
                                <option value="3">Desk 3</option>
                                <option value="4">Desk 4</option>
                                <option value="5">Desk 5</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <label for="password"
                                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <input id="password" type="password"
                                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <label for="confirm-password"
                                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Confirm
                            </label>
                            <input id="confirm-password" type="password"
                                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required />
                        </div>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                        <button type="submit"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            Add Teller
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:open'])

const handleClose = () => {
    emit('update:open', false)
}

const handleSubmit = (e) => {
    // In a real app, this would make an API call to add a new teller
    emit('update:open', false)
}
</script>