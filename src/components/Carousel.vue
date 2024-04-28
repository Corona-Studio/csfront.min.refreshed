<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import Title from './Title.vue';

function play() {
    playing.value = true;
}

function stop() {
    playing.value = false;
}

const enableHomeCarousel = ref(false);
const playing = ref(true);

const props = defineProps<{
    isHomeCarousel?: boolean;
    imagePaths?: string[];
    shouldPlay?: boolean;
    frameClassList?: string;
    opacity?: number;
}>();

onMounted(() => {
    if (props.isHomeCarousel) enableHomeCarousel.value = true;
});

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
        :class="`h-screen block ${frameClassList} transition bg-zinc-400 dark:bg-zinc-700 `">
        <Carousel
            :autoplay="playing ? 1230 : 0"
            :style="`opacity: calc(${opacity ?? '100'} * 0.01) `">
            <Slide v-for="img of imagePaths" :key="img">
                <div class="carousel__item">
                    <img :src="img" :alt="img" />
                </div>
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>

        <Title :hidden="isHomeCarousel" />
    </div>
</template>

<style scoped>
.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>
