<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    hidden: boolean;
}>();
</script>

<template>
    <!-- <div class="w-full h-screen"> -->
    <h6
        style="
            font-size: unset;
            text-align: center;
            display: grid;
            z-index: 8;
            position: absolute;
            background-color: transparent !important;
            top: 0;
            width: 100%;
            height: 100vh;
        "
        :class="`${hidden ? ' hidden ' : ' - '}  justify-items-center items-center`">
        <div
            style="--tw-backdrop-blur: blur(1px)"
            class="h-fit  ">
            <div class="lg:inline-block hidden mx-auto px-3 rounded-sm my-auto">
                <h4 class="text-left text-4xl mb-1 -translate-y-2">
                    <span
                        class="rounded-sm title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 bg-zinc-100 dark:bg-zinc-700 px-3">
                        {{ t('index.welcome') }}
                    </span>
                </h4>
                <h1 Class="mt-1 appbar-filter text-7xl opacity-90">
                    <span
                        class="rounded-sm rounded-l title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 bg-zinc-100 dark:bg-zinc-700 px-5"
                        style="font-weight: bolder; mix-blenmode: difference">
                        CORONA
                    </span>
                    <span
                        class="rounded-sm rounded-r title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 dark:bg-zinc-100 bg-zinc-700 text-zinc-100 dark:text-zinc-700 px-2 pr-5">
                        Studio
                    </span>
                </h1>
                <h4 class="text-right text-4xl translate-y-2">
                    <span
                        class="rounded-sm border-t border-zinc-800 inline-block title-effect transition bg-opacity-70 dark:bg-opacity-80 dark:opacity-80 opacity-80 dark:bg-zinc-100 bg-zinc-700 text-zinc-100 dark:text-zinc-700 px-1 py-1.5">
                        {{ t('index.welcomeTail') }}
                    </span>
                </h4>
            </div>
            <!-- 懒得转写为那种超级清爽的tw类了 -->
            <div class="lg:hidden inline-block mx-auto px-3 my-auto">
                <h5 class="text-lg -translate-y-1 text-left">
                    <span
                        class="title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 bg-zinc-100 dark:bg-zinc-700 px-2">
                        {{ t('index.welcome') }}
                    </span>
                </h5>
                <h3 class="text-5xl text-left">
                    <span
                        class="title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 bg-zinc-100 dark:bg-zinc-700 px-2 pr-5"
                        style="font-weight: bolder; mix-blenmode: difference">
                        CORONA
                    </span>
                </h3>
                <h3 class="text-4xl translate-y-2 text-left">
                    <span
                        class="translate-y-1.5 title-effect transition bg-opacity-80 dark:bg-opacity-80 dark:opacity-80 opacity-90 dark:bg-zinc-100 bg-zinc-700 text-zinc-100 dark:text-zinc-700 px-2 pr-5">
                        Studio
                    </span>
                </h3>
                <h5 class="text-xl translate-y-2.5 text-left">
                    <span
                        class="border-t border-zinc-600 inline-block title-effect transition bg-opacity-70 dark:bg-opacity-80 dark:opacity-80 opacity-80 dark:bg-zinc-100 bg-zinc-700 text-zinc-100 dark:text-zinc-700 px-2">
                        {{ t('index.welcomeTail') }}
                    </span>
                </h5>
            </div>

            <p class="mt-10 lg:mt-20 text-md lg:text-xl transition">
                <span
                    class="inline-block backdrop-blur-md p-2 py-2.5 align-middle rounded-lg bg-slate-50 dark:bg-zinc-800 bg-opacity-40 dark:bg-opacity-40 dark:text-slate-100 text-gray-700">
                    <div
                        class="flex flex-wrap gap-1 mb-1 mt-0.5 translate-y-1"
                        style="--tw-translate-y: 0.0691rem">
                        <span class="mr-1 ml-0.5 block ?translate-y-0.5">
                            {{ t('index.slogan') }}
                        </span>
                        <span class="block">
                            <router-link
                                class=""
                                style="width: 100%; height: 100%"
                                to="/about">
                                <span
                                    class="rounded-lg transition font-sans font-semibold bg-yellow-500 dark:bg-yellow-600 bg-opacity-30 dark:bg-opacity-30 hover:bg-opacity-60 dark:hover:bg-opacity-60 active:bg-opacity-80 dark:active:bg-opacity-80 py-2 px-3">
                                    {{ t('index.intro') }}
                                    <span
                                        style="--tw-translate-y: -0.121rem"
                                        class="-translate-y-0.5 inline-block">
                                        &RightAngleBracket;
                                    </span>
                                </span>
                            </router-link>
                        </span>
                    </div>
                </span>
            </p>
        </div>
    </h6>

    <!-- 上：标准的title显示； 下：小屏title显示 -->

    <!-- </div> -->
</template>

<style scoped>
.title-effect {
    user-select: none;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
}

.subtitle-effect {
    user-select: none;
    backdrop-filter: blur(12px) !important;
}

.home-wrap {
    padding-right: 10em;
    padding-left: 10em;
}
</style>
