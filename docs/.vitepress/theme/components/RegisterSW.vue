<script setup lang="ts">
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
    console.log('Service Worker Registered')
})
</script>

<template>
</template>
