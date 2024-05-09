<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const modalground = ref<HTMLElement | null>(null);
const openStatus = ref(false);
const isKilled = ref(true);

const props = defineProps<{
    position?: string;
    shutByGround?: boolean;
}>();

function mount(target: string) {
    if (target === 'ground') {
        switch (props.position ?? 'center') {
            case 'center':
            default:
                return '  justify-items-center   items-center  ';
            case 'right':
                return '  justify-items-end   items-center  ';
        } // cnm meixie bottom
    } else if (target === 'frame') {
        switch (props.position ?? 'center') {
            case 'center':
            default:
                return 'centr';
            case 'right':
                return 'right-0';
        }
    }
}

function open() {
    if (!isKilled.value) return;
    openStatus.value = true;
    isKilled.value = false;
}

function kill() {
    if (isKilled.value) return;
    openStatus.value = false;

    setTimeout(() => {
        isKilled.value = true;
    }, 800);
}

const listener: EventListenerOrEventListenerObject = (e) => {
    if (!props.shutByGround) return;
    if (!e.target || (e.target as Element).id != 'HugeModalGround') return;
    kill();
};

const isSafari = computed(() => {
    return (
        window.navigator.userAgent.toString().includes('afari') &&
        !window.navigator.userAgent.toString().includes('hrome')
    );
});

onMounted(() => {
    (modalground.value as Element).addEventListener('click', listener);
});

onBeforeUnmount(() => {
    (modalground.value as Element).removeEventListener('click', listener);
});

defineExpose({
    open,
    kill,
});
</script>

<template>
    <div
        id="HugeModalGround"
        style="pointer-events: fill"
        ref="modalground"
        :class="`bg-opacity-35 bg-zinc-950 min-w-full min-h-screen fixed   
        ${openStatus ? 'xxx' : 'fade-au'} ${isKilled ? 'hidden' : 'fade-in'}
           grid ${mount('ground')}
           top-0 left-0 right-0 bottom-0  `">
        <div
            :class="`${(position ?? 'center') == 'bottom' ? 'w-full' : 'w-auto'} h-auto inner-border fixed   
            ${openStatus ? 'xxx' : 'fade-au'} ${isKilled ? 'hidden' : 'fade-in'}   ${mount('frame')}  fn  `">
            <slot></slot>
            <p class="m-1" v-if="isSafari && props.position != 'right'" style="text-align: center">
                <span
                    class="m-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg opacity-80">
                    {{ t('safari') }} 
                </span>
            </p>
        </div>
        <i class="hidden justify-items-end">
            <div class="justify-items-start"></div>
        </i>
    </div>
</template>

<style scoped>
#HugeModalGround {
    position: fixed;
    z-index: 888;
    transition-duration: 1.14ms;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.3, 0, 0.1, 1);
}
#HugeModalGround.hidden{
    display: none !important;
}
</style>
