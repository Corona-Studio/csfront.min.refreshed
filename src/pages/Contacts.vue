<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import ContactInfo from '../components/ContactInfo.vue';
import ListItemPressablePreset from '../components/Feature/ListItemPressablePreset.vue';
import PageTitle from '../components/Feature/PageTitle.vue';
import Paper from '../components/Fragments/Paper.vue';
import TipBlock from '../components/Fragments/TipBlock.vue';
import HelpBlock from '../components/HelpBlock.vue';

const { t } = useI18n();
</script>

<template>
    <Paper
        :fix="true"
        :no-top-wrap="true"
        :no-height-wrap="true"
        :preset-padding="true">
        <PageTitle>{{ t('contacts.pageTitle') }}-CoronaStudio.min</PageTitle>
        <div
            class="p-2.5 container w-full mx-auto pt-5 px-5"
            style="min-height: 100vh">
            <div class="mt-12">
                <br />
            </div>
            <h1
                class="title-str text-3xl lg:text-5xl indent-3 font-semibold mx-auto">
                {{ t('contacts.pageTitle') }}
            </h1>
            <!-- -->
            <div
                class="mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-1.5 my-5 justify-center justify-items-center ms-center">
                <div class="main-conts col-span-full md:col-span-3 w-full">
                    <div
                        class="bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 dark:bg-zinc-800 rounded-lg p-3 m-1 mb-2.5">
                        <h5 v-html="t('contacts.mainDescriptionHTML')"></h5>
                    </div>
                    <ContactInfo only="all" />
                </div>
                <div class="col-span-1 md:col-span-1 w-full">
                    <HelpBlock main="https://corona.studio/contacts">
                        <li>
                            <ListItemPressablePreset
                                type="outer-link"
                                link="/jump/cskb+contacts"
                                :show-computed-icon="false"
                                :is-verified="true">
                                CSKB
                            </ListItemPressablePreset>
                        </li>
                    </HelpBlock>
                    <TipBlock>
                        <span v-html="t('tips.contactsPage')"></span>
                    </TipBlock>
                </div>
            </div>
        </div>
    </Paper>
</template>

<style scoped>
li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
</style>
