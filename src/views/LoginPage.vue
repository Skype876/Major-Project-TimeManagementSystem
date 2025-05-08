//LoginPage.vue
<template>
    <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-10 border-b bg-blue-600 text-white">
            <div class="container mx-auto flex h-16 items-center justify-between py-4">
                <div class="flex items-center gap-2">
                    <router-link to="/" class="flex items-center gap-2 font-bold">
                        <img src="https://yt3.googleusercontent.com/connko1b_He_JwFuBO0YniegoXaVMsp6-CB49umTDGsObP25qTa35tJumxdWBrhVIs4E_J58_pA=s160-c-k-c0x00ffffff-no-rj"
                            alt="UTECH" class="h-8 w-8 ml-2 rounded-full" />
                        <span>UTech: Student Finance Queue</span>
                    </router-link>
                </div>
                <div class="flex items-center gap-4">
                    <router-link to="/">
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mr-2">
                            <ArrowLeft class="mr-2 h-4 w-4" />
                            Back to Home
                        </button>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="flex-1 flex items-center justify-center p-4">
            <div
                class="mx-auto max-w-4xl w-full rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <!-- Left side - Image -->
                    <div class="hidden md:block relative bg-blue-600">
                        <img src="https://www.utech.edu.jm/UTechGraduatesat2018GraduationCeremonyNovember3atthePapineCampus.jpg"
                            alt="Student studying" class="object-cover h-full w-full opacity-95" />
                        <div class="absolute inset-0 bg-blue-600/20 flex flex-col justify-end p-6">
                            <h2 class="text-white text-2xl font-bold mb-2">Welcome to UTechOnline</h2>
                            <p class="text-white/90 text-sm">Empowering Academic Staff with Seamless Access to
                                Effectively Address Student Queries and Concerns</p>
                        </div>
                    </div>

                    <!-- Right side - Login Form -->
                    <div>
                        <div class="flex flex-col space-y-1.5 p-6">
                            <h3 class="text-2xl font-semibold leading-none tracking-tight">Login</h3>
                            <p class="text-sm text-muted-foreground">Select your role and enter your credentials to
                                login</p>
                        </div>
                        <div class="p-6 pt-0">
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
                                        <form class="space-y-4" @submit.prevent="login('teller')">
                                            <div class="space-y-2">
                                                <label for="teller-email"
                                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                                <input id="teller-email" v-model="tellerEmail" type="email"
                                                    placeholder="teller@example.com" required
                                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                            </div>
                                            <div class="space-y-2">
                                                <label for="teller-password"
                                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                                <input id="teller-password" v-model="tellerPassword" type="password"
                                                    required
                                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                            </div>
                                            <button type="submit"
                                                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full">
                                                Login as Teller
                                            </button>
                                        </form>
                                    </div>

                                    <div v-if="activeTab === 'admin'" class="space-y-4 mt-4">
                                        <form class="space-y-4" @submit.prevent="login('admin')">
                                            <div class="space-y-2">
                                                <label for="admin-email"
                                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                                <input id="admin-email" v-model="adminEmail" type="email"
                                                    placeholder="admin@example.com" required
                                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                            </div>
                                            <div class="space-y-2">
                                                <label for="admin-password"
                                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                                <input id="admin-password" v-model="adminPassword" type="password"
                                                    required
                                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                            </div>
                                            <button type="submit"
                                                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full">
                                                Login as Admin
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-4 p-6 pt-0">
                            <div class="text-sm text-muted-foreground text-center">
                                <p v-if="errorMessage" class="text-red-600 mb-2">{{ errorMessage }}</p>
                                <a href="#" class="underline underline-offset-4 hover:text-primary">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import { useRouter } from 'vue-router'
import { Clock, ArrowLeft } from 'lucide-vue-next'
import { authApi } from '@/services/api'

const activeTab = ref('teller')
const router = useRouter()

// Reactive form data
const tellerEmail = ref('')
const tellerPassword = ref('')
const adminEmail = ref('')
const adminPassword = ref('')

const errorMessage = ref('')



async function login(role) {
    errorMessage.value = ''
    let email = ''
    let password = ''

    try {
        const email = tellerEmail.value || adminEmail.value;
        const password = adminPassword.value || tellerPassword.value;

        const payload = { email, password };

        const response = await authApi.post('auth/login', payload);

        if (response.status != 200) {
            errorMessage.value = 'Login failed'
            return
        }

        const data = await response.data
        // Store token in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('desk_num', data.desk_num)
        // Redirect based on role
        if (data.role === 'teller' || data.role == "SUPER_ADMIN") {
            router.push('/teller')
        } else if (data.role === 'admin' || data.role == "SUPER_ADMIN") {
            router.push('/admin')
        }
    } catch (error) {
        errorMessage.value = `An error occurred during login ${error}`
    }
}
</script>
