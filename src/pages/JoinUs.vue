<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ContactInfo from '../components/ContactInfo.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import Paper from '../components/Fragments/Paper.vue';
import Pressable from '../components/Fragments/Pressable.vue';
import HelpBlock from '../components/HelpBlock.vue';

const { t } = useI18n();

const active = ref('part1');

const conts = [
    {
        id: 1,
        translate: 'joinUs.icanclaim',
        content: 'joinUs.info1',
    },
    {
        id: 2,
        translate: 'joinUs.whoweneed',
        content: 'joinUs.info2',
    },
    {
        id: 3,
        translate: 'joinUs.howtojoin',
        content: 'joinUs.info3',
    },
    {
        id: 4,
        translate: 'joinUs.others',
        content: 'joinUs.info4',
    },
];

function changeDisplay(inte: number) {
    active.value = active.value.replace(
        active.value.substring(4, 5),
        `${inte}`,
    );
}
</script>

<template>
    <Paper
        :preset-padding="true"
        :fix="true"
        :no-top-wrap="true"
        :no-height-wrap="true">
        <PageTitle>{{ t('joinUs.joinUs') }}</PageTitle>
        <div class="container mx-auto px-2.5 py-3 pt-8 min-h-screen">
            <div class="mt-12">
                <br />
            </div>
            <div class="grid grid-cols-3 gap-3.5 md:gap-5">
                <div class="doc col-span-full lg:col-span-2 p-1">
                    <div
                        class="w-full p-2.5 md:p-3.5 lg:p-5 bg-zinc-200 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg mb-3.5 shadow-lg">
                        <h1
                            class="text-lg font-semibold title-str md:text-2xl lg:text-4xl xl:text-5xl indent-4 opacity-95">
                            {{ t('joinUs.joindoc') }}
                        </h1>
                    </div>
                    <div
                        class="w-full p-2.5 md:p-3 lg:p-3.5 bg-zinc-200 bg-opacity-50 text-sm md:text-base xl:text-lg dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg grid grid-cols-2 xl:grid-cols-4 gap-0.5 md:gap-1.5 lg:gap-2.5 xl:gap-3 shadow-lg">
                        <Pressable
                            class="h-full text-center inline-grid justify-center justify-items-center items-center"
                            v-for="v of conts"
                            :key="v.id"
                            overclass="text-sm md:text-base xl:text-lg"
                            :no-start-icon="true"
                            :is-func-button="true"
                            :fin="true"
                            @click.native="changeDisplay(v.id)"
                            :init-opacity="active === `part${v.id}` ? 100 : 10">
                            <span
                                class="text-center text-sm md:text-base xl:text-lg m-1">
                                {{ t(v.translate) }}
                            </span>
                        </Pressable>
                    </div>
                    <div
                        class="m-1 p-2.5 lg:p-8 mt-3.5 w-full bg-zinc-200 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg shadow-lg">
                        <div
                            v-for="inf of conts"
                            :id="`${inf.id}`"
                            v-html="t(inf.content)"
                            :class="
                                active.includes(`${inf.id}`) ? '' : 'hidden'
                            "></div>

                        <!--<mt-tab-container v-model="active">
                            <mt-tab-container-item id="part1" v-html="t('joinUs.info1')">
                            </mt-tab-container-item>
                            <mt-tab-container-item id="part2" v-html="t('joinUs.info2')">
                            </mt-tab-container-item>
                            <mt-tab-container-item id="part3" v-html="t('joinUs.info3')">
                            </mt-tab-container-item>
                            <mt-tab-container-item id="part4" v-html="t('joinUs.info4')">
                            </mt-tab-container-item>
                        </mt-tab-container>-->
                    </div>
                </div>
                <div class="contact else lg:col-span-1 col-span-full">
                    <ContactInfo only="!bilibili,kook,ca,minebbs,newbee" />
                    <br />
                    <HelpBlock main="https://corona.studio/join"></HelpBlock>
                </div>
            </div>
            <div class="mt-12">
                <br />
            </div>
        </div>
    </Paper>
</template>

<style scoped>
i {
    font-style: italic;
    font-size: small;
}
</style>
