<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ListItemPressablePreset from './Feature/ListItemPressablePreset.vue';
import Modal from './Fragments/Modal.vue';
import Pressable from './Fragments/Pressable.vue';

const { t, locale } = useI18n({ useScope: 'global' });

interface NavLink {
    name: string;
    link: string;
    outer: boolean;
}

interface Language {
    name: string;
    method: (lang: 'zh_hans' | 'us_eng' | 'ro_rus') => void;
    code: 'zh_hans' | 'us_eng' | 'ro_rus';
}

const drawerModal = ref<InstanceType<typeof Modal> | null>(null);
const langModal = ref<InstanceType<typeof Modal> | null>(null);
const navLinks = ref<NavLink[]>([
    { name: 'LauncherX', link: '/launcherx', outer: false },
    { name: 'CMF', link: '/cmf', outer: false },
    { name: '@base.kb', link: 'https://kb.corona.studio', outer: true },
    {
        name: '@Navbar.more',
        link: 'https://github.com/corona-studio',
        outer: true,
    },
    // { name: '\ue903 Github', link: 'https://github.com/corona-studio', outer: true },
]);
const langs = ref<Language[]>([
    { name: '汉语', method: changeLang, code: 'zh_hans' },
    { name: 'English', method: changeLang, code: 'us_eng' },
    { name: 'Русский', method: changeLang, code: 'ro_rus' },
]);
const dicon = ref(localStorage.theme == 'dark' ? '\ue708' : '\ue706');

const isSafari = computed(() => {
    return (
        window.navigator.userAgent.toString().includes('afari') &&
        !window.navigator.userAgent.toString().includes('hrome')
    );
});

function switchDrawer() {
    drawerModal.value!.open();
}

function closeDrawer() {
    setTimeout(() => {
        drawerModal.value!.kill();
    }, 100);
}

function switchDark() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'dark';
        dicon.value = '\ue706';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'light';
        dicon.value = '\ue708';
    }

    // const { ctx: _this }: any = getCurrentInstance();
    // _this.$forceUpdate();
}

function invokeChooseLang() {
    langModal.value!.open();
}

function changeLang(lang: string) {
    langModal.value!.kill();
    // i18n.global.locale = lang; FAILURE
    locale.value = lang;
    localStorage.lang = locale.value;
}
</script>

<template>
    <div
        id="Navbar"
        :class="'fixed flex gap-1.5 top-0 w-screen p-2 bg-zinc-200 dark:bg-zinc-800 lg:pr-5 px-1 backdrop-blur-sm rounded-lg rounded-b shadow-md hover:shadow-lg active:shadow rounded-t-none bg-opacity-90 hover:bg-opacity-95 active:bg-opacity-100 z-30 dark:bg-opacity-80 dark:hover:bg-opacity-90 dark:active:bg-opacity-95 transition'"
        style="/* max-height: 54px !important;  */">
        <div
            id="logo"
            :style="`background-image: url('/logo.png')`"
            onclick="window.location.replace('/')"></div>

        <Pressable
            :fin="true"
            :noTense="true"
            :no-start-icon="true"
            :hideMatchedIcon="true"
            v-for="one of navLinks"
            :key="one.name"
            :class="'   hidden lg:inline-block   '"
            init-shadow="false"
            :link="one.link"
            :type="one.outer ? 'outer' : '_'">
            {{
                one.name.includes('@') ? t(one.name.replace('@', '')) : one.name
            }}
        </Pressable>
        <!-- 示范：循环中的翻译插入 -->

        <div class="ml-auto opacity-0 bg-green-950" id="navbar-separator"></div>

        <Pressable
            :no-start-icon="true"
            :no-tense="true"
            :isFuncButton="true"
            :isOnlyIcon="true"
            @click.native="switchDark()"
            :class="'rounded-full use-icon '"
            :initOpacity="0"
            overstyle=" box-shadow: unset !important">
            <span :class="'m-auto w-4 h-4 inline-block navonly'">
                {{ dicon }}
            </span>
        </Pressable>
        <!-- DARK -->
        <Pressable
            :no-start-icon="true"
            :no-tense="true"
            :isFuncButton="true"
            :isOnlyIcon="true"
            @click.native="invokeChooseLang()"
            :class="'rounded-full '"
            :initOpacity="0"
            overstyle=" box-shadow: unset !important">
            <span :class="'m-auto w-4 h-4 inline-block navonly'">&#xe909;</span>
        </Pressable>
        <!-- I18N -->
        <Pressable
            :no-start-icon="true"
            :no-tense="true"
            :isFuncButton="true"
            :isOnlyIcon="true"
            @click.native="switchDrawer()"
            :class="'rounded-full inline-block lg:hidden '"
            :initOpacity="0"
            overstyle=" box-shadow: unset !important">
            <span :class="'m-auto w-4 h-4 inline-block navonly'">&#xe700;</span>
        </Pressable>
        <!-- DRAWER -->

        <!-- EXPLAIN:
            LINKS, BIG BUTTON TO THE MAIN SITE SHOULD BE HIDDEN FOR SMALL SCREENS
            AND THOSE SHOULD BE PUT INSIDE THE DRAWER
            SOME OF THE FUNCTIONAL METHODS NEED TO BE PROVIDED AND INJECTED
        -->
        <Pressable
            :fin="true"
            :no-tense="true"
            :no-start-icon="true"
            link="https://corona.studio"
            type="outer"
            :initOpacity="50"
            :hideMatchedIcon="true"
            :overclass="'bg-'"
            :class="'bg-cosloto dark:bg-cosloto-dark animate-pulse hover:animate-none active:animate-none hidden lg:inline-block'">
            <span class="">MAIN</span>
        </Pressable>

        <Modal
            position="right"
            ref="drawerModal"
            :class="'top-0'"
            :shut-by-ground="true">
            <div
                :class="'p-3 rounded-lg bg-zinc-200 top-0 dark:bg-zinc-800 shadow right-0 min-h-screen bg-opacity-85 dark:bg-opacity-85 backdrop-blur-md'"
                style="min-width: 300px'">
                <p :class="'clear-both p-5 text-xl'">
                    <span class="">{{ t('Navbar.navi') }}</span>
                    <span
                        :class="'-translate-y-0.5 rotate-0 hover:rotate-12 active:rotate-45 transition float-right'"
                        @click="closeDrawer()">
                        &times;
                    </span>
                </p>
                <ul class="w-full">
                    <li class="my-2" v-for="one of navLinks" :key="one.name">
                        <Pressable
                            :class="'block text-lg px-2'"
                            @click.native="closeDrawer()"
                            :link="one.link"
                            :type="one.outer ? 'outer' : '_'"
                            :initOpacity="25">
                            <span :class="'m-1.5 use-icon align-baseline'">
                                {{
                                    one.name.includes('@')
                                        ? `${t(one.name.replace('@', ''))}`
                                        : one.name
                                }}
                            </span>
                        </Pressable>
                        <!-- 示范：循环中的翻译插入 -->
                    </li>
                    <li style="height: auto"></li>
                    <li>
                        <Pressable
                            link="https://corona.studio"
                            type="outer"
                            :initOpacity="50"
                            :no-start-icon="true"
                            :overclass="'bg-'"
                            :class="'bg-cosloto dark:bg-cosloto-dark animate-pulse hover:animate-none  l active:animate-none  mt-auto bottom-0'">
                            <span class="">
                                MAIN
                                <i :class="'hidden mt-auto bottom-0'"></i>
                            </span>
                        </Pressable>
                    </li>
                </ul>
                <p
                    class="m-1"
                    v-if="isSafari"
                    style="
                        text-align: center;
                        bottom: 0;
                        right: 0;
                        position: absolute;
                        width: 97%;
                    ">
                    <span :class="'m-1 p-1'">{{ t('base.modalBugTips') }}</span>
                </p>
            </div>
        </Modal>

        <Modal ref="langModal" :shut-by-ground="true">
            <div
                :class="'p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 shadow hover:shadow-lg mx-auto'">
                <h4 :class="'px-3 mb-2 use-icon text-base lg:text-xl'">
                    &#xf2b7; &nbsp;Choose Language
                </h4>
                <ul :class="'w-full'">
                    <li
                        :class="'my-1.5'"
                        v-for="item of langs"
                        :key="item.name">
                        <ListItemPressablePreset
                            :showComputedIcon="false"
                            :isFuncButton="true"
                            type="bonsai"
                            @click.native="changeLang(item.code)">
                            {{ item.name }}
                        </ListItemPressablePreset>
                    </li>
                </ul>
            </div>
        </Modal>

        <span
            :class="'hidden bg-yellow-500 dark:bg-yellow-600 animate-pulse hover:animate-none active:animate-none bg-opacity-50 dark:bg-opacity-50'">
            <span
                :class="'lg:inline-block rounded-full bg-opacity-0 dark:bg-opacity-0'"></span>
            <span
                :class="'bg-opacity-10 dark:bg-opacity-10 ml-1 lg:hidden lg:text-lg'"></span>
            <span
                :class="'bg-opacity-25 dark:bg-opacity-25 ml-2.5 px-2'"></span>
        </span>
    </div>
</template>

<style scoped>
#logo {
    display: inline-block;
    mix-blend-mode: difference;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 147px;
    height: 39px;
}
.navonly {
    vertical-align: text-top !important;
    user-select: none;
}
</style>
