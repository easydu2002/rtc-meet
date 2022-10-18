<script setup lang="ts">
import UserItem from './UserItem.vue';
import RIcon from './basic/RIcon.vue';

</script>


<template>

  <section class="group-card" bg-gray-50 rounded-md>

    <header bg-gray-300 rounded-t-inherit >

      <UserItem label="Office Group">

        <template #append>
          <RIcon type="attachment" />
        </template>
      </UserItem>
    </header>

    <div>

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