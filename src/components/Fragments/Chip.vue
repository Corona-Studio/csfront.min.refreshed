<script setup lang="ts">
import { onMounted, ref } from 'vue';

const ecolor = ref('');

const props = defineProps<{
    icolor: number;
    color?: string;
}>();

onMounted(() => {
    if (props.color) {
        ecolor.value = props.color;
        return;
    }
    switch (props.icolor) {
        case 0:
            return (ecolor.value = '#348dec');
        case 1:
            return (ecolor.value = '#13a87c');
        case 2:
            return (ecolor.value = '#e3990c');
        case 3:
            return (ecolor.value = '#dd3c7c');
        case 4:
            return (ecolor.value = '#39999c');
        case 5:
            return (ecolor.value = '#6657ac');
    }
});
</script>

<template>
    <span
        class="px-1 p-0.5 rounded-lg border align-top font-light mr-0.5 mt-0.5 lg:mr-1.5 inline-block"
        :style="`font-size: 11.5px; line-height: 1.1rem; color: ${ecolor} !important; border-color: ${ecolor} !important`">
        <slot></slot>
    </span>
</template>
