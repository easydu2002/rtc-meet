<script setup lang="ts">
import RAvatar from '../../../components/data/RAvatar.vue';
import RIcon from '../../../components/basic/RIcon.vue';
import MessageItem from './components/MessageItem.vue';
import RInput from '../../../components/form/RInput.vue';
import RButton from '../../../components/basic/RButton.vue';
import MessageContainer from './components/MessageContainer.vue';
import MessageInput from './components/MessageInput.vue';
import { getFriendsList } from '../../../api/user';

/**
 */

defineProps({
  id: String
})

console.log('getFriendsList()', getFriendsList());

</script>


<template>

  <section class="chat-panel" flex flex-col h-full>

    <header flex items-center
      shadow>

      <div flex flex-1 items-center h50px border-r border-ddd p-x-20px>
        <div flex items-center>
          <RAvatar :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" size="small" border border-ddd />
          <span m-x-8px font-bold color-black>Riravh Group</span>
          <RIcon type="la_pen" />
        </div>

        <div m-l-auto flex items-center>
          <RButton type="default">
            <RIcon type="device_video" />
          </RButton>
          <RButton type="default">
            <RIcon type="device_audio" />
          </RButton>
        </div>
      </div>

      <RButton type="default">
        <RIcon type="user_add" />
      </RButton>

    </header>

    <section flex-1 p-x-10px flex h0>
      
      <div w-full max-w-760px m-x-auto 
        flex flex-col h-full>
        
        <MessageContainer />

        <MessageInput />
      </div>

    </section>
  </section>

</template>


<style>


</style>