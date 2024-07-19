<script lang="ts" setup>
// @ts-ignore
import VPTeamMembersItem from 'vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue';
import { useData } from 'vitepress'
import { computed } from 'vue'
import { CustomThemeConfig } from '../type';
const { theme } = useData<CustomThemeConfig>();
const member = computed(() => theme.value.about)
</script>

<template>
    <ClientOnly>
        <div style="justify-content: center; width: 100%; ">
            <VPTeamMembersItem :member="member" />
        </div>
    </ClientOnly>
</template>
