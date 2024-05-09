<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Title from './Title.vue';

interface PlayList {
    id: number;
    path: string;
}


function play() {
    playing.value = true;
}

function stop() {
    playing.value = false;
}

const enableHomeCarousel = ref(false);
const playing = ref(true);

let playlist = ref<Playlist[]>([]);
let current = ref(0);
// let carouselInterval = ref(Number)


const props = defineProps<{
    isHomeCarousel?: boolean;
    imagePaths?: string[];
    shouldPlay?: boolean;
    frameClassList?: string;
    opacity?: number;
}>();

onMounted(() => {
    if (props.isHomeCarousel) enableHomeCarousel.value = true;
    let index = 0;
    for (let x of props.imagePaths!) {
        playlist.value.push({
            id: index,
            path: x,
        });
        index++;
    }

    Initial();
});

function Initial() {
    // carouselInterval.value =
    setInterval(() => {
        // if(!(props.shouldPlay ?? true)) return;
        ChangeCarousel();
    }, 3690);
}

function ChangeCarousel() {
    if (current.value < playlist.value.length - 1) current.value++;
    else current.value = 0;
}

watch(
    () => props.shouldPlay,
    (_, newVal) => {
        if (newVal) play();
        else stop();
    },
);
</script>

<template>
    <div
        :class="`h-screen block  overflow-hidden overflow-x-hidden overflow-y-hidden ${frameClassList} transition bg-zinc-400 dark:bg-zinc-700 `">
        <div
            class="w-full h-screen max-h-screen overflow-hidden overflow-x-hidden overflow-y-hidden">
            <div
                :class="` ${img.id == current ? 'fade-in' : 'fade-au'}      scale-x-110 max-h-screen carousels bg-center bg-no-repeat bg-cover bg-fill opacity-30 absolute top-0 bottom-0 left-0 right-0 `"
                v-for="img of playlist"
                :key="img.id"
                :style="`background-image: url(${img.path}) !important; background-color: darkgray`"></div>
        </div>
        <Title :hidden="isHomeCarousel ?? false" />
    </div>
</template>
<script lang="ts">
export default {
    name: 'Carousel',
};
</script>

<style scoped>
.bg-fill {
    /* background-size: 256% !important;
    background-position: center;
    background-repeat: space;
    background-origin: border-box; */
    background-position-y: bottom;
}
</style>
