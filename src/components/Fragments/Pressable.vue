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
    fin?: boolean;
    noPadding?: boolean;
    ignoreTextResp?: boolean;
}>();

let ex = computed(() => {
    return (props.copyContent == undefined ? '' : ((`${slots.default!()[0].children}`.includes('：') || `${slots.default!()[0].children}`.includes(': ')) ? props.copyContent! : (((props.hideProtocol ?? false) && (props.copyContent!.includes('://'))) ? props.copyContent!.split('://')[1] : props.copyContent!)));
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
            return;
        }
    if (ty == 'outer' || ty == 'outer-link') {
        if (!props.link || props.link == undefined) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        linkHandler.setAttribute('target', '_blank');
        linkHandler.setAttribute('href', to);
        linkHandler.click();
    } else if (ty == 'bonsai') return;
    else if (ty == 'verified-link') {
        if (!props.link) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        linkHandler.setAttribute('target', '_blank');
        linkHandler.setAttribute('href', to);
        linkHandler.click();
    } else if ((ty ?? '').includes('download:')) {
        if (!props.link) {
            pushToast(t('base.nolink'), 'blur');
            return;
        }
        let _to = '';
        if (to.includes('%origin%'))
            _to = to.replace('%origin%', window.location.origin);
        let filename = ty.replace('download:', '');
        console.log(filename)
        linkHandler.setAttribute('download', filename);
        linkHandler.setAttribute('href', _to);
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
    runClickEvent(props.link!, props.type!);
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

    if (!(props.hideMatchedIcon ?? false)) {
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

    // console.log(typeof (slots.default!()[0].children))
    // if((typeof (slots.default!()[0].children)) == 'string') (slots.default!()[0].children as string).replace("：", ": ")
});

onBeforeUnmount(() => {
    if (!pressableBase.value) return ;

    pressableBase.value.removeEventListener('pointerup', pressableBaseAction);
});
</script>

<template>
    <div
        :title="title ?? link"
        :class="`pressable transition ${unspaced <= 1 || (overclass ?? 'x').includes('text-') ? '' : 'text-sm'} ${(overclass ?? '').includes('bg-') ? '' : 'bg-stone-300 dark:bg-stone-700'}
          text-stone-950  dark:text-stone-50 shadow${(initShadow ?? '').replace('none', '-none')}
            ${(overclass ?? '').includes('rounded') ? '' : 'rounded-lg'}
            bg-opacity-${initOpacity ?? 30}
            dark:bg-opacity-${initOpacity ?? 30}
            hover:shadow-md hover:bg-opacity-70   active:shadow-sm active:bg-opacity-100
            dark:hover:bg-opacity-70 dark:hover:shadow-md   dark:shadow${(initShadow ?? '').replace('none', '-none')}  dark:active:shadow-sm dark:active:bg-opacity-100
            px-2 ${(props.fin ?? false) ? ((props.isOnlyIcon ?? false) ? 'py-1' : 'py-1.5') : ((props.isOnlyIcon ?? false) ? 'py-1' : 'py-2')} mx-1 select-none 
            ${disable ?? false ? 'dis' : ''}
            ${overclass}
 
        `"
        :style="`${overstyle} ; cursor: pointer; ${(props.noPadding ?? false) ? 'padding: 0 !important;' : ''}`"
        ref="pressableBase">
        <span :class="noTense ?? false ? 'untense' : 'tense'">
            <i :class="`${iconClass}    use-icon`"></i>
            <span
                :class="`text-center my-auto mx-0 ml-0 ${isOnlyIcon ?? false ? ' use-icon ' : ' '}`">
                <span
                    ref="iconRef"
                    :class="
                        (noStartIcon ?? false)
                            ? 'hidden'
                            : 'use-icon inline-block translate-y-1 mr-1'
                    "
                    style="--tw-translate-y: 0.17365rem"></span>
                <span  class="scale-90 px-0.5" style="--tw-scale-x: .79; --tw-scale-y: .79;">
                    <slot></slot>
                </span>
                <span :class="` ${ex == '' ? 'hidden' : ''}       scale-90  ${((props.ignoreTextResp ?? false) && !(props.fin ?? false)) ? 'text-sm' : 'text-sm sm:text-base md:text-lg'}`" style="--tw-scale-x: .79; --tw-scale-y: .79;">
                    {{ ex }}
                    <!-- 可能引发高度异常: ex -->
                </span>
            </span>
            <i
                :class="
                    noLinkIcon ?? false
                        ? ' hidden '
                        : type === 'outer' || isVerified
                          ? ' text-xs md:text-sm use-icon scale-90 md:scale-100 sm-icon inline-block translate-y-0.5'
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
    font-style: normal !important;
    font-variant: normal;
    text-decoration: none;
    text-emphasis: none;
    text-transform: none;
}
.dis {
    cursor: not-allowed !important;
    background-color: rgba(67, 67, 67, 0.314);
    pointer-events: none !important;
    color: grey;
}
i.use-icon{
    font-style: normal !important;
}
span{
    height: min-content !important;
}
</style>
