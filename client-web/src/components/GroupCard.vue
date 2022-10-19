<script setup lang="ts">
import UserItem from './UserItem.vue';
import RIcon from './basic/RIcon.vue';

defineProps({
  expand: Boolean
})
</script>


<template>

  <section class="group-card" bg-eee rounded-md>

    <header bg-eeee rounded-t-inherit >

      <UserItem avatarType="chat-active" label="Office Group">

        <template #prepend>
          <RIcon type="chat-active" />
        </template>
        <template #append>

          <RIcon type="option" rotate-90 />
        </template>
      </UserItem>
    </header>

    <div v-if="$props.expand">

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