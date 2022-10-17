<script setup lang="ts">
import RInput from '../components/form/RInput.vue';
import RIcon from '../components/basic/RIcon.vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n()
</script>


<template>

  <header flex h-60px items-center style="background-color: var(--color-primary)">
    <img class="logo" src="./../assets/images/logo.png"/>

    <RInput :placeholder="t('home.globalSearchTip')" width="500px">
      <template #append>
        <RIcon type="search" />
      </template>
    </RInput>
  </header>

</template>


<style>


</style>