<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import Title from './Title.vue';
import exp from 'constants';

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
        <div class="w-full h-full">
            <div class="carousels bg-center bg-no-repeat bg-cover opacity-30 absolute top-0 bottom-0 left-0 right-0" v-for="img of imagePaths" :key="img" :style="`background-image: url(${img}) !important; `">
            </div>
        </div>
        <Title :hidden="isHomeCarousel" />
    </div>
</template>
<script lang="ts">

export default {
    name: 'Carousel',
    mounted(){
        console.log(this.imagePaths);
        this.Initial();
    },
    data(){
        return {
            carouselInterval: null,
            // use another array with custom tuples to record. bind-change.
        }
    },
    methods: {
        Initial(){
            this.carouselInterval = setInterval(()=>{
                this.ChangeCarousel();
            }, 3690);
        },
        ChangeCarousel(){

        }
    }

}
</script>

<style scoped>
.out{
    animation: fadelyc 1s cubic-bezier(0.075, 0.82, 0.165, 1) reverse;
}
.in{
    animation: fadelyc 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}

@keyframes fadelyc {
    0%{
        opacity: 1;
    }
    100%{
        opacity: .1;
    }
}

</style>
