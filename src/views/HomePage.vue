<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-background">
            <div class="container flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2 font-bold">
                    <Clock class="h-5 w-5" />
                    <span>StudentQueue</span>
                </div>
                <nav class="hidden md:flex items-center gap-6">
                    <router-link to="/student" class="text-sm font-medium hover:underline">
                        Student Portal
                    </router-link>
                    <router-link to="/teller" class="text-sm font-medium hover:underline">
                        Teller Dashboard
                    </router-link>
                    <router-link to="/admin" class="text-sm font-medium hover:underline">
                        Admin Panel
                    </router-link>
                </nav>
                <div class="flex items-center gap-4">
                    <router-link to="/login">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            Log in
                        </button>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="flex-1">
            <section class="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                <div class="container px-4 md:px-6">
                    <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                        <div class="flex flex-col justify-center space-y-4">
                            <div class="space-y-2">
                                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Student Financing Queue Management
                                </h1>
                                <p class="max-w-[600px] text-muted-foreground md:text-xl">
                                    Streamline your student financing experience with our real-time queue management
                                    system.
                                </p>
                            </div>
                            <div class="flex flex-col gap-2 min-[400px]:flex-row">
                                <router-link to="/student">
                                    <button
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                                        Join Queue
                                        <ArrowRight class="ml-2 h-4 w-4" />
                                    </button>
                                </router-link>
                                <router-link to="/login">
                                    <button
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                                        Staff Login
                                    </button>
                                </router-link>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center">
                            <img src="" alt="Queue Management System"
                                class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                width="600" height="400" />
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-full py-12 md:py-24 lg:py-32">
                <div class="container px-4 md:px-6">
                    <div class="flex flex-col items-center justify-center space-y-4 text-center">
                        <div class="space-y-2">
                            <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                            <p
                                class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our queue management system offers a comprehensive solution for students and staff.
                            </p>
                        </div>
                    </div>
                    <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div class="flex flex-row items-center gap-4 p-6 pb-2">
                                <Users class="h-8 w-8 text-primary" />
                                <h3 class="text-xl font-semibold leading-none tracking-tight">Student Portal</h3>
                            </div>
                            <div class="p-6 pt-0">
                                <p class="text-sm text-muted-foreground">
                                    Join the queue, track your position in real-time, receive notifications, and provide
                                    feedback after
                                    service.
                                </p>
                            </div>
                        </div>
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div class="flex flex-row items-center gap-4 p-6 pb-2">
                                <Headset class="h-8 w-8 text-primary" />
                                <h3 class="text-xl font-semibold leading-none tracking-tight">Teller Dashboard</h3>
                            </div>
                            <div class="p-6 pt-0">
                                <p class="text-sm text-muted-foreground">
                                    Manage the queue, view student details, track performance, and efficiently serve
                                    students.
                                </p>
                            </div>
                        </div>
                        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div class="flex flex-row items-center gap-4 p-6 pb-2">
                                <LineChart class="h-8 w-8 text-primary" />
                                <h3 class="text-xl font-semibold leading-none tracking-tight">Admin Panel</h3>
                            </div>
                            <div class="p-6 pt-0">
                                <p class="text-sm text-muted-foreground">
                                    Manage tellers, view comprehensive reports, analyze trends, and optimize service
                                    delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
import { Clock, ArrowRight, Users, Headset, LineChart } from 'lucide-vue-next'
</script>