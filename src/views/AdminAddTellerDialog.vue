<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="handleClose"></div>
      <div class="z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 class="text-lg font-semibold leading-none tracking-tight">Add New Teller</h2>
          <p class="text-sm text-muted-foreground">
            Create a new teller account for the student financing office.
          </p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="user_id"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ID
              </label>
              <input id="user_id" v-model="form.user_id" type="number"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="1234567" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="username"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <input id="username" v-model="form.username"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Username" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="f_name"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First Name
              </label>
              <input id="f_name" type="text" v-model="form.f_name"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="First Name" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="l_name"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last Name
              </label>
              <input id="l_name" type="text" v-model="form.l_name"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Last Name" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="email"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input id="email" type="email" v-model="form.email"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="email@example.com" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="phone"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone
              </label>
              <input id="phone" type="tel" v-model="form.phone"
                class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="876-123-4567" required />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label for="desk"
                class="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Desk
              </label>
              <select id="desk" v-model="form.desk_num"
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
              <input id="password" type="password" v-model="form.password"
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
import { defineProps, ref, defineEmits } from 'vue'
// import axios from 'axios'
import { api } from '@/services/api'

const form = ref({
  user_id: 0,
  id_num: 0,
  username: ' ',
  f_name: ' ',
  l_name: '',
  phone: 0,
  email: '',
  desk_num: '',
  password: '',
  user_type: 'teller',
})

// Reactive error messages for form validation
const formErrors = ref({
  user_id: '',
  username: '',
  f_name: '',
  l_name: '',
  phone: '',
  email: '',
  desk_num: '',
  password: ''
})

// Validation functions
const validateName = (name) => {
  if (!name) return 'Name is required.'
  if (/\d/.test(name)) return 'Name cannot contain numbers.'
  return ''
}

const validateIdNum = (id) => {
  if (!id) return 'ID is required.'
  if (!/^\d{7}$/.test(id.toString())) return 'ID must be exactly 7 digits.'
  return ''
}

const validateEmail = (email) => {
  if (!email) return 'Email is required.'
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i
  if (!emailRegex.test(email)) return 'Email must be a valid email address.'
  return ''
}

const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required.'
  const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
  if (!phoneRegex.test(phone)) return 'Phone number must include area code and 7 digits.'
  return ''
}

const validateDeskNum = (desk) => {
  if (!desk) return 'Desk selection is required.'
  return ''
}

const validatePassword = (password) => {
  if (!password) return 'Password is required.'
  if (password.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one capital letter.'
  if (!/\d/.test(password)) return 'Password must contain at least one number.'
  return ''
}

const validateForm = () => {
  formErrors.value.user_id = validateIdNum(form.value.user_id)
  formErrors.value.username = form.value.username ? '' : 'Username is required.'
  formErrors.value.f_name = validateName(form.value.f_name)
  formErrors.value.l_name = validateName(form.value.l_name)
  formErrors.value.phone = validatePhone(form.value.phone)
  formErrors.value.email = validateEmail(form.value.email)
  formErrors.value.desk_num = validateDeskNum(form.value.desk_num)
  formErrors.value.password = validatePassword(form.value.password)

  return Object.values(formErrors.value).every(error => error === '')
}

// Modify handleSubmit to validate before submitting
const originalHandleSubmit = handleSubmit
handleSubmit = (e) => {
  e.preventDefault()
  if (!validateForm()) {
    return
  }
  // Clear errors before submission
  Object.keys(formErrors.value).forEach(key => formErrors.value[key] = '')
  originalHandleSubmit(e)
}
// console.log(form.value)
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})


const emit = defineEmits(['update:open'])

const handleClose = () => {
  emit('update:open', false)
}

const handleSubmit = (e) => {
  e.preventDefault() // Prevent form refresh
  form.value.id_num = form.value.user_id
  console.log('Form submitted:', form.value)
  api
    .post(
      '/users',

      form.value,
    )
    .then((response) => {
      console.log('Success:', response.data.message)
      handleClose() // Close the dialog after successful submission
    })
    .catch((error) => {
      console.error('Error:', error)
      this.responseMessage = error.response?.data || 'Failed to create user'
    })
}
</script>
