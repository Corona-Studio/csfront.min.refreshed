<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const modalground = ref<HTMLElement | null>(null);
const openStatus = ref(false);
const opacity = ref(0);
const isKilling = ref(false);

const props = defineProps<{
    position?: string;
}>();

function mount(target: string) {
    if (target === 'ground') {
        switch (props.position ?? 'center') {
            case 'center':
            default:
                return '  justify-items-center   items-center  ';
            case 'right':
                return '  justify-items-end   items-center  ';
        }
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

function emitChange() {
    if (opacity.value <= 0) {
        openStatus.value = false;
        return;
    }

    openStatus.value = true;
}

/*
  function open(){
    openStatus.value = true;
    fade(0, 119);
    isKilling.value = false;
  }
  */

function fade(from: number, to: number, speed = 1, pace = 1) {
    opacity.value = from;

    let defIntr = setInterval(() => {
        if (from < to) {
            if (opacity.value >= to) {
                clearInterval(defIntr);
                emitChange();
            }
            opacity.value += pace;
        } else {
            if (opacity.value <= to) {
                clearInterval(defIntr);
                emitChange();
            }
            opacity.value -= pace;
        }
    }, speed);
}

function kill() {
    if (isKilling.value) return;
    isKilling.value = true;

    new Promise(() => {
        fade(119, 0);
    })
        .then(() => {
            openStatus.value = false;
            isKilling.value = false;
        })
        .catch((ex) => {
            console.log(ex);
        });
}

const listener: EventListenerOrEventListenerObject = (e) => {
    if (!e.target || (e.target as Element).id != 'HugeModalGround') return;

    kill();
};

const step = computed(() => {
    return window.navigator.userAgent.toString().includes('afari') &&
        !window.navigator.userAgent.toString().includes('hrome')
        ? 10
        : 1;
});
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
</script>

<template>
    <div
        id="HugeModalGround"
        style="pointer-events: fill"
        ref="modalground"
        :class="`bg-opacity-35 bg-zinc-950 min-w-full min-h-screen   ${openStatus ? 'fixed' : 'hidden'}
           grid ${mount('ground')}
           top-0 left-0 right-0 bottom-0  `"
        :style="`opacity: ${opacity * step * 0.01}; `">
        <div
            :class="`${(position ?? 'center') == 'bottom' ? 'w-full' : 'w-auto'} h-auto inner-border   ${openStatus ? 'fixed' : 'hidden'}  ${mount('frame')}  fn  `"
            :style="`opacity: ${(opacity - 20) * step * 0.01}; position: initial;`">
            <slot></slot>
            <p v-if="isSafari" style="text-align: center" class="m-1">
                <span
                    class="m-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg opacity-80">
                    {{ '' }}
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
    z-index: 888;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.3, 0, 0.1, 1);
    transition-duration: 1.14ms;
}
.fade-in {
    animation: fain all forwards 0.8s;
    -webkit-animation: faou all forwards 3ms !important;
}
.fade-au {
    animation: faou all forwards 0.8s;
    -webkit-animation: faou all forwards 3ms !important;
}
@keyframes fain {
    from {
        opacity: 0 !important;
    }
    to {
        opacity: 1 !important;
    }
}
@keyframes faou {
    from {
        opacity: 1 !important;
    }
    to {
        opacity: 0 !important;
    }
}
</style>
