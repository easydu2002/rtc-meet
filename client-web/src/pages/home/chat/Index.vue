<script setup lang="ts">
import HomeLayout from '../../../layouts/HomeLayout.vue';
import RInput from '../../../components/form/RInput.vue';
import { useI18n } from 'vue-i18n';

/**
 */

 const {t} = useI18n()

</script>


<template>

  <HomeLayout >

    <template #op>

      <RInput :placeholder="t('home.chat.searchTip')" />
    </template>

  </HomeLayout>

</template>


<style>


</style>