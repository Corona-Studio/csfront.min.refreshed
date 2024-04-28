<script setup lang="ts">
import Paper from '../components/Fragments/Paper.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <Paper
        :no-height-wrap="true"
        :no-top-wrap="true"
        :no-backdrop="true"
        class="overflow-hidden max-h-screen">
        <PageTitle>{{ t('PageNotFound') }}</PageTitle>
        <div
            class="grid items-center justify-items-center justify-center h-screen overflow-hidden">
            <div
                class="m-3 grid items-center justify-items-center justify-center rounded-xl scale-100 hover:scale-105 bg-zinc-300 dark:bg-zinc-600 bg-opacity-40 dark:bg-opacity-40 hover:bg-opacity-50 dark:hover:bg-opacity-50 active:bg-opacity-60 dark:active:bg-opacity-60 transition shadow-lg dark:shadow-lg hover:shadow-xl dark:hover:shadow-xl active:shadow-md dark:active:shadow-md">
                <div class="cot m-5">
                    <h1 class="w-full text-center font-bold text-3xl">
                        {{ t('PageNotFound') }}
                    </h1>
                    <br />
                    <p class="w-full text-left text-lg">
                        <span class="text-xl font-semibold">
                            {{ t('PageNotFoundTips0') }}
                            <br />
                        </span>
                        {{ t('PageNotFoundTips1') }}
                        <br />
                        {{ t('PageNotFoundTips2') }}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    </Paper>
</template>
