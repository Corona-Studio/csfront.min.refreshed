<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import Pressable from '../src/components/Fragments/Pressable.vue';
import Navbar from '../src/components/Navbar.vue';
import Modal from './components/Fragments/Modal.vue';

const { t } = useI18n();

const needWarnCookie = ref(false);
const DateRef = ref(new Date());
const RENDERHEIGHT = ref(0);
const cookieWarn = ref<typeof Modal | null>(null);

const ShutCookieWarningBanner = () => {
    localStorage.readWarnBefore = true;
    cookieWarn.value!.kill();
};

onMounted(() => {
    if (localStorage.readWarnBefore != 'true') {
        needWarnCookie.value! = true;
        cookieWarn.value!.open();
    }
});
</script>

<template>
    <SpeedInsights />
    <div
        class="dark:text-zinc-50 text-zinc-950 bg-transparent transition container min-w-full"
        id="app"
        style="pointer-events: none">
        <Navbar style="pointer-events: fill" />
        <div
            class="w-full shadow-2xl"
            id="RENDER"
            style="z-index: 5; pointer-events: none">
            <!-- <transition name="changing"> -->
            <router-view />
            <!-- </transition> -->
        </div>

        <Modal ref="cookieWarn" position="bottom" :shut-by-ground="false">
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
