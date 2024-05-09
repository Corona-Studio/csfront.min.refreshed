<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ContactInfo from '../components/ContactInfo.vue';
import Corner from '../components/Feature/Corner.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import Paper from '../components/Fragments/Paper.vue';
import Pressable from '../components/Fragments/Pressable.vue';
import { doScroll } from '../utils/scroll.ts';

const { t } = useI18n();

const lastUpdate = ref(1710209344927);
const buildId = ref(20240311);
const downloads = ref([
    {
        build: 'win-x64',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-windows_win-x64.zip`,
        name: 'Windows x64',
    },
    // {build: 'mac-x64', date: '2024/3/11', link: `/products/lx/LauncherX_%build%_net8.0-osx_osx-x64.zip`, name: 'macOS-Intel'},
    {
        build: 'mac-x64',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-osx_osx-x64.dmg`,
        name: 'macOS Intel',
    },
    {
        build: 'lin-x64',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-linux_linux-x64.zip`,
        name: 'Linux amd64',
    },

    {
        build: 'win-arm',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-windows_win-arm64.zip`,
        name: 'Windows ARM',
    },
    // {build: 'mac-arm', date: '2024/3/11', link: `/products/lx/LauncherX_%build%_net8.0-osx_osx-arm64.zip`, name: 'macOS-Apple'},
    {
        build: 'mac-arm',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-osx_osx-arm64.dmg`,
        name: 'macOS Apple',
    },
    {
        build: 'lin-arm',
        date: '2024/3/11',
        link: `/products/lx/LauncherX_%build%_net8.0-linux_linux-arm64.zip`,
        name: 'Linux Aarch',
    },
]);
const links = ref([
    {
        title: `${t('LauncherX.cskbButton')}`,
        link: 'https://kb.corona.studio/zhCN/lxguide/startup/',
    },
    {
        title: `${t('LauncherX.mainIntro')}`,
        link: 'https://corona.studio/launcherx',
    },
    { title: `${t('LauncherX.advert')}`, link: t('LauncherX.advertLink') }, //link: 'https://www.mcbbs.net/forum.php?mod=viewthread&tid=1475741'}
]);

onMounted(() => {
    doScroll('lxb', false);
});
</script>

<template>
    <Paper
        :no-top-wrap="true"
        :no-height-wrap="true"
        :preset-padding="true"
        start="lxb"
        :preset-width="false">
        <PageTitle>LauncherX-CoronaStudio.min</PageTitle>
        <div
            class="w-full flex min-h-screen justify-items-center justify-center items-center mt-9 sm:mt-6 md:mt-3 lg:mt-0.5"
            id="lxb"
            :style="''">
            <!--`background: url('/img/lx-banner.png')`  -->
            <h5
                class="text-5xl lg:text-7xl w-full h-max text-center flex justify-items-center items-center justify-center mt-5">
                <p class="p-9">
                    <span class="w-full translate-y-3">
                        <span
                            class="font-semibold font-sans opacity-75 text-5xl lg:text-7xl text-black dark:text-zinc-50">
                            Launcher
                        </span>
                        <span
                            class="font-extrabold x text-6xl lg:text-8xl mx-1 lg:mx-0.5 opacity-100 align-middle">
                            X
                        </span>
                        <span class="text-sm"><br /></span>
                        <p class="text-lg closer">
                            <span v-html="t('LauncherX.intro')"></span>
                            <Corner />
                            <span
                                class="no-underline hover:underline active:underline x font-semibold opacity-75 hover:opacity-100 active:opacity-80 transition">
                                <!-- <router-link to="/projbobcat">
                                    ProjBobcat 纪念被llr残害的ProjBobcat页面
                                </router-link> -->
                                <a
                                    href="https://github.com/corona-studio/projbobcat"
                                    target="_blank">
                                    ProjBobcat
                                </a>
                            </span>
                        </p>
                    </span>

                    <span class="text-xl w-full -translate-y-3">
                        <div class="mt-3.5 w-full container">
                            <div class="grid grid-cols-3 gap-0">
                                <p class="col-span-full text-center mb-2">
                                    <span class="font-bold">
                                        {{ t('LauncherX.nowDownload') }}
                                    </span>
                                    <br />
                                    <span
                                        class="-translate-y-1.5 use-icon text-xs font-thin opacity-60">
                                        &#xeac2; &nbsp; &#xeabf; &nbsp; &#xeabd;
                                    </span>
                                    <br />
                                    <span
                                        class="text-sm mb-1.5 opacity-85 block exsm">
                                        {{ t('LauncherX.downIntro1') }}
                                        <br />
                                        <a
                                            class="text-blue-400 mx-0.5 hover:text-blue-500 active:text-blue-700 transition no-underline hover:underline active:underline"
                                            href="https://corona.studio/launcherx">
                                            {{ t('LauncherX.downIntro2') }}
                                        </a>
                                        <span
                                            v-html="
                                                t('LauncherX.downIntro3')
                                            "></span>
                                        <span class="font-semibold">
                                            {{ t('LauncherX.downIntro5') }}
                                        </span>
                                    </span>
                                </p>
                                <Pressable
                                    :hide-matched-icon="true"
                                    :no-start-icon="true"
                                    v-for="down of downloads"
                                    :key="down.build"
                                    :overclass="'py-2 my-1 '"
                                    :type="`download:${down.link.replace('/products/lx/', '').replace('net8.0-', '').replace('%build%', buildId.toString())}`"
                                    :link="
                                        '%origin%' +
                                        down.link.replace(
                                            '%build%',
                                            buildId.toString(),
                                        )
                                    ">
                                    {{ down.name }}
                                </Pressable>
                                <p
                                    class="col-span-full text-xs opacity-35"
                                    style="font-size: 0.6rem">
                                    Last update:
                                    {{
                                        new Date(
                                            lastUpdate,
                                        ).toLocaleDateString()
                                    }}
                                </p>
                                <!-- download sample -->
                                <p
                                    class="col-span-full text-center mb-2 mt-6 font-bold">
                                    {{ t('LauncherX.knowLauncherX') }}
                                </p>
                                <Pressable
                                    class="h-full"
                                    :no-start-icon="true"
                                    :hide-matched-icon="true"
                                    v-for="link of links"
                                    :key="link.title"
                                    type="outer"
                                    :link="link.link"
                                    :overclass="'text-xs sm:text-sm md:text-base lg:text-base xl:text-base max-xl:text-lg  py-2'">
                                    {{ link.title }}
                                </Pressable>

                                <div class="col-span-full mt-0.5">
                                    <ContactInfo only="!lx1" head="false" />
                                </div>
                            </div>
                        </div>
                    </span>
                    <i
                        class="hidden my-1 text-xs sm:text-sm md:text-base lg:text-base xl:text-base max-xl:text-lg"></i>
                </p>
            </h5>
            <br />
        </div>
    </Paper>
</template>

<style scoped>
#lxb {
    backdrop-filter: blur(1px);
    background-position: center !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-clip: content-box !important;
}
.backoff {
    backdrop-filter: blur(30px);
    text-shadow: 3px 4px 5px rgba(85, 70, 70, 0.319);
}
.closer {
    line-height: 1.5rem !important;
}
.exsm {
    font-size: 0.79rem;
    line-height: 0.97rem !important;
}
</style>
