<script setup lang="ts">
import { computed } from 'vue';
import Pressable from '../Fragments/Pressable.vue';

const props = defineProps<{
    type: string;
    link?: string;
    copy?: string;
    download?: string;
    esuper?: string;
    disable?: boolean;
    showComputedIcon?: boolean;
    isVerified?: boolean;
}>();

const preIcon = computed(() => {
    return (props.type ?? null) == null
        ? ''
        : props.type !== 'bonsai'
          ? props.type.includes('link')
              ? '\ue9cb'
              : '\ue92c'
          : '\ue91f';
});
</script>

<template>
    <Pressable
        :no-tense="true"
        :type="type"
        :hide-protocol="true"
        :copy-content="copy ?? esuper"
        :is-verified="isVerified"
        :link="link ?? esuper"
        :disable="disable"
        :init-opacity="15"
        overclass="text-lg use-icon">
        {{ showComputedIcon ?? false ? preIcon : '' }}
    </Pressable>
</template>
