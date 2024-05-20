<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Pressable from './Fragments/Pressable.vue';
import ListItemPressablePreset from './Feature/ListItemPressablePreset.vue';

const { t } = useI18n();

const clist = ref<HTMLElement | null>(null);
const evenmore = ref<HTMLElement | null>(null);
const hrformore = ref<HTMLElement | null>(null);

const hide = ref('hidden');

const props = defineProps<{
    only?: string;
    head?: string;
    titled?: string;
    titleClass?: string;
    sub?: string;
    noShadow?: boolean;
}>();

onMounted(() => {
    if (!clist.value) return;
    if (!hrformore.value) return;
    if (!evenmore.value) return;

    if ((props.only ?? 'all') == 'all') {
        for (let item of clist.value.children) item.classList.remove('hidden');
        evenmore.value.classList.add('hidden');
        hrformore.value.classList.add('hidden');
    } else if (props.only?.includes('!') ?? false) {
        for (let it of props.only!.replaceAll('!', '').split(','))
            document
                .getElementById(
                    `contact-${it.replaceAll(' ', '').replaceAll('!', '')}`,
                )!
                .classList.remove('hidden');
    } else {
        if (props.only?.includes('#') ?? false) {
            for (let oo of document.getElementsByClassName('contact-divider')) {
                oo.classList.remove('hidden');
            }
        }

        if (!(props.only?.includes(',') ?? false)) {
            if (!(props.only?.includes('@') ?? false))
                document
                    .getElementById(`contact-${props.only!.replace('#', '')}`)!
                    .classList.remove('hidden');
        } else {
            for (let it of props.only?.split(',') ?? [])
                document
                    .getElementById(`contact-${it.replaceAll(' ', '')}`)!
                    .classList.remove('hidden');
        }

        if (props.only?.includes('@showmoreplats') ?? false) {
            if (!(props.only?.includes('@onlymoreplats') ?? false))
                for (let item of clist.value.children)
                    item.classList.remove('hidden');
            if (props.only?.includes('andhr') ?? false)
                hrformore.value.classList.remove('hidden');

            evenmore.value.classList.remove('hidden');
        }
    }
});

const qqGroups = ref([
    {
        name: 'contact-lx1',
        groupId: '589798569',
        translateKey: 'contactInfo.qqLauncherX',
    },

    {
        name: 'contact-projbobcat',
        groupId: '677872263',
        translateKey: 'contactInfo.qqProjBobcat',
    },

    {
        name: 'contact-cmfs',
        groupId: '419902868',
        translateKey: 'contactInfo.qqCMFS',
    },

    {
        name: 'contact-newbee',
        groupId: '1040526762',
        translateKey: 'contactInfo.qqNewCheck',
    },
]);
</script>

<template>
    <div
        :class="`bg-zinc-200 dark:bg-zinc-800 rounded-lg transition p-3.5 m-1    ROOT_OF_CONTACT_INFO
    
    ${noShadow ?? false ? '' : 'shadow-md hover:shadow dark:hover:shadow dark:shadow-md dark:active:shadow-sm  active:shadow-sm '}
    
    bg-opacity-55 
    dark:bg-opacity-55 
    hover:bg-opacity-65  
    dark:hover:bg-opacity-65  
    active:bg-opacity-60
    dark:active:bg-opacity-60 
    
    `">
        <div :class="(head ?? 'show') === 'show' ? '' : 'hidden'">
            <h2
                :class="`${titleClass ?? 'font-semibold text-3xl'}  text-yellow-500 p-2`">
                {{ titled ?? t('contactInfo.toOffical') }}
            </h2>
            <h5
                :class="`pl-2 p-1 pb-3 ${(sub ?? 'show') === 'show' ? '' : 'hidden'}`">
                {{ t('contactInfo.contactUs') }}
            </h5>
        </div>
        <ul class="list-none" id="contact-list" ref="clist">
            <li id="contact-bilibili" :class="hide">
                <Pressable
                    class="text-sm md:text-base xl:text-lg"
                    :no-tense="true"
                    type="outer"
                    target="_blank"
                    link="https://space.bilibili.com/31267692"
                    overclass="">
                    {{ t('contactInfo.bilibili') }}
                </Pressable>
            </li>
            <li id="contact-minebbs" :class="hide">
                <Pressable
                    class="text-sm md:text-base xl:text-lg"
                    :no-tense="true"
                    type="outer"
                    target="_blank"
                    link="https://www.minebbs.com/members/coronastudio.83949/"
                    overclass="">
                    {{ t('contactInfo.minebbs') }}
                </Pressable>
            </li>
            <li id="contact-kook" :class="hide">
                <Pressable
                    class="text-sm md:text-base xl:text-lg"
                    :no-tense="true"
                    type="outer"
                    target="_blank"
                    link="https://www.kookapp.cn/app/invite/rCdGVn"
                    overclass="">
                    {{ t('contactInfo.kook') }}
                </Pressable>
            </li>
            <li id="contact-ca" :class="hide">
                <Pressable
                    class="text-sm md:text-base xl:text-lg"
                    :no-tense="true"
                    type="outer"
                    target="_blank"
                    link="https://www.coolapk.com/feed/24778166"
                    overclass="">
                    {{ t('contactInfo.coolapk') }}
                </Pressable>
            </li>
            <li id="contact-coopqqgroup" :class="hide">
                <Pressable
                    class="text-sm md:text-base xl:text-lg"
                    :no-tense="true"
                    type="outer"
                    target="_blank"
                    link="https://pd.qq.com/s/1qab65hj3"
                    overclass="">
                    <span
                        style="font-style: normal !important"
                        v-html="t('contactInfo.coopQQChannel')"></span>
                </Pressable>
            </li>

            <hr id="" :class="hide + ' my-3 w-11/12 mx-auto contact-divider'" />

            <li v-for="i of qqGroups" :key="i.name" :id="i.name" :class="hide">
                <ListItemPressablePreset type="copy" :esuper="i.groupId">
                    {{ t(i.translateKey).replace('：', ': ') }}：
                </ListItemPressablePreset>
            </li>

            <hr
                id=""
                :class="hide + ' my-3 w-11/12 mx-auto contact-divider '"
                ref="hrformore" />

            <div class="hidden" ref="evenmore">
                <li
                    id="contact-feiron-mail"
                    :class="hide.replace('hidden', '')">
                    <Pressable
                        class="text-sm md:text-base xl:text-lg"
                        :no-tense="true"
                        title="Feiron Iguista's Working Mail"
                        type="outer"
                        :no-start-icon="true"
                        target="_blank"
                        link="mailto:frigeso@icloud.com"
                        overclass="">
                        <i class="use-icon translate-y-0.5 inline-block">
                            &#xe715;
                        </i>
                        frigeso@icloud.com
                    </Pressable>
                </li>
                <li id="contact-lx-vk" :class="hide.replace('hidden', '')">
                    <Pressable
                        class="text-sm md:text-base xl:text-lg"
                        :no-tense="true"
                        type="outer"
                        target="_blank"
                        :no-start-icon="true"
                        link="https://vk.com/launcherx"
                        overclass=" use-icon">
                        <i class="use-icon translate-y-0.5 inline-block">
                            &#xe907;
                        </i>
                        Для русских
                    </Pressable>
                </li>
                <li id="contact-who-x" :class="hide.replace('hidden', '')">
                    <Pressable
                        class="text-sm md:text-base xl:text-lg"
                        :no-tense="true"
                        type="outer"
                        target="_blank"
                        :disable="true"
                        :no-start-icon="true"
                        link="https://x.com/"
                        overclass=" use-icon">
                        <i class="use-icon translate-y-0.5 inline-block">
                            &#xea91;
                        </i>
                        For EN speakers
                    </Pressable>
                </li>
                <li id="contact-who-wb" :class="hide.replace('hidden', '')">
                    <Pressable
                        class="text-sm md:text-base xl:text-lg"
                        :no-tense="true"
                        type="outer"
                        target="_blank"
                        :no-start-icon="true"
                        link="https://weibo.com/"
                        overclass=" use-icon"
                        :disable="true">
                        &#xea9a; 暂未打算使用新浪微博
                    </Pressable>
                </li>
            </div>
        </ul>
    </div>
</template>

<style scoped>
li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
i.use-icon {
    font-style: normal !important;
}
</style>
