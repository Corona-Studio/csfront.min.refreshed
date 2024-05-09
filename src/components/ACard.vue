<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cardit = ref<HTMLElement | null>();
const formed = ref(
    'p-9 px-11 pb-5 justify-items-center items-center gap-0 grid',
);
const adjusted = ref(false);
const w = ref('w-min');

const props = defineProps<{
    form?: 'top' | 'left' | 'right' | 'hide';
    avatar?: string;
    title?: string;
    static?: boolean;
    inGrid?: boolean;
}>();

onMounted(() => {
    switch (props.form ?? 'top') {
        case 'top':
        default:
            formed.value = ` ${props.inGrid ?? false ? 'pt-8 pb-3.5' : 'p-9 px-11 pb-5'} justify-items-center items-center gap-0 grid `;
            w.value = ' w-min ';
            break;
        case 'left':
            formed.value =
                'flex  justify-start' + (props.inGrid ?? 'false') == 'true'
                    ? ''
                    : 'p-3';
            w.value = ' w-60 ';
            adjusted.value = true;
            break;
        case 'right':
            formed.value =
                'flex  justify-end' + (props.inGrid ?? 'false') == 'true'
                    ? ''
                    : 'p-3';
            w.value = ' w-60 ';
            adjusted.value = true;
            break;
        case 'hide':
            cardit.value!.classList.remove('pb-5');
            break;
    }
});
</script>

<template>
    <div
        ref="cardit"
        :class="` ${formed} bg-zinc-200 dark:bg-zinc-700 transition  rounded-lg
    shadow hover:shadow-lg active:shadow-md mx-auto opacity-95
    dark:shadow dark:hover:shadow-lg dark:active:shadow-md
    dark:bg-opacity-60 dark:hover:bg-opacity-70 dark:active:bg-opacity-75
    bg-opacity-60 hover:bg-opacity-70 active:bg-opacity-75 ${static ?? false ? w : 'w-full'}
    `">
        <div
            :class="` centr avatar ${(form ?? 'top') == 'left' ? 'mx-1.5' : (form ?? 'top') == 'top' ? 'mx-auto translate-y-1' : 'hidden'} bg-zinc-600 border bg-opacity-10 rounded-full min-w-16 min-h-16 ? max-h-20 max-w-20 ? ${adjusted ? '' : 'mx-auto'} my-auto `"
            :style="`background-image: url('${avatar ?? ''}')`"></div>

        <div :class="` centr info p-2 `">
            <h3
                :class="`${form ?? 'top' == 'top' ? 'mt-1.5' : ''} text-lg text-center`">
                {{ title ?? 'Title ' }}
            </h3>
            <h6
                class="font-light -translate-y-1.5 text-center opacity-95 max-w-full">
                <slot></slot>
            </h6>
        </div>

        <div
            :class="` centr avatar ${(form ?? 'top') == 'right' ? 'mx-1.5' : 'hidden'} bg-zinc-600 border bg-opacity-10 rounded-full min-w-16 min-h-16 ? max-h-20 max-w-20 ? ${adjusted ? '' : 'mx-auto'} my-auto `"
            :style="`background-image: url('${avatar ?? ''}')`"></div>

        <i
            class="hidden occupy gap-0 p-9 px-11 pb-5 justify-items-center items-center w-min">
            <i class="flex p-3 justify-end mx-3 w-fit">
                <i class="justify-start w-60 mx-1.5 mt-1.5 pt-8 pb-3.5"></i>
            </i>
        </i>
    </div>
</template>

<style scoped>
.avatar {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    /*  */
}
</style>
