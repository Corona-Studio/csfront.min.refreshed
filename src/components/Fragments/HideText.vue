<script setup lang="ts">
defineProps<{
    ex?: string;
    explain?: string;
}>();
</script>

<template>
    <span class="py-2 mx-0.5" :title="ex ?? explain ?? 'Hidden'">
        <span class="m-0 p-0 bg-transparent hide-text mx-0.5">
            <slot></slot>
        </span>
    </span>
</template>
