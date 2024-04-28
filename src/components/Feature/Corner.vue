<script setup lang="ts">
import { onMounted, ref } from 'vue';

const modesw = ref(true);
const lg = ref('lg:');

const props = defineProps<{
    mode?: string;
    reverse?: boolean;
}>();

onMounted(() => {
    modesw.value = props.mode !== 'br';
});
</script>

<template>
    <span
        :class="
            modesw
                ? `
        ${reverse ?? false ? ' ' : lg}hidden
        ${reverse ?? false ? lg : ' '}block
        ${reverse ?? false ? ' ' : lg}w-0
        ${reverse ?? false ? lg : ' '}w-full `
                : ''
        ">
        <span
            :class="
                !modesw
                    ? `
            ${reverse ?? false ? ' ' : lg}hidden
            ${reverse ?? false ? lg : ' '}inline-block `
                    : 'hidden'
            ">
            <br />
        </span>
        <i class="hidden getter">
            <i class="lg:hidden block lg:w-0 w-full"></i>
            <i class="lg:block hidden"></i>
            <i class="lg:inline-block"></i>
        </i>
    </span>
</template>
