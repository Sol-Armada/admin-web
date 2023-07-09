<template>
  <router-view v-if="!serverError" />
  <div v-else>
    <h1>Server Error</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getHealth } from './api/health'

const serverError = ref(false)

// monitor login status every 10 seconds
isHealthy()
setInterval(isHealthy, 10000)
function isHealthy() {
  getHealth().then(() => {
    serverError.value = false
  }).catch(() => {
    serverError.value = true
  })
}
</script>
