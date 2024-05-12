<script setup lang="ts">
import {
    VNodeRef,
    createVNode,
    onBeforeUnmount,
    onMounted,
    onUpdated,
    ref,
    render,
    watch,
} from 'vue';

import { doScroll } from '../../utils/scroll.ts';
import Footer from '../Footer.vue';
import Modal from './Modal.vue';
import Pressable from './Pressable.vue';

const PMC = ref<HTMLElement | null>(null);
const Agent = ref<HTMLElement | null>(null);
const GeneralModal = ref<HTMLElement | null | VNodeRef>(null);
const heightFix = ref(0);
const timer = ref(false);
const screenHeight = ref(document.body.clientWidth);
const messageModal = ref('');

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

/// Agent DEPRECATED
function AgentHandle(html: string) {
    let created = createVNode(
            'div',
            { components: { Modal, Pressable } },
            html,
        ),
        puppet = document.createElement('div');
    puppet.classList.add('fixed');
    render(created, puppet);
    Agent.value?.appendChild(puppet);
}

function AgentClear() {
    if (Agent.value) Agent.value.innerHTML = '';
}

/// !Agent
// 我本来想让Agent代理子组件里的modal的

defineExpose({
    AgentHandle,
    AgentClear,
    PublicModalOn,
    PublicModalOff,
});

function PublicModalOn(content: string) {
    messageModal.value = content;
    GeneralModal.value.open();
    // GeneralModal.value.
}
function PublicModalOff() {
    GeneralModal.value.kill();
    messageModal.value = '';
}
</script>

<template>
    <div
        id="PAPERTOP"
        :class="`home w-full  min-w-full paper             
        ${presetMargin ?? false ? ' mx-1.5 ' : ' mx-0 '}`"
        style="pointer-events: none">
        <!-- Agent was here -->
        <div
            id="PMC"
            ref="PMC"
            :class="
                ` shadow-xl h-full w-full  ${noBackdrop ?? false ? 'forcenobg' : 'backoff'}   z-10 bg-zinc-100 dark:bg-zinc-700 ?bg-opacity-65 ?dark:bg-opacity-75
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
<script lang="ts"></script>

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
