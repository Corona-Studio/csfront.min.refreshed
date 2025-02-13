<script setup lang="ts">
// import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Pressable from './Fragments/Pressable.vue'

const { t } = useI18n();

const props = defineProps<{
    message?: string;
}>();

function refresh(){
    setTimeout(() => {
        window.location.reload();
    }, 123);
}
</script>
<template>
    <div class="w-full fade-in p-2 rounded-lg bg-zinc-200 bg-opacity-70 dark:bg-opacity-10 scale-90 hover:scale-95 group transition shadow grid justify-items-center items-center">
        <div class="grid gap-2">
            <div class="text-center group-hover:scale-105 scale-100 transition">
                {{ t('base.failed') }}
                <p :class="props.message == undefined ? 'hidden' : ''">{{ props.message ?? '' }}</p>
            </div>
            <div>
                <Pressable :isFuncButton="true" :noStartIcon="true" @click.native="refresh()">
                    {{ t('base.retry') }}
                </Pressable>
            </div>
        </div>
    </div>
</template>