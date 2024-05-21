<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { pushToast } from '../../utils/toast';

const { t } = useI18n();
const modalGround = ref<HTMLElement | null>(null);
const modalBody = ref<HTMLElement | null>(null);
const openStatus = ref(false);
const isKilled = ref(true);

const props = defineProps<{
    position?: string;
    shutByGround?: boolean;
    ignoreSafari?: boolean;
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
                if(isSafari && !(props.ignoreSafari ?? false)) return 'centr-safari left-3.5 right-3.5 sm:left-6 sm:right-6 md:left-1/4 md:right-1/4 lg:left-1/3 lg:right-1/3';
                else return 'centr';
            case 'right':
                return 'right-0';
        }
    }
}

function open() {
    if (!isKilled.value) return;
    openStatus.value = true;
    isKilled.value = false;

    setTimeout(() => {
        checkAlive();
    }, 514 * 2);
}

function warning(x: string){
    console.log(x);
    pushToast(x.replaceAll('\n', '<br>'), 'bg-yellow-600 -translate-y-3 inline-block mx-auto bottom-12 alive-warning max-w-3/4 text-left',
     19, 19810);
    setTimeout(() => {
        let warningIsAlive = document.getElementsByClassName('alive-warning').length != 0;
        if(!warningIsAlive) alert(x);
    }, 123);
}

function checkAlive(){
    if(window.getComputedStyle(modalBody.value as unknown as Element).display != 'block' || parseFloat(window.getComputedStyle(modalBody.value as unknown as Element).opacity) <= 0)
        {
            warning(t('base.adblocker').replaceAll('    ', '').trim());
            // kill();
        }
}

function kill() {
    if (isKilled.value) return;
    openStatus.value = false;

    setTimeout(() => {
        isKilled.value = true;
    }, 500);
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
    (modalGround.value as unknown as Element).addEventListener('click', listener);
});

onBeforeUnmount(() => {
    (modalGround.value as unknown as Element).removeEventListener('click', listener);
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
        ref="modalGround"
        :class="`bg-opacity-35 bg-zinc-950 min-w-full min-h-screen fixed   
        ${openStatus ? 'xxx' : 'fade-au'} ${isKilled ? 'hidden' : 'fade-in'}
           grid ${mount('ground')}
           top-0 left-0 right-0 bottom-0  `">
        <div ref="modalBody"
            :class="`${(position ?? 'center') == 'bottom' ? 'w-full' : 'w-auto'} 
                     h-auto inner-border fixed    
            ${openStatus ? 'xxx' : 'fade-au'} ${isKilled ? 'hidden' : 'fade-in'}   ${mount('frame')}  fn  `">
            <slot></slot>
            <p class="m-1" v-if="isSafari && props.position != 'right'" style="text-align: center">
                <span
                    class="m-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg inline-block scale-90 mt-0  bg-opacity-90 dark:bg-opacity-90 shadow">
                    {{ t('base.safariModal') }} 
                </span>
            </p>
        </div>
        <i class="hidden justify-items-end -translate-y-3 bg-yellow-600 bottom-12">
            <div class="justify-items-start max-w-3/4 text-left"></div>
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
