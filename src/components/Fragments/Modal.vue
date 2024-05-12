<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'

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
    }, 1234);
}

function checkAlive(){
    if(window.getComputedStyle(modalBody.value as Element).display != 'block' || parseInt(window.getComputedStyle(modalBody.value as Element).opacity) <= 0)
        {
            
            alert(`请关闭广告拦截器(将本站加入白名单), 它影响到本站正常工作了. 
            我们永远不会插入影响浏览的烦人广告. 在关闭拦截器后, 请刷新页面.
            ---
            Please turn your AD Blocker off(or add this site into whitelist) for this page since it prevents this page from functioning. 
            We will never add annoying advertisements into this site. After you turned the blocker off, please refresh the page.
            ---
            Пожалуйста, выключите ваш Блокировщик рекламы, из-за того этот сайт не может работать прекрасны.
            никогда мы не будем добавить досадные рекламы. 
            И после выключили Блокировщик рекламы пожалуйста обновите этот сайт!`.replaceAll('    ', ''));
            
            kill();
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
    (modalGround.value as Element).addEventListener('click', listener);
});

onBeforeUnmount(() => {
    (modalGround.value as Element).removeEventListener('click', listener);
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
