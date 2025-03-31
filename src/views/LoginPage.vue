<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-background">
            <div class="container flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2">
                    <router-link to="/" class="flex items-center gap-2 font-bold">
                        <Clock class="h-5 w-5" />
                        <span>UTech: Student Finance Queue</span>
                    </router-link>
                </div>
                <div class="flex items-center gap-4">
                    <router-link to="/">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            <ArrowLeft class="mr-2 h-4 w-4" />
                            Back to Home
                        </button>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="flex-1 flex items-center justify-center p-4">
            <div class="mx-auto max-w-md w-full rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Login</h3>
                    <p class="text-sm text-muted-foreground">Select your role and enter your credentials to login</p>
                </div>
                <div class="p-6">
                    <div class="w-full">
                        <div class="flex flex-col space-y-2">
                            <div class="grid w-full grid-cols-2">
                                <button @click="activeTab = 'teller'" :class="[
                                    'inline-flex items-center justify-center whitespace-nowrap rounded-l-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    activeTab === 'teller' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                                ]">
                                    Teller
                                </button>
                                <button @click="activeTab = 'admin'" :class="[
                                    'inline-flex items-center justify-center whitespace-nowrap rounded-r-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    activeTab === 'admin' ? 'bg-background text-foreground shadow-sm' : 'bg-muted text-muted-foreground'
                                ]">
                                    Admin
                                </button>
                            </div>

                            <div v-if="activeTab === 'teller'" class="space-y-4 mt-4">
                                <form class="space-y-4">
                                    <div class="space-y-2">
                                        <label for="teller-email"
                                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <input id="teller-email" type="email" placeholder="teller@example.com" required
                                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <div class="space-y-2">
                                        <label for="teller-password"
                                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                        <input id="teller-password" type="password" required
                                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <router-link to="/teller" class="w-full">
                                        <button
                                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                                            Login as Teller
                                        </button>
                                    </router-link>
                                </form>
                            </div>

                            <div v-if="activeTab === 'admin'" class="space-y-4 mt-4">
                                <form class="space-y-4">
                                    <div class="space-y-2">
                                        <label for="admin-email"
                                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <input id="admin-email" type="email" placeholder="admin@example.com" required
                                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <div class="space-y-2">
                                        <label for="admin-password"
                                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                        <input id="admin-password" type="password" required
                                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <router-link to="/admin" class="w-full">
                                        <button
                                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                                            Login as Admin
                                        </button>
                                    </router-link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-4 p-6 pt-0">
                    <div class="text-sm text-muted-foreground text-center">
                        <a href="#" class="underline underline-offset-4 hover:text-primary">
                            Forgot your password?
                        </a>
                    </div>
                </div>
            </div>
        </main>
        <footer class="border-t py-6 md:py-0">
            <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2024 StudentQueue. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, ArrowLeft } from 'lucide-vue-next'

const activeTab = ref('teller')
</script>