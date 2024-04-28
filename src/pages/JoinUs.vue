<script setup lang="ts">
import ContactInfo from '../components/ContactInfo.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import Paper from '../components/Fragments/Paper.vue';
import HelpBlock from '../components/HelpBlock.vue';
import Pressable from '../components/Fragments/Pressable.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

const active = ref('part1');

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
        <div class="container mx-auto px-2.5 py-3 pt-5 mt-3 min-h-screen">
            <div class="mt-12">
                <br />
            </div>
            <div class="grid grid-cols-3 gap-3.5 md:gap-5">
                <div class="doc col-span-full lg:col-span-2">
                    <div
                        class="w-full p-2.5 md:p-3.5 lg:p-5 bg-zinc-200 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg m-1 mb-3.5 shadow-lg">
                        <h1
                            class="text-lg font-semibold title-str md:text-2xl lg:text-4xl xl:text-5xl indent-4 opacity-95">
                            {{ t('joinUs.joindoc') }}
                        </h1>
                    </div>
                    <div
                        class="w-full p-2.5 md:p-3 lg:p-3.5 bg-zinc-200 bg-opacity-50 text-sm md:text-base xl:text-lg dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg m-1 grid grid-cols-2 lg:grid-cols-4 gap-0.5 md:gap-1.5 lg:gap-2.5 xl:gap-3 shadow-lg">
                        <Pressable
                            class="h-full text-center inline-grid justify-center justify-items-center items-center"
                            overclass="text-sm md:text-base xl:text-lg"
                            :no-start-icon="true"
                            :is-func-button="true"
                            @click.native="changeDisplay(1)"
                            :init-opacity="active === 'part1' ? 100 : 10">
                            <p
                                :class="'text-center text-sm md:text-base xl:text-lg  '">
                                {{ t('joinUs.icanclaim') }}
                            </p>
                        </Pressable>
                        <Pressable
                            class="h-full text-center inline-grid justify-center justify-items-center items-center"
                            overclass="text-sm md:text-base xl:text-lg"
                            :no-start-icon="true"
                            :is-func-button="true"
                            @click.native="changeDisplay(2)"
                            :init-opacity="active === 'part2' ? 100 : 10">
                            <p
                                :class="'text-center text-sm md:text-base xl:text-lg  '">
                                {{ t('joinUs.whatweneed') }}
                            </p>
                        </Pressable>
                        <Pressable
                            class="h-full text-center inline-grid justify-center justify-items-center items-center"
                            overclass="text-sm md:text-base xl:text-lg"
                            :no-start-icon="true"
                            :is-func-button="true"
                            @click.native="changeDisplay(3)"
                            :init-opacity="active === 'part3' ? 100 : 10">
                            <p
                                :class="'text-center text-sm md:text-base xl:text-lg  '">
                                {{ t('joinUs.howtojoin') }}
                            </p>
                        </Pressable>
                        <Pressable
                            class="h-full text-center inline-grid justify-center justify-items-center items-center"
                            overclass="text-sm md:text-base xl:text-lg"
                            :no-start-icon="true"
                            :is-func-button="true"
                            @click.native="changeDisplay(4)"
                            :init-opacity="active === 'part4' ? 100 : 10">
                            <p
                                :class="'text-center text-sm md:text-base xl:text-lg  '">
                                {{ t('joinUs.others') }}
                            </p>
                        </Pressable>
                    </div>
                    <!--div class="m-1 p-2.5 lg:p-8 mt-3.5 w-full  bg-zinc-200 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50 rounded-lg shadow-lg">
                    <mt-tab-container v-model="active">
                        <mt-tab-container-item id="part1" v-html="t('joinUs.info1')">
                        </mt-tab-container-item>
                        <mt-tab-container-item id="part2" v-html="t('joinUs.info2')">
                        </mt-tab-container-item>
                        <mt-tab-container-item id="part3" v-html="t('joinUs.info3')">
                        </mt-tab-container-item>
                        <mt-tab-container-item id="part4" v-html="t('joinUs.info4')">
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div-->
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
    font-size: small;
    font-style: italic;
}
</style>
