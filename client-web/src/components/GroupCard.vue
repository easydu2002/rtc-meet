<script setup lang="ts">
import UserItem from './UserItem.vue';
import RIcon from './basic/RIcon.vue';
import { ref } from 'vue';

const expand = ref(false)

</script>


<template>

  <section class="group-card" bg-eee rounded-md>

    <header bg-eeee rounded-t-inherit :class="!expand ? 'rounded-inherit': ''" @click="expand = !expand">

      <UserItem avatarType="chat-active" label="Office Group">

        <template #prepend>
          <RIcon type="chat-right-dots" size="1.2em" />
        </template>
        <template #append>

          <RIcon type="option-icon" size="1.5em" />
        </template>
      </UserItem>
    </header>

    <div v-if="expand">

      <UserItem  p-x-20px label="Office Group" />
      <UserItem  p-x-20px label="Office Group" />
      <UserItem  p-x-20px label="Office Group" />
      <UserItem  p-x-20px label="Office Group" />
    </div>
    
  </section>

</template>


<style>
.group-card + .group-card {
  margin-top: 10px;
}

</style>