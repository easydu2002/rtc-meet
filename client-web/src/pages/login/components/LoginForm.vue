
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import RInput from '../../../components/form/RInput.vue';
import RButton from '../../../components/basic/RButton.vue';
import { theUserStore } from '../../../store/user';
import { useRouter } from 'vue-router';


/**
 * 
 */
const { t } = useI18n()

const router = useRouter()

const userInfo = ref({
  username: '',
  password: '',
})

const login = function() {
  theUserStore.userInfo = userInfo.value
  theUserStore.isAuthenticated = true
  router.push({name: 'Home'})
}
</script>


<template>

  <section class="login-form">

    <section class="login-form__body">
      <h1 text-42px>{{ t('login.title') }}</h1>
      <p text-20px>{{ t('login.subTitle') }}</p>
      
      <RInput v-model="userInfo.username" :placeholder="t('login.usernameTip')"></RInput>
      <RInput v-model="userInfo.password" type="password" :placeholder="t('login.passwordTip')"/>
      <RButton @click="login"> {{ t('login.login') }} </RButton>
    </section>
  </section>

</template>


<style>

.login-form {
  flex: 1;
  width: 94vw;
  max-width: 450px;
}

.login-form__body {
  width: 300px;
  margin: 0 auto;
}


</style>