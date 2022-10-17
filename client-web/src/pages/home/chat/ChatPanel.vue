<script setup lang="ts">
import RAvatar from '../../../components/data/RAvatar.vue';
import RIcon from '../../../components/basic/RIcon.vue';
import MessageItem from './components/MessageItem.vue';
import RInput from '../../../components/form/RInput.vue';
import RButton from '../../../components/basic/RButton.vue';

/**
 */

defineProps({
  id: String
})
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

    <div flex-1 p-x-10px>
      
      <div w-full max-w-760px m-x-auto 
        flex flex-col h-full>
        
        <div flex-1>
          <MessageItem :message="{
            type: 'private',
            subType: 'common',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
            date: 1666000908807,
            sender: {
              userId: 100001
            }
          }" />
          <MessageItem :message="{
            type: 'private',
            subType: 'common',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
            date: 1666000908807,
            sender: {
              userId: 100001
            }
          }" />
          <MessageItem :message="{
            type: 'private',
            subType: 'common',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
            date: 1666000908807,
            sender: {
              userId: 10000
            }
          }" />
        </div>

        <footer p-b-40px flex items-center>

          <RInput shadow-md m-r-10px>
            <template #append>
              <RButton type="default">
                  <RIcon type="attachment" size="1.5em" />
              </RButton>
              <RButton type="default">
                  <RIcon type="emoji" size="1.5em" />
              </RButton>
              <RButton  type="default">
                  <RIcon type="gif" size="1.5em" />
              </RButton>
            </template>
          </RInput>

          
          <RButton>
            <RIcon type="send" size="1.5em" />
          </RButton>
        </footer>
      </div>

    </div>
  </section>

</template>


<style>


</style>