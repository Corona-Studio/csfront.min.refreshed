<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ContactInfo from './ContactInfo.vue';
import ListItemPressablePreset from './Feature/ListItemPressablePreset.vue';
import Modal from './Fragments/Modal.vue';
import Pressable from './Fragments/Pressable.vue';

const { t } = useI18n();

const notset = ref<typeof Modal | null>(null);

const props = defineProps<{
    main?: string;
    showContacts?: boolean;
}>();

function killModal() {
    notset.value!.kill();
}

function preClickCheck() {
    if(props.main == undefined || props.main == null) setTimeout(() => {
        // notset.value!.open();
        // emits('PublicModalOn', `
        //     <div
        //         class="p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 shadow hover:shadow-lg mx-auto grid">
        //         <h4 class="text-xl text-center p-3">
        //             {{ t('helpblock.unsetyet') }}
        //         </h4>
        //         <Pressable
        //             :is-func-button="true"
        //             @click.native="killModal()"
        //             overclass="mx-auto text-lg">
        //             {{ t('base.okay') }}
        //         </Pressable>
        //     </div>
        //     `);
    }, 123);
    // 他妈的Modal得想办法彻底脱离文档流, 否则这个模态窗就卡在那里
}

const emits = defineEmits([
    'AgentHandle',
    'AgentClear',
    'PublicModalOn',
    'PublicModalOff',
]);
</script>

<template>
    <div
        class="bg-zinc-200 dark:bg-zinc-800 rounded-lg transition p-3.5 m-1 bg-opacity-55 shadow-md hover:shadow dark:hover:shadow dark:shadow-md dark:active:shadow-sm active:shadow-sm dark:bg-opacity-55 hover:bg-opacity-65 dark:hover:bg-opacity-65 active:bg-opacity-60 dark:active:bg-opacity-60">
        <div class="titleblock">
            <h3 class="text-2xl text-yellow-500 opacity-90">
                {{ t('helpblock.titleblock') }}
            </h3>
            <h6 class="opacity-85">{{ t('helpblock.titleTip') }}</h6>
        </div>
        <div class="relatedblock mt-1.5">
            <h6 class="text-xl text-yellow-500 opacity-80 mb-0.5">
                ⟩ {{ t('helpblock.related') }}
            </h6>
            <ul>
                <slot>
                    <!-- ONLY ACCEPT LI -->
                </slot>
            </ul>
        </div>
        <div class="mainpageblock mt-1.5 py-0.5">
            <h6 class="text-xl mb-0.5">
                <ListItemPressablePreset
                    type="outer-link"
                    :show-computed-icon="false"
                    :isVerified="true"
                    :link="props.main"
                    @click.native="preClickCheck()">
                    {{ t('helpblock.toMainTitle') }}
                </ListItemPressablePreset>
            </h6>
        </div>
        <!-- contact  -->
        <ContactInfo
            title-class="text-xl px-0 py-0 mt-1.5 opacity-80"
            :titled="'⟩' + t('helpblock.contactTitle')"
            head="show"
            sub="hide"
            only="@showmoreplats@onlymoreplats"
            style="padding: 0; --tw-bg-opacity: 0; margin: 0"
            :no-shadow="true" />
        <i class="hidden p-0 px-0 py-0"></i>

        <Modal class="fixed z-30" ref="notset" :shut-by-ground="true">
            <div
                class="p-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 shadow hover:shadow-lg mx-auto grid">
                <h4 class="text-xl text-center p-3">
                    {{ t('helpblock.unsetyet') }}
                </h4>
                <Pressable
                    :is-func-button="true"
                    @click.native="killModal()"
                    overclass="mx-auto text-lg">
                    {{ t('base.okay') }}
                </Pressable>
            </div>
        </Modal>
    </div>
</template>
