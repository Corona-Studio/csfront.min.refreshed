<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div
        class="bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 dark:bg-zinc-800 rounded-lg p-1.5 my-2.5">
        <h3 class="text-lg font-semibold indent-2">{{ t('base.tips') }}</h3>
        <div
            class="bg-zinc-100 dark:bg-zinc-600 text-sm rounded-lg p-1.5 m-0.5 bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-40 dark:hover:bg-opacity-40 transition">
            <slot></slot>
        </div>
    </div>
</template>
