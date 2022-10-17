<script setup lang="ts">
import RAvatar from '../../../../components/data/RAvatar.vue';
import { theUserStore } from '../../../../store/user';

/**
 */
defineProps<{
  message: Message
}>()

interface Message {
  type: 'private' | 'group',
  subType: 'common' | 'image' | 'forward',
  data: any,
  date: number,
  sender: {

    userId: number,
    groupId?: string
  }
}
</script>


<template>

  <section class="message-item" 
    :class="$props.message.sender.userId === theUserStore.userInfo?.id ? 'message-item--me' : ''" 
    flex m-y-10px>

    <RAvatar :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"  />

    <section class="message-item__content" 
      p-4 max-w-380px bg-neutral-100 rounded select-auto>{{$props.message.data}}</section>

  </section>

</template>


<style>

.message-item--me {
  flex-direction: row-reverse;
}
.message-item--me > .message-item__content {

  background-color: #ECF4FE;
}


</style>