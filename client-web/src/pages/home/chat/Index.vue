<script setup lang="ts">
import HomeLayout from '../../../layouts/HomeLayout.vue';
import RInput from '../../../components/form/RInput.vue';
import { useI18n } from 'vue-i18n';
import ChatPanel from './ChatPanel.vue';
import RAvatar from '../../../components/data/RAvatar.vue';
import BlockItem from '../../../components/BlockItem.vue';
import Block from '../../../components/Block.vue';
import RIcon from '../../../components/basic/RIcon.vue';

/**
 */

 const {t} = useI18n()

</script>


<template>

  <HomeLayout >

    <template #op>

      <RInput :placeholder="t('home.chat.searchTip')" >
      
        <template #prepend>
          <RIcon type="search" />
        </template>
      </RInput>

      <Block :title="t('home.chat.recent')">
        
        <BlockItem :img-src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
          :label="'好同志'" tag-label="2" checked />
        <BlockItem :img-src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
          :label="'好同志'" tag-label="2" />
      </Block>
      
      <Block :title="t('home.chat.groups')">
        
        <BlockItem :img-src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
          :label="'好同志'" tag-label="2" />
        <BlockItem :img-src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
          :label="'好同志'" tag-label="2" />
      </Block>
      
    </template>

    <ChatPanel />

  </HomeLayout>

</template>


<style>


</style>