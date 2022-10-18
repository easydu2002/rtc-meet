<script setup lang="ts">
import HomeLayout from '../../../layouts/HomeLayout.vue';
import RButton from '../../../components/basic/RButton.vue';
import { useI18n } from 'vue-i18n';

/**
 */

const {t} = useI18n()
</script>


<template>


  <HomeLayout>

    <section h-full flex flex-col justify-center items-center>
      
      <img src="./../../../assets/images/meet_bg.png" pointer-events-none />
      
      <div w-270px>
        <RButton>{{ t('home.meet.start') }}</RButton>
      </div>
    </section>
  </HomeLayout>

</template>


<style>


</style>