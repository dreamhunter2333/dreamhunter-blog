<template>
    <div>
        <div id="sakana-box" class="sakana-box" v-bind:style="styleObject"></div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";


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
    const script = document.createElement("script");
    script.async = true;
    script.onload = () => {
        // @ts-ignore
        Sakana.init(options.value.config);
    }
    script.src = "https://cdn.jsdelivr.net/npm/sakana";
    document.body.appendChild(script);
});
</script>
