<template>
  <form class="grid grid-cols-1 gap-5 max-w-[1000px] sm:grid-cols-2 sm:gap-8" @submit.prevent>
    <div class="input-box">
      <label for="firstName">
        First Name
      </label>
      <input
        v-model="formData.firstName"
        name="firstName"
        class="input"
        type="text"
      >
    </div>
    <div class="input-box">
      <label for="lastName">
        Last Name
      </label>
      <input
        v-model="formData.lastName"
        name="lastName"
        class="input"
        type="text"
      >
    </div>
    <div class="input-box">
      <label for="email">
        Email
      </label>
      <input
        v-model="formData.email"
        name="email"
        class="input"
        type="email"
      >
    </div>
    <div class="input-box">
      <label for="phoneNumber">
        Phone Number
      </label>
      <input
        v-model="formData.phoneNumber"
        name="phoneNumber"
        class="input"
        type="text"
      >
    </div>
    <div class="input-box">
      <label for="postalCode">
        Postal Code
      </label>
      <input
        v-model="formData.postalCode"
        name="postalCode"
        class="input"
        type="text"
      >
    </div>
    <div class="input-box">
      <label for="city">
        City
      </label>
      <input
        v-model="formData.city"
        name="city"
        class="input"
        type="text"
      >
    </div>
    <div class="input-box">
      <label for="address">
        Address
      </label>
      <input
        v-model="formData.address"
        name="address"
        class="input"
        type="text"
      >
    </div>
  </form>
</template>

<script setup lang="ts">
interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  postalCode: string
  city: string
}
const formData = ref<CheckoutForm>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  postalCode: '',
  city: ''
})
</script>

<style scoped>
.input-box {
  @apply flex flex-col gap-2 w-full text-2xl
}
.input {
  @apply flex-grow rounded-full p-5 border border-borderDarkColor
}
</style>
