<template>
  <ClientOnly>
    <div>
      <div id="sakana-box" class="sakana-box" :style="styleObject"></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

declare global {
  interface Window {
    Sakana?: { init: (config: Record<string, unknown>) => void }
    __sakanaInitialized?: boolean
  }
}

const options = computed(() => {
    return {
        config: {
            scale: 0.4,
            character: "chisato",
            canSwitchCharacter: true,
            el: "#sakana-box"
        },
        styleObject: {
            position: "fixed",
            left: 0,
            bottom: "10px",
            "z-index": 9999,
            "transform-origin": "0% 100%",
        },
    }
});
const styleObject = computed(() => {
    return options.value.styleObject;
})


onMounted(() => {
    const initSakana = () => {
        if (window.__sakanaInitialized) return;
        if (!window.Sakana) return;
        window.__sakanaInitialized = true;
        window.Sakana.init(options.value.config);
    };

    if (window.Sakana) {
        initSakana();
        return;
    }

    const existing = document.getElementById("sakana-script");
    if (existing) {
        existing.addEventListener("load", initSakana, { once: true });
        return;
    }

    const script = document.createElement("script");
    script.id = "sakana-script";
    script.async = true;
    script.onload = initSakana;
    script.src = "https://cdn.jsdelivr.net/npm/sakana";
    document.body.appendChild(script);
});
</script>
