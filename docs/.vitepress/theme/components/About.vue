<script lang="ts" setup>
import { VPTeamMembers } from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { CustomThemeConfig } from '../type';
const { theme } = useData<CustomThemeConfig>();
const members = computed(() => [theme.value.about])
</script>

<template>
    <ClientOnly>
        <div v-if="members" style="display: flex; justify-content: center; width: 100%; ">
            <VPTeamMembers :members="members" />
        </div>
    </ClientOnly>
</template>
