<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import ACard from "../ACard.vue";
import LoadingRing from '../LoadingRing.vue';
import axios from 'axios';
import { ProvidedInfo } from '../../models/server';
// import Corner from "../Feature/Corner.vue";

interface PartnerInfo{
    fav: string,
    link: string,
    name: string,
}

let partners = ref<PartnerInfo[]>([]);

onBeforeMount( async () => {
    let parsed: PartnerInfo[], exed = false;
    try {
        let tmp = await axios.get<ProvidedInfo>(window.location.host.includes('corona.studio') ? '/provide/partners.json' : 'https://min.corona.studio/provide/partners.json');
        console.log(tmp);
        parsed = tmp.data.contentList as unknown as PartnerInfo[];
    } catch (ex) {
        exed = true;
        console.log(ex);
    }
    if(exed){
        let xx = (await axios.get<any>('/provide/partners.json')).data.contentList;
        console.log(xx);
        parsed = xx as PartnerInfo[];
    }
    partners.value = parsed!;
});

</script>
<template>
    <div>
        <div v-if="partners.length <= 0">
            <LoadingRing />
        </div>
        <div v-else class=" w-full gap-1 p-1" style=" display: flex; flex-wrap: wrap;">
            <a :href="m.link" :key="m.name"  target="_blank"
                v-for="m of partners"
                style="padding: .3rem; width: fit-content; display: inline-block; flex-grow: 1; max-width: 23rem; flex-shrink: 1"
            >
                <ACard  
                    :form="'left'"
                    :title="m.name" 
                    class="bg-amber-200 group bg-opacity-50 scale-95 hover:scale-100" 
                    :avatar="m.fav" 
                    >
                </ACard>
            </a>
            
        </div>
    </div>
</template>