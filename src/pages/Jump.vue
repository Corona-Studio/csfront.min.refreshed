<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import PageTitle from '../components/Feature/PageTitle.vue';
import Paper from '../components/Fragments/Paper.vue';

const { t } = useI18n();
const router = useRoute();

const countdown = ref(6);
const target = ref('[unset]');
const reflect = ref('');
const jumpable = ref(true);
const isImmediate = ref(false);
const index = ref([
    {
        id: 0,
        match: '',
        link: '',
    },
]);

onMounted(() => {
    console.log(router.params.target);
    reflect.value = router.params.target.toString().split('+')[0];
    let dimension;
    switch (reflect.value[0]) {
        case 'this':
            dimension = `${window.location.protocol}//${window.location.host}/`; // index-1:
            target.value = dimension + reflect.value[2];
            break;
        case 'main':
            dimension = 'https://corona.studio/';
            break;
        case 'cskb':
            dimension = 'https://kb.corona.studio/';
            if (reflect.value[1] == 'contacts') dimension += 'zhCN/team';

            target.value = dimension;
            break;

        case 'else': // else links are directly inside the second param ([1])
            target.value = reflect.value[1];
            break;
        default:
            for (let co of index.value) {
                if (co.match === reflect.value[0]) target.value = co.link;
            }
            break;
    }

    setInterval(() => {
        // actually is a singleton
        if (isImmediate.value) countdown.value = 1;
        if (countdown.value !== 0 && jumpable.value) countdown.value -= 1;
    }, 1000);
});

function doJump(to: string) {
    console.log('invoked jump');
    window.location.replace(to);
}

watch(countdown, (_) => {
    if (countdown.value <= 0) {
        setTimeout(() => {
            doJump(target.value);
        }, 1919);
    }
});
</script>

<template>
    <Paper style="" :no-height-wrap="true">
        <PageTitle>{{ t('jump.jumpTitle') }}-CoronaStudio.min</PageTitle>
        <div
            style="height: 80vh"
            class="grid justify-items-center items-center justify-center w-full h-full pb-10 mb-5">
            <div>
                <h1 class="text-2xl font-semibold text-center opacity-90">
                    {{ t('jump.jumpTitle') }}: {{ countdown }}
                </h1>
                <div class="text-center text-lg my-3">
                    <span class="opacity-70">{{ t('jump.jumpingTo') }}</span>
                    <span ref="targetRef" id="target" class="text-lg p-1">
                        {{ target }}
                    </span>
                </div>
                <h6
                    class="bottom-0 w-full text-center font-normal text-sm opacity-70">
                    {{ t('jump.hint') }}
                </h6>
            </div>
        </div>
    </Paper>
</template>
