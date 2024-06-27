<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
const { theme } = useData()
const members = computed(() => theme.value.teamMembers)
</script>

<template>
    <div v-if="members" style="display: flex; justify-content: center; width: 100%; ">
        <VPTeamMembers :members="members" />
    </div>
</template>
