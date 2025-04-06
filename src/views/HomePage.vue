<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
            <div class="container mx-auto flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2 font-bold">
                    <img src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj" alt="UTECH" class="h-8 w-8 ml-2 rounded-full"/>
                    <span>UTech: Student Finance Queue</span>
                </div>
                <div class="relative">
                    <button @click="isMenuOpen = !isMenuOpen" class="p-2 hover:bg-[#d0c72f] rounded-md">
                        <Menu class="h-6 w-6" />
                    </button>
                    <!-- Dropdown menu -->
                    <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50">
                        <div class="py-1">
                            <router-link to="/student" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Student Portal
                            </router-link>
                            <router-link to="/teller" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Teller Dashboard
                            </router-link>
                            <router-link to="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Admin Panel
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-1">
            <section class="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                <div class="container mx-auto px-4 md:px-6">
                    <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                        <div class="flex flex-col justify-center space-y-4">
                            <div class="space-y-2 text-center">
                                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    UTech: Student Financing Queue Management System
                                </h1>
                                <p class="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                                    Streamline your student financing experience with our real-time queue management
                                    system.
                                </p>
                            </div>
                            <div class="flex justify-center gap-0 space-x-2">
                                <router-link to="/student" class="w-[200px]">
                                    <button
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-11 px-8 w-full">
                                        Join Queue
                                        <ArrowRight class="ml-2 h-4 w-4" />
                                    </button>
                                </router-link>
                                <router-link to="/login" class="w-[200px]">
                                    <button
                                        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full">
                                        Staff Login
                                    </button>
                                </router-link>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center">
                            <!-- Image Slideshow -->
                            <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg">
                                <transition name="fade" mode="out-in">
                                    <img
                                        :src="currentImage"
                                        :key="currentImage"
                                        alt="Slideshow Image"
                                        class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                                    />
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="w-full py-12 md:py-24 lg:py-32">
                <div class="container mx-auto px-4 md:px-6">
                    <div class="flex flex-col items-center justify-center space-y-4 text-center">
                    <div class="space-y-2">
                        <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                        <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Our queue management system offers a comprehensive solution for students and staff.
                        </p>
                    </div>
                    </div>
                    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 text-center sm:grid-cols-2 md:grid-cols-3">
                    <!-- Card 1 -->
                    <div
                        class="rounded-lg border bg-white text-gray-800 shadow-md transition-transform hover:scale-105 hover:shadow-xl p-6">
                        <div class="flex flex-col items-center gap-4">
                        <Users class="h-10 w-10 text-blue-600" />
                        <h3 class="text-xl font-semibold">Student Portal</h3>
                        <p class="text-sm text-gray-600">
                            Join the queue, track your position in real-time, receive notifications, and provide feedback after service.
                        </p>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div
                        class="rounded-lg border bg-white text-gray-800 shadow-md transition-transform hover:scale-105 hover:shadow-xl p-6">
                        <div class="flex flex-col items-center gap-4">
                        <Headset class="h-10 w-10 text-blue-600" />
                        <h3 class="text-xl font-semibold">Teller Dashboard</h3>
                        <p class="text-sm text-gray-600">
                            Manage the queue, view student details, track performance, and efficiently serve students.
                        </p>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div
                        class="rounded-lg border bg-white text-gray-800 shadow-md transition-transform hover:scale-105 hover:shadow-xl p-6">
                        <div class="flex flex-col items-center gap-4">
                        <LineChart class="h-10 w-10 text-blue-600" />
                        <h3 class="text-xl font-semibold">Admin Panel</h3>
                        <p class="text-sm text-gray-600">
                            Manage tellers, view comprehensive reports, analyze trends, and optimize service delivery.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </main>
        <footer class="border-t py-6">
            <div class="container mx-auto text-center">
                <p class="text-sm leading-loose text-muted-foreground">
                © 2025 UTechStudentQueue. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, ArrowRight, Users, Headset, LineChart, Menu } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const images = [
  "https://loopnewslive.blob.core.windows.net/liveimage/sites/default/files/2020-05/7lBJ4E2Cnr.jpg",
  "https://i.ytimg.com/vi/Ih6hPJcYFdE/maxresdefault.jpg",
  "https://pbs.twimg.com/media/ErzPzrgXMAkzNDw.jpg"
]

const currentImageIndex = ref(0)
const currentImage = ref(images[currentImageIndex.value])

setInterval(() => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  currentImage.value = images[currentImageIndex.value]
}, 4000) // rotates every 4 seconds
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>