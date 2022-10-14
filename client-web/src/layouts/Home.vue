<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import RInput from '../components/form/RInput.vue';
import Header from './Header.vue';


const { t } = useI18n()
</script>


<template>

  <section flex flex-col h-100vh>

    <Header />

    <div flex flex-1>
      <nav w-70px>
        
      </nav>

      <section flex-1>
        <RouterView />
      </section>
    </div>
  </section>
</template>


<style>

</style>