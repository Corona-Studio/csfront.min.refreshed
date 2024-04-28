<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useLinkHandler } from '../../utils/linkHandler.ts';
import { pushToast } from '../../utils/toast.ts';

const { t } = useI18n();
const iconRef = ref<HTMLElement | null>(null);
const endIconRef = ref<HTMLElement | null>(null);
const pressableBase = ref<HTMLElement | null>(null);
const unspaced = ref(0);

const slots = useSlots();
const router = useRouter();

const props = defineProps<{
    type?: string;
    noTense?: boolean;
    isVerified?: boolean;
    hideMatchedIcon?: boolean;
    initShadow?: string;
    isOnlyIcon?: boolean;
    overstyle?: string;
    iconClass?: string;
    link?: string;
    overclass?: string;
    initOpacity?: number;
    isFuncButton?: boolean;
    copyContent?: string;
    disable?: boolean;
    hideProtocol?: boolean;
    noLinkIcon?: boolean;
    noStartIcon?: boolean;
    title?: string;
}>();

const ex = computed(() => {
    if (!slots.default) return;

    return slots.default!()[0].children?.toString()?.includes('：')
        ? props.copyContent
        : '';
});

function copy(item: string) {
    try {
        navigator.clipboard
            .writeText(item)
            .then(() => {
                pushToast(`${t('base.copied')}：${item}`, 'bg-green-500');
            })
            .catch((_) => {
                pushToast(`复制失败`, 'err');
            });
    } catch (ex) {
        pushToast(`测试环境或其他HTTP无S环境无法使用复制到剪贴板。`, 'blur');
    }
}

function runClickEvent(to: string, ty: string) {
    if (props.isFuncButton) return;

    const linkHandler = useLinkHandler();

    if (ty == 'copy')
        if (props.copyContent) {
            if (props.copyContent === 'this.content') {
                copy(slots.default!()[0].children as string);
                return;
            }

            copy(props.copyContent);
        }
    if (ty == 'outer' || ty == 'outer-link') {
        if (props.link) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        linkHandler.setAttribute('target', '_blank');
        linkHandler.setAttribute('href', to);
        linkHandler.click();
    } else if (ty == 'bonsai') return;
    else if (ty == 'verified-link') {
        if (props.link) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        linkHandler.setAttribute('target', '_blank');
        linkHandler.setAttribute('href', to);
        linkHandler.click();
    } else if ((ty ?? '').includes('download:')) {
        if (props.link) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        if (to.includes('%origin%'))
            to = to.replace('%origin%', window.location.origin);
        let filename = ty.replace('download:', '');
        linkHandler.setAttribute('download', filename);
        linkHandler.setAttribute('href', to);
        linkHandler.click();
        linkHandler.removeAttribute('download');
    } else {
        try {
            router.push(to).catch((ex) => {
                console.groupCollapsed(
                    'ignorable error occured while trying to use Pressable Route',
                );
                console.log(ex);
                console.groupEnd();
            });
        } catch (ex) {
            console.groupCollapsed('error occured');
            console.log(ex);
            console.groupEnd();
        }
    }
}

function pressableBaseAction() {
    if (!props.link || !props.type) return;

    runClickEvent(props.link, props.type);
}

onMounted(() => {
    if (!pressableBase.value) return;
    if (!iconRef.value) return;
    if (!endIconRef.value) return;
    if (!slots.default) return;

    if (slots.default()[0]?.children)
        unspaced.value =
            slots.default()[0]?.children?.toString().replace(/ /g, '').length ??
            0;
    pressableBase.value.addEventListener('pointerup', pressableBaseAction); // @click="RunClickEvent(link, type)"

    if (props.hideMatchedIcon ?? false) {
        if ((props.type ?? '') == 'copy') iconRef.value.innerHTML = '\ue8c8';
        if (
            (props.type ?? '').includes('outer') ||
            (props.type ?? '').includes('link')
        )
            iconRef.value.innerHTML = '\ue71b';
        if ((props.type ?? '').includes('down')) iconRef.value.innerHTML = '';
        if ((props.type ?? '') == 'bonsai') iconRef.value.innerHTML = '\uf586';
        if ((props.type ?? '') == '_') iconRef.value.innerHTML = '\uf745';
        if ((props.type ?? '') == 'verified') iconRef.value.innerHTML = '';
        if (props.isVerified ?? false) endIconRef.value.innerHTML += ' \uea18';
        iconRef.value.innerHTML += ' ';
    }
});

onBeforeUnmount(() => {
    if (!pressableBase.value) return;

    pressableBase.value.removeEventListener('pointerup', pressableBaseAction);
});
</script>

<template>
    <div
        :title="title ?? link"
        :class="`pressable transition ${unspaced <= 1 || (overclass ?? 'x').includes('text-') ? '' : 'text-sm'} ${(overclass ?? '').includes('bg-') ? '' : 'bg-stone-300 dark:bg-stone-700'}
          text-stone-950  dark:text-stone-50 shadow${initShadow ?? '-none'}
            ${(overclass ?? '').includes('rounded') ? '' : 'rounded-lg'}
            bg-opacity-${initOpacity ?? 15}
            dark:bg-opacity-${initOpacity ?? 15}
            hover:shadow-md hover:bg-opacity-70   active:shadow-sm active:bg-opacity-100
            dark:hover:bg-opacity-70 dark:hover:shadow-md   dark:shadow  dark:active:shadow-sm dark:active:bg-opacity-100
            px-2 py-1 mx-1 select-none 
            ?text-center sm:text-left? 
            ${disable ?? false ? 'dis' : ''}
            ${overclass}
        `"
        :style="`${overstyle} ; cursor: pointer;`"
        ref="pressableBase">
        <span :class="noTense ?? false ? 'untense' : 'tense'">
            <i :class="iconClass"></i>
            <span
                :class="`text-center my-auto mx-0 ml-0 ${isOnlyIcon ?? false ? ' use-icon ' : ' '}`">
                <span
                    ref="iconRef"
                    :class="
                        noStartIcon ?? false
                            ? 'hidden'
                            : 'use-icon inline-block translate-y-1 mr-1'
                    "
                    style="--tw-translate-y: 0.17365rem"></span>
                <slot></slot>
                {{
                    (hideProtocol ?? false) && (ex?.includes('://') ?? false)
                        ? ex!.split('://')[1]
                        : ex
                }}
            </span>
            <i
                :class="
                    noLinkIcon ?? false
                        ? ' hidden '
                        : type === 'outer' || isVerified
                          ? '  text-sm use-icon sm-icon inline-block translate-y-0.5'
                          : 'hidden'
                "
                style="--tw-translate-y: 0.059rem"
                ref="endIconRef">
                &#xe8a7;
            </i>
        </span>
    </div>
</template>

<style scoped>
i {
    text-transform: none;
    text-decoration: none;
    text-emphasis: none;
    font-variant: normal;
    font-style: normal !important;
}
.dis {
    cursor: not-allowed !important;
    pointer-events: none !important;
    background-color: rgba(67, 67, 67, 0.314);
    color: grey;
}
</style>
