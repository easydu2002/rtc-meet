<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import RInput from '../components/form/RInput.vue';
import Header from './Header.vue';
import RIcon from '../components/basic/RIcon.vue';
import Navbar from './Navbar.vue';


const { t } = useI18n()
</script>


<template>

  <section flex flex-col h-100vh>

    <Header />

    <div flex flex-1 class="home__body">
      
      <Navbar />

      <section flex-1>
        <RouterView />
      </section>
    </div>
  </section>
</template>


<style>

@media screen and (max-width: 768px) {

  .home__body {
    flex-direction: column-reverse;
  }

}

</style>