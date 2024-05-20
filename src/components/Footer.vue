<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { updateCache } from '../utils/cache.ts';
import { baseInvokeHeightFix } from '../utils/viewport.ts';
import Corner from './Feature/Corner.vue';

const { t } = useI18n();

interface FooterWrapIndex {
    index: number;
    name: string;
}

function fixHeight() {
    baseInvokeHeightFix();
}

const footerWrapIndex = ref<FooterWrapIndex[]>([
    { index: 0, name: 'Height Controler' },
    { index: 1, name: `${new Date().getFullYear()}` },
]);

let isRetiehe = false;
onMounted(()=>{
    if(window.location.href.includes('csmin.kami.su')) isRetiehe = true;
})
</script>

<template>
    <div class="footerwrap" style="overflow: hidden; pointer-events: none">
        <div
            class="opacity-95 bottom-0 top-auto mb-0 w-full p-3 bg-transparent left-0 right-0 mx-auto"
            v-for="i of footerWrapIndex"
            :key="i.name"
            :id="`Footer${i.index === 0 ? 'x' : ''}`"
            :style="`z-index: -1;  ${
                i.index === 0
                    ? 'opacity: 0.6 !important; max-width: fit-content; pointer-events: none !important; display: inline-block !important; transform: translateX(-1000rem)!important;'
                    : 'position: fixed !important; pointer-events: visiblefill !important;'
            }`">
            <div class="h-1" v-if="i.index === 0"></div>
            <div
                class="w-full shadow-xl bg-transparent"
                style="height: 1px"></div>
            <div class="pb-1" id="footer-cont">
                <div class="flex pb-1.5" style="font-weight: 500">
                    <div class="grow">
                        <p class="">
                            2016 - {{ i.name }} © Corona Studio |
                            <span
                                style="
                                    font-size: small;
                                    font-style: italic;
                                    font-weight: 390;
                                ">
                                <Corner />
                                {{ t('footer.rightTask') }}
                            </span>
                        </p>
                        <i>
                            <a 
                                class="dark:text-zinc-50 text-zinc-900 opacity-75 hover:opacity-80 active:opacity-95"
                                href="#">
                                <span v-if="!isRetiehe">{{ t('footer.icp1') }}</span>
                                <span v-else>Not Registered</span>
                            </a>
                        </i>
                        <span class="mx-1">|</span>
                        <i>
                            <a
                                class="dark:text-zinc-50 text-zinc-900 opacity-75 hover:opacity-80 active:opacity-95"
                                href="#">
                                <span v-if="!isRetiehe">{{ t('footer.icp2') }}</span>
                                <span v-else> _Preserved</span>
                            </a>
                        </i>
                        <br />
                        <a
                            class="dark:text-zinc-50 text-zinc-900 opacity-75 hover:opacity-80 active:opacity-95"
                            href="https://www.12377.cn"
                            target="_blank">
                            <i
                                style="
                                    text-decoration: underline;
                                    font-size: small;
                                    color: var(--mud-palette-text-primary);
                                ">
                                {{ t('footer.reportToCNGov') }}
                            </i>
                        </a>
                    </div>

                    <span
                        class="text-xs opacity-55 block? mt-0.5 float-right text-right pr-1 hidden"
                        style="
                            line-height: 0.73rem !important;
                            font-size: 0.58rem;
                            height: fit-content;
                            margin-top: auto;
                        ">
                        <span v-html="t('footer.tips1')"></span>
                        <a @click="fixHeight">{{ t('footer.tips2') }}</a>
                        {{ t('footer.tips3').replace('。', '') }}
                        <br />
                        <a
                            class="p-0.5 rounded"
                            id="REFRESH"
                            @click="updateCache"
                            style="font-size: 0.67rem">
                            [{{ t('base.force') }}]
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Footer,
#Footerx {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    z-index: 0;
    transition:
        margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    /* position: relative; */
    box-sizing: border-box;
    width: 100%;
    line-height: 1.2rem !important;
}
#Footer::before {
    display: block;
    position: relative;
    opacity: 0;
    width: 88vw;
}
</style>
