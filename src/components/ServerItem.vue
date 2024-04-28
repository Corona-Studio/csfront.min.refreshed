<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ContentList } from '../models/server.ts';
import { doScroll } from '../utils/scroll.ts';
import ListItemPressablePreset from './Feature/ListItemPressablePreset.vue';
import Chip from './Fragments/Chip.vue';

const { t } = useI18n();

function scrollToServerList() {
    doScroll('TipsCMFS');
}

interface DisplayInfo {
    isCopy: boolean;
    with: string;
    content: string;
}

interface TagDisplayInfo {
    index: number;
    content: string;
}

const addrs = ref<DisplayInfo[]>([]);
const conts = ref<DisplayInfo[]>([]);
const etags = ref<TagDisplayInfo[]>([]);

const props = defineProps<{
    server: ContentList;
}>();

onMounted(() => {
    if (props.server.addr) {
        for (let i of props.server.addr) {
            let sp = i.split('#');
            addrs.value.push({
                isCopy: true, //(i.includes('[')),
                with: sp[1],
                content: `${sp[0]}`,
            });
        }
    }

    if (props.server.cont) {
        for (let i of props.server.cont) {
            let sp = i.split('#');
            conts.value.push({
                isCopy: !i.includes('@'),
                with: sp[1],
                content: sp[0].replace('@@', ''),
            });
        }
    }

    let index = 0;
    for (let ts of props.server.tags)
        etags.value.push({ index: index++, content: ts });
});
</script>

<template>
    <div
        class="p-1.5 mx-auto bg-zinc-500 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20 active:bg-opacity-15 dark:active:bg-opacity-15 w-full rounded-lg transition">
        <!--templ-->
        <h1 class="text-lg lg:servr-xl font-semibold">
            <span
                :class="`${server.isAd ? '' : 'hidden'} py-0 p-0.5 rounded border font-light float-right ad-mark`"
                style="font-size: x-small; line-height: 0.9rem">
                AD
            </span>
            <div style="width: 90%">{{ server.name }}</div>
        </h1>
        <p class="my-2 mt-0.5 text-sm lg:text-base">
            <span class="opacity-60 font-light">
                [
                <a @click="scrollToServerList()">
                    {{ t('base.status') }}
                    <sup>?</sup>
                </a>
                ：{{ server.stat }}]
            </span>
            {{ server.desc }}
        </p>
        <p class="break-keep">
            <Chip v-for="tag of etags" :key="tag.index" :icolor="tag.index">
                {{ tag.content }}
            </Chip>
            <!--需要解决这里的生成翻译问题：稍后。-->
        </p>
        <h3 class="text-lg mt-1.5">{{ t('base.location') }}</h3>
        <ul class="list-none">
            <li v-for="list of addrs" :key="list.content">
                <ListItemPressablePreset
                    class="my-1 bg-zinc-100 dark:bg-zinc-600 bg-opacity-15 hover:bg-opacity-25 active:bg-opacity-30"
                    :show-computed-icon="false"
                    :type="list.isCopy ? 'copy' : 'outer-link'"
                    :esuper="list.with">
                    {{ list.content
                    }}{{ list.content.includes('[') ? '' : '：' }}
                </ListItemPressablePreset>
            </li>
        </ul>
        <h3 class="text-lg mt-1.5">{{ t('base.contact') }}</h3>
        <ul class="list-none">
            <li v-for="list of conts" :key="list.content">
                <ListItemPressablePreset
                    class="my-1 bg-zinc-100 dark:bg-zinc-600 bg-opacity-15 hover:bg-opacity-25 active:bg-opacity-30"
                    :show-computed-icon="false"
                    :type="list.isCopy ? 'copy' : 'outer-link'"
                    :esuper="list.with">
                    {{ list.content }}：
                </ListItemPressablePreset>
            </li>
        </ul>
    </div>
</template>
