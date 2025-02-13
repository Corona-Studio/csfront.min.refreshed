<script setup lang="ts">
import {onMounted, VNode, watch} from 'vue';

const props = defineProps<{
    update?: string;
    id?: string;
}>();

const slots = defineSlots<{
  default(): VNode[]
}>();

watch(
    () => props.update,
    (newer) => {
        document.title = newer ?? document.title;
    },
);

onMounted(() => {
    if (!slots.default || slots.default.length > 0)
        document.title = slots.default!()[0].children as string;
});
</script>

<template>
    <div class="hidden -z-50 absolute" :id="`PAGE:::${id}`">
        <slot></slot>
    </div>
</template>
