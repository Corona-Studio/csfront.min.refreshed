<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { ref } from 'vue';
import Navbar from '../src/components/Navbar.vue';
import Pressable from '../src/components/Fragments/Pressable.vue';
import { useI18n } from 'vue-i18n';
import Modal from './components/Fragments/Modal.vue';

const { t } = useI18n();

const needWarnCookie = ref(false);
const DateRef = ref(new Date());
const RENDERHEIGHT = ref(0);
</script>

<template>
    <SpeedInsights />
    <div
        id="app"
        class="dark:text-zinc-50 text-zinc-950 bg-transparent transition container min-w-full"
        style="pointer-events: none">
        <Navbar style="pointer-events: fill" />
        <div
            id="RENDER"
            class="w-full shadow-2xl"
            style="z-index: 5; pointer-events: none">
            <!-- <transition name="changing"> -->
            <router-view />
            <!-- </transition> -->
        </div>

        <Modal ref="cookieWarn" position="bottom">
            <div
                id="cookie-warning"
                :class="`transition ${needWarnCookie ? 'fixed' : 'hidden'} border rounded-t shadow drop-shadow bg-zinc-100 dark:bg-zinc-700`">
                <div class="m-2">
                    <p class="text-sm lg:text-lg mb-1.5 pb-1.5 p-2 use-icon">
                        {{ t('privacy.info') }}
                        <br />
                        // You can use the &#xe909; button to change display
                        language. //
                        <br />
                        <span
                            class="lg:text-xl text-lg"
                            v-html="t('privacy.warning')"></span>
                        <br />
                    </p>
                    <span class="hidden">
                        <span
                            class="font-semibold text-amber-500 text-lg lg:text-2xl">
                            请注意
                        </span>
                        ：您正在访问的是
                        <span class="font-semibold">【最小实现】</span>
                        网站，请访问
                        <a
                            class="text-blue-400 mx-0.5 hover:text-blue-500 active:text-blue-700 transition no-underline hover:underline active:underline"
                            href="https://corona.studio">
                            https://corona.studio
                        </a>
                        获得完整体验。
                    </span>
                    <p
                        class="text-base lg:text-lg mt-1.5 py-3 pt-4 w-full"
                        style="text-align: right; padding: 0.1rem">
                        <Pressable
                            @click.native="ShutCookieWarningBanner()"
                            :is-func-button="true"
                            overclass=" mt-3  block lg:inline-block lg:w-auto text-center text-xl mx-1.5 bg-blue-400 dark:bg-blue-600  "
                            :init-opacity="30">
                            &nbsp;{{ t('privacy.okay') }}
                        </Pressable>
                        <i
                            class="m-1 mt-3 text-xl mx-1.5 hidden lg:w-auto p-1.5 animate-pulse">
                            <div class="lg:inline-block block"></div>
                        </i>
                    </p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
