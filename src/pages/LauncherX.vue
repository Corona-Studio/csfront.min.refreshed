<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ContactInfo from '../components/ContactInfo.vue';
import Corner from '../components/Feature/Corner.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import FailureComponent from '../components/FailureComponent.vue'
import Paper from '../components/Fragments/Paper.vue';
import Pressable from '../components/Fragments/Pressable.vue';
import { doScroll } from '../utils/scroll.ts';
import LoadingRing from '../components/LoadingRing.vue';
import { csBackend, csBackendUrl } from '../axiosClient.ts';
import { AxiosResponse } from 'axios';

const { t } = useI18n();

interface ResultBuildInfo {
    build: string;
    date: string;
    link: string;
    name: string;
    sort: number;
    match: boolean;
}

// const lastUpdate = ref(1710209344927);
const buildId = ref(20240311);
const loadingText = ref('');
const buildHint = ref('');
const isLoading = ref(true);
const isFailed = ref(false);
const isTrackingTimeout = ref(false);
const platform = ref('');
const downloads = ref<ResultBuildInfo[]>([]);
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

interface LauncherBuildInfo {
    name: string;
    framework: string;
    runtime: string;
}

interface LauncherRawBuildModel {
    id: string;
    branch: string;
    channel: number;
    releaseDate: string;
    releaseNote: string;
    fileHash: string;

    isHotFix: boolean;
    isApproved: boolean;
    isReviewed: boolean;
    isR2R: boolean;

    framework: string;
    runtime: string;
}

const allBuilds: LauncherBuildInfo[] = [
    {
        name: 'Windows X64',
        framework: 'net9.0-windows',
        runtime: 'win-x64',
    },
    {
        name: 'macOS Intel',
        framework: 'net9.0-osx',
        runtime: 'osx-x64',
    },
    {
        name: 'Linux X64',
        framework: 'net9.0-linux',
        runtime: 'linux-x64',
    },

    {
        name: 'Windows Arm',
        framework: 'net9.0-windows',
        runtime: 'win-arm64',
    },
    {
        name: 'macOS Apple',
        framework: 'net9.0-osx',
        runtime: 'osx-arm64',
    },
    {
        name: 'Linux Arm',
        framework: 'net9.0-linux',
        runtime: 'linux-arm64',
    },
];

function announceFailedToLoad(){
    console.log('failed');
    isLoading.value = false;
    isFailed.value = true;
}

async function singleFetch(build: LauncherBuildInfo) {
        const endPoint = `/Build/get/${build.framework}/${build.runtime}/latest/stable`;
        let happenedEx = false;
        console.log(endPoint);
        builds.value = await csBackend.get<LauncherRawBuildModel[]>(endPoint)
        .catch(ex => {
            console.log(`${ex} xxx`);
            happenedEx = true;
        });
        if(happenedEx) return null;
        try {
            if ((builds.value as AxiosResponse<LauncherRawBuildModel[]>).status !== 200) return null; //continue;
            if (!(builds.value as AxiosResponse<LauncherRawBuildModel[]>).data || 
            (builds.value as AxiosResponse<LauncherRawBuildModel[]>).data.length === 0) return null; // continue;

            const latestBuild = (builds.value as AxiosResponse<LauncherRawBuildModel[]>).data[0];
            const displayModel: ResultBuildInfo = {
                build: build.runtime,
                date: latestBuild.releaseDate,
                link: `${csBackendUrl}/Build/get/${latestBuild.id}/1`,
                name: build.name,
                sort: getSort(build.runtime),
                match: isMatch(build.runtime),
            };

            return displayModel;
        } catch (ex) {
            return null;
        }
    
}

function isMatch(x: string){
    if(x == '') return false
    else if( platform.value.includes('mac') && platform.value.includes('macapple') && x == 'osx-arm64') return true;
    else if( platform.value.includes('mac') && platform.value.includes('intel') && x == 'osx-x64') return true;
    else if( platform.value.includes('windows') && platform.value.includes('arm') && x == 'win-arm64') return true;
    else if( platform.value.includes('win64') && platform.value.includes('x64') && x == 'win-x64') return true;
    else if( platform.value.includes('linux') && platform.value.includes('arm') && x == 'linux-arm64') return true;
    else if( platform.value.includes('linux') && (platform.value.includes('x64') || platform.value.includes('x86') || platform.value.includes('amd64')) && x == 'linux-x64') return true;
    else return false;
}

function getSort(x: string){
    switch(x.toLowerCase()){
        case 'osx-x64':
            return 1;
        case 'osx-arm64':
            return 4;
        case 'linux-x64':
            return 2;
        case 'linux-arm64':
            return 5;   
        case 'win-x64':
            return 0;
        case 'win-arm64':
            return 3;
        default: 
            console.log(`not found sorting: ${x}`);
            return -1;
    }
}

let builds = ref<void | AxiosResponse<LauncherRawBuildModel[], any> | null>(),
    tmp: any = [];

async function fetchBuilds(type: string = ''){
    console.log('start fetch: ' + type);
    if (isLoading.value){
        tmp = [];
        for (const build of allBuilds){
            new Promise(async () => {tmp.push((await singleFetch(build)) ?? null!); checkTasks();})                
        }

    }
}

function checkTasks(){
    console.log(`check tasks: ${tmp}`)
    if(tmp.length != 6) return;
    let needRetry = false;

    for(let sig of tmp){
        if(sig == null) {
            needRetry = true;
            break;
        }
    }
    if(needRetry){
        console.log('going to retry in 15s')
        setTimeout(() => {
            new Promise(async () => { await fetchBuilds('promised need to retry'); });
        }, 15000);
    }
    else {
        console.log('giving')
        downloads.value! = tmp.sort((a:ResultBuildInfo, b: ResultBuildInfo) => {
            // console.log(`s: ${a.sort}, ${b.sort}`)
            if(a.sort > b.sort) return 1;
            else if (a.sort < b.sort) return -1;
            else return 0;
        });
        isLoading.value = false;
    }
}

function runLinkFilter(link: string, custom?: string){
    let _tmp = link.replace(
        '%build%',
        buildId.toString()
    );
    if(_tmp.includes('/1')) _tmp = _tmp.substring(0, _tmp.length - 1);

    return `${_tmp}${custom}`;
}

onMounted(async () => {
    platform.value = `${window.navigator.vendor}&&&${window.navigator.userAgent}&&&${window.navigator.platform}&&&${window.navigator.appVersion}`.toLowerCase();
    if(platform.value.includes('windows')) buildHint.value = t('LauncherX.toWinUsers');
    else if(platform.value.includes('macintosh')) buildHint.value = t('LauncherX.toMacUsers');
    else buildHint.value = t('LauncherX.toLinuxUsers');
    console.clear();
    doScroll('lxb', false);
    new Promise((_) => {
        loadingText.value = t('base.loading');
        setTimeout(() => {
            loadingText.value = t('base.stillLoading');
        }, 18000);
    });
    new Promise((_) => {
        if(!isTrackingTimeout.value){
            isTrackingTimeout.value = true;
            setTimeout(() => {
                if(isLoading.value && !isFailed.value) announceFailedToLoad();
            }, 39000);
        }
    });
    await fetchBuilds();
    console.log(platform.value);
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
            class="w-full flex min-h-screen justify-items-center justify-center items-center pt-9 sm:pt-6 md:pt-3 lg:pt-0.5"
            id="lxb"
            :style="''">
            <!--`background: url('/img/lx-banner.png')`  -->
            <h5
                class="text-5xl lg:text-7xl w-full h-max text-center flex justify-items-center items-center justify-center mt-5">
                <p class="p-3 sm:p-5 md:p-9">
                    <span class="w-full translate-y-3">
                        <br>
                        <span
                            class="font-semibold font-sans opacity-75 text-5xl lg:text-6xl text-black dark:text-zinc-50">
                            Launcher
                        </span>
                        <span
                            class="font-extrabold scale-100 lg:scale-95 x text-5xl lg:text-7xl mx-0 sm:mx-1 lg:mx-0.5 opacity-100 ?align-middle">
                            X
                        </span>
                        <span class="text-sm mb-1"><br /></span>
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

                    <span
                        class="text-xl w-full -translate-y-3">
                        <div class="mt-3.5 w-full container">
                            <div class="grid grid-cols-3 gap-0">
                                <p class="col-span-full text-center mb-2">
                                    <span class="font-bold">
                                        {{ t('LauncherX.nowDownload') }}
                                    </span>
                                    <br />
                                    <span
                                        class="-translate-y-1.5 use-icon force-icomoon-only text-xs font-thin opacity-60">
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
                                        <span class="text-sm font-semibold" v-html="t('LauncherX.buildTips')"></span>
                                    </span>
                                    
                                </p>
                                <div class="grid grid-rows-2 grid-cols-3 gap-0 col-span-full fade-in" v-if="!isLoading && !isFailed">
                                    <Pressable
                                        :hide-matched-icon="true"
                                        :no-start-icon="true"
                                        v-for="down of downloads"
                                        :key="down.build"
                                        :class="`py-2 my-1 text-sm  ${down.match ? 'shining-eternal' : ''}`"
                                        :type="`download:LauncherX-${down.build}@${down.build}.zip`"
                                        :link="
                                            runLinkFilter(down.link, `download:LauncherX-${down.build}@${down.build}.zip`)
                                        ">
                                        {{ down.name }}
                                    </Pressable>
                                    <p class="col-span-full text-xs opacity-35"
                                    style="font-size: 0.6rem">
                                        LastUpdate: {{ downloads ? downloads[0].date : '-' }}
                                    </p>
                                    <span class="text-sm block col-span-full mt-1 text-left opacity-80" v-html="buildHint"></span>
                                </div>
                                <div v-if="isLoading && !isFailed" class="grid justify-items-center scale-95 justify-center items-center col-span-full">
                                    <div class="">
                                        <LoadingRing
                                            class="text-xl w-fit inline-block "
                                            ></LoadingRing>
                                        <span class="inline-block mx-auto -translate-y-2.5 text-sm">
                                            {{ loadingText }}
                                        </span>
                                    </div>
                                </div>         
                                <div class="col-span-full scale-95" v-if="isFailed">
                                    <FailureComponent  class="" />  
                                    <p class="text-sm mt-1">
                                        {{ t("LauncherX.failedHint1") }}
                                        <a href="https://v2.csmin.kami.su/products/lx/LauncherX_20240311_net8.0-windows_win-x64.zip" download="LauncherX.Avalonia.x64.zip" class="a">
                                            <span v-html="t('LauncherX.failedHint2')"></span>
                                        </a>
                                        <span v-html="t('LauncherX.failedHint3')"></span>
                                        
                                    </p>
                                </div>                     
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
                                    :overclass="'text-xs sm:text-sm md:text-base lg:text-base xl:text-base   py-2'">
                                    {{ link.title }}
                                </Pressable>

                                <div class="col-span-full mt-0.5">
                                    <ContactInfo only="!lx1" head="false" />
                                </div>
                                <br>
                            </div>
                        </div>
                    </span>
                    
                    <i
                        class="hidden my-1 text-xs sm:text-sm md:text-base lg:text-base xl:text-base "></i>
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
