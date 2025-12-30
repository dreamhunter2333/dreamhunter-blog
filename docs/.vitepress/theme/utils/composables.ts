import { computed, ref, onMounted, onUnmounted, type ComputedRef } from 'vue'
import { useData } from 'vitepress'
import { darkTheme } from 'naive-ui'

export function useIsMobile(): ComputedRef<boolean> {
    const isMobile = ref(false)

    onMounted(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        isMobile.value = mediaQuery.matches

        const handler = (e: MediaQueryListEvent) => {
            isMobile.value = e.matches
        }

        mediaQuery.addEventListener('change', handler)
        onUnmounted(() => mediaQuery.removeEventListener('change', handler))
    })

    return computed(() => isMobile.value)
}

export function useNaiveTheme() {
    const { isDark } = useData()
    return computed(() => isDark.value ? darkTheme : null)
}
