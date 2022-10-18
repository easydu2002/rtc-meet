<script setup lang=ts>
import MessageItem from './MessageItem.vue';
import RScrollbar from '../../../../components/basic/RScrollbar.vue';

/**
 * 
 */
</script>


<template>

  <RScrollbar>
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
    <MessageItem :message="{
      type: 'private',
      subType: 'common',
      data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
      date: 1666000908807,
      sender: {
        userId: 100001
      }
    }" v-for="item in 10"/>
  </RScrollbar>
</template>


<style>


</style>