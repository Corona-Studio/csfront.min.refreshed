<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue'
  import {useI18n} from "vue-i18n";
  import Corner from '../components/Feature/Corner.vue';
  import PageTitle from '../components/Feature/PageTitle.vue';
  import Paper from '../components/Fragments/Paper.vue';
  import HelpBlock from '../components/HelpBlock.vue';
  import LoadingRing from '../components/LoadingRing.vue';
  import ServerItem from '../components/ServerItem.vue';
  import {baseInvokeHeightFix} from "../utils/viewport.ts";
  import {doScroll} from "../utils/scroll.ts";
  import {ContentList, ProvidedInfo} from "../models/server.ts";
  import axios from 'axios';

  function toCmfs() {
    doScroll('CMFS')
  }
  function toTips() {
    doScroll('TipsCMFS')
  }

  const {t} = useI18n();

  const serverList = ref<ContentList[] | null>();

  onMounted(async () => {
      const serverInfo = await axios.get<ProvidedInfo>(window.location.host.includes('corona.studio') ? '/provide/cmfs.json' : 'https://min.corona.studio/provide/cmfs.json');

      if (serverInfo.status !== 200 ||
          !serverInfo.data ||
          serverInfo.data.contentList.length === 0){
          serverList.value = null;
          baseInvokeHeightFix();
          return;
      }

      setTimeout(() => {
        serverList.value = serverInfo.data.contentList;
        baseInvokeHeightFix();
      }, 1234);
      baseInvokeHeightFix();
  });

  watch(serverList, _ => {
    setTimeout(() => {
      console.log('invoking after huge content change')
      baseInvokeHeightFix();
    }, 789);
  });
</script>

<template>
<Paper :fix="true" :no-top-wrap="true" :no-height-wrap="true" :preset-padding="true">
    <PageTitle>
        CMF-CoronaStudio
    </PageTitle>
    <div id="CMFTOP" class="? pt-3.5 container?  mx-auto grid justify-center justify-items-center items-center p-1.5 lg:p-3 w-11/12 sm:w-5/6 lg:w-9/12">
        <p>
            <img src="/img/icons/cmflogo.webp" alt="" class="mx-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6  mt-12 fade-in " > <br>
            <h1 class="text-3xl font-semibold text-yellow-500">{{ t('cmf.begin') }}</h1>
            <h5 class="text-lg">
                {{ t('cmf.intro1') }}
                <Corner :reverse="true" />
                {{ t('cmf.intro2') }}<a class="a" href="/lx">LauncherX</a>{{ t('cmf.intro3') }}<a class="a" @click="toCmfs()">CMFS</a>{{ t('cmf.intro4') }}
                <br>
            </h5>
            <Corner />
            <Corner />
            <h2 class="mt-8 text-2xl font-semibold text-yellow-500">{{ t('cmf.joinCMFSServer') }}</h2>
            <h5 class="lg:text-lg font-serif text-base" style="font-family: 'fluent-icon';">
                {{ t('cmf.linkIntro1') }} &#xe8c8; {{ t('cmf.linkIntro2') }} &#xe71b; {{ t('cmf.linkIntro3') }} <span class=" font-semibold font-sans">?</span> {{ t('cmf.linkIntro4') }}
            </h5>

        </p>
        <div class="w-judge mx-auto bg-zinc-200 dark:bg-zinc-800 bg-opacity-80 dark:bg-opacity-80 mt-3 rounded-lg transition p-1.5 lg:p-3 xl:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-3.5 xl:gap-5" id="CMFS">
            <h6 v-if="!serverList" class="grid justify-items-center justify-center items-center col-span-full text-center text-xl p-3 m-1" >
              <div class="">
                    <LoadingRing
                        class="text-xl w-fit inline-block "
                        ></LoadingRing>
                    <span class="inline-block mx-auto -translate-y-2.5 text-sm">{{t('base.loading')}}</span>
              </div> 
            </h6>
            <ServerItem v-for="item of serverList" :key="item.name" :server="item" class="m-1? fade-in" />
        </div>
        <div class="">
            <h2 class="text-2xl font-semibold text-yellow-500 mt-5 text-center mb-1.5">{{ t('cmf.cmfl') }}</h2>
            <p class="text-lg mb-3">
                {{ t('cmf.cmflDetail') }} 
                <a @click="toTips()" class=" font-semibold">{{ t('cmf.cmflDetailEx') }}<sup>?</sup></a>{{ t('base.period') }}
                <span class=" no-underline hover:underline active:underline x font-semibold opacity-75 hover:opacity-100 active:opacity-80 transition">
                    <router-link to="/lx">{{ t('cmf.toLx') }}</router-link>
                </span>
            </p>
        </div>
        <h2 class="text-2xl font-semibold text-yellow-500 mt-6 text-center mb-0.5 ">...</h2>
        <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-2.5 mt-3.5 w-full " >
            <div id="TipsCMFS" class="rounded-lg bg-zinc-500 bg-opacity-5 p-3 m-1  w-full shadow-lg col-span-full md:col-span-3 lg:col-span-2">
                <h5 class="text-xl">Tips</h5>
                <!-- <Corner /> -->
                <h6 class="pl-3 mt-1">{{ t('base.status') }}</h6>
                <p class="pl-5 opacity-60 bg-opacity-15">
                    {{ t('cmf.statusIntro1') }}<br>
                    {{ t('cmf.statusIntro2') }}<br>
                    {{ t('cmf.statusIntro3') }}<br>
                    {{ t('cmf.statusIntro4') }}<br>
                    {{ t('cmf.statusIntro5') }}<br>
                    {{ t('cmf.statusIntro6') }}<br>
                    {{ t('cmf.statusIntro7') }}<br>
                    {{ t('cmf.statusIntro8') }}<br>
                </p>
                <h6 class="pl-3 mt-1">CMFL</h6>
                <p class="pl-5 opacity-60 bg-opacity-15">
                    {{ t('cmf.cmflTips') }}
                </p>
            </div>

            <HelpBlock class="col-span-full md:col-span-2 lg:col-span-1" main="https://corona.studio/cmf" />

        </div>
    </div>
    <br>
    <br>
</Paper>
</template>
<style scoped>

</style>