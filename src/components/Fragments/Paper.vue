<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';

import { doScroll } from '../../utils/scroll.ts';
import Footer from '../Footer.vue';

const PMC = ref<HTMLElement | null>(null);
const heightFix = ref(0);
const timer = ref(false);
const screenHeight = ref(document.body.clientWidth);

const props = defineProps<{
    noTopWrap?: boolean;
    noHeightWrap?: boolean;
    presetPadding?: boolean;
    presetMargin?: boolean;
    overClass?: string;
    start?: string;
    fix?: boolean;
    noBackdrop?: boolean;
    presetWidth?: boolean;
    innerHatch?: boolean;
}>();

function resizeCallback() {
    const screenHeights = document.body.clientWidth;
    screenHeight.value = screenHeights;
}

function updateHeightFix() {
    if (props.fix ?? false) return;
    if (!PMC.value) return;

    heightFix.value = document.getElementById('aspan')!.offsetTop;
    PMC.value.style.height = heightFix.value + 'px';
}

onMounted(() => {
    if (props.fix ?? false) return;

    updateHeightFix();
    window.addEventListener('resize', resizeCallback);
    window.addEventListener('scroll', resizeCallback);

    doScroll(props.start ?? 'PAPERTOP', false);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCallback);
    window.removeEventListener('scroll', resizeCallback);
});

onUpdated(() => {
    updateHeightFix();
});

watch(screenHeight, (val) => {
    if (!timer.value) {
        screenHeight.value = val;
        timer.value = true;

        updateHeightFix();
        setTimeout(() => {
            timer.value = false;
        }, 600);
    }
});
</script>

<template>
    <div
        id="PAPERTOP"
        :class="`home w-full  min-w-full paper             
        ${presetMargin ?? false ? ' mx-1.5 ' : ' mx-0 '}`"
        style="pointer-events: none">
        <div
            ref="PMC"
            id="PMC"
            :class="
                ` shadow-xl h-full w-full  ${noBackdrop ?? false ? 'forcenobg' : 'backoff'}   z-10 bg-zinc-100 dark:bg-zinc-900 bg-opacity-55 dark:bg-opacity-55
            ${noTopWrap ?? false ? ' mt-0 ' : ' mt-16 '}
            ${presetPadding ?? false ? ' px-1.5 ' : ' px-0 '}
            ${noHeightWrap ?? false ? '  ' : ' min-h-screen '} ` + overClass
            "
            style="z-index: 8; pointer-events: fill">
            <div
                style="z-index: 8"
                :class="
                    presetWidth ?? true ? 'w-10/12 md:w-8/12 mx-auto' : ' '
                ">
                <br :class="innerHatch ?? true ? '' : 'hidden'" />
                <slot></slot>
            </div>
            <div class="w-0 h-0" id="aspan"></div>
        </div>
        <Footer />
    </div>
</template>

<style>
.backoff {
    backdrop-filter: blur(32px);
    text-shadow: 3px 4px 5px rgba(85, 70, 70, 0.139);
}
.forcenobg {
    box-shadow: none !important;
    background-color: transparent !important;
}
</style>
