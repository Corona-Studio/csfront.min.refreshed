<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Match } from './plugins/i18n';
import { inject } from '@vercel/analytics';

import Pressable from '../src/components/Fragments/Pressable.vue';
import Navbar from '../src/components/Navbar.vue';
import Modal from './components/Fragments/Modal.vue';

const useSpeedInsight = ref(window.location.host.includes('corona.studio'));

if(useSpeedInsight.value) inject();

// import '/output.css?url';

const { t, locale } = useI18n({ useScope: 'global' });
const needWarnCookie = ref(false);
const cookieWarn = ref<InstanceType<typeof Modal> | null>(null);

const ShutCookieWarningBanner = () => {
    localStorage.readWarnBefore = true;
    cookieWarn.value!.kill();
};

onMounted(() => {
    if (localStorage.readWarnBefore != 'true') {
        needWarnCookie.value! = true;
        cookieWarn.value!.open();
    }
    if (localStorage.lang) {
        locale.value = localStorage.lang;
    } else {
        locale.value = Match(navigator.language);
        localStorage.lang = locale.value;
    }
});
</script>
<style scoped>
#loading-bar-top > div.seed{
    animation: 1.9s ease-in-out infinite lbt;

}
@keyframes lbt {
    0% {
        transform: translateX(-50%);
        opacity: .5;
    }
    40% {
        transform: translateX(400%);
        opacity: .5;
    }

    49%{
        transform: translateX(400%);
        opacity: 0;
    }
    51%{
        transform: translateX(-75%);
        opacity: 0;
    }

    60% {
        transform: translateX(-50%);
        opacity: .5;
    }
    100% {
        transform: translateX(400%);
        opacity: .5;
    }
    /* -- -- -- -- -- */
}
</style>
<template>
    <SpeedInsights v-if="useSpeedInsight" />
    <div id="loading-bar-top" class="hidden fade-in top-0 left-0 right-0 fixed bg-zinc-200 shadow transition bg-opacity-30 opacity-70" style="z-index: 9999;">
        <div class="seed transition-all w-1/4 bg-slate-500 rounded-lg h-1.5"></div>
    </div>
    <div
        class="dark:text-zinc-50 text-zinc-950 bg-transparent transition "
        id="app"
        style="pointer-events: none">
        <Navbar style="pointer-events: fill" />
        <div
            class=" shadow-2xl mx-auto"
            id="RENDER"
            style="z-index: 5; pointer-events: none">
            <!-- <transition name="changing"> -->
            <router-view />
            <!-- </transition> -->
        </div>

        <Modal ref="cookieWarn" position="bottom" :ignoreSafari="true" :shut-by-ground="false">
            <div
                id="cookie-warning"
                :class="`transition ${needWarnCookie ? 'fixed' : 'hidden'} w-full bottom-0 border rounded-t shadow drop-shadow bg-zinc-100 dark:bg-zinc-700`">
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

<style scoped></style>
