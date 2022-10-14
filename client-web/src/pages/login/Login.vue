
<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import LoginForm from './components/LoginForm.vue';
import LoginBanner from './components/LoginBanner.vue';

const { t } = useI18n()
</script>


<template>

  <main class="login" relative h100vh>

    <section class="locale">
      多语言
    </section>
    
    <section class="login-panel" absolute bg-white h600px shadow-md rounded flex>

        <LoginForm />

        <LoginBanner />

    </section>
  </main>

</template>


<style>
.login {
  background: #F8F8F8 url('~/assets/images/login_bg.png') no-repeat;
  background-position: -80px center;
}

.login-panel {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
}

</style>