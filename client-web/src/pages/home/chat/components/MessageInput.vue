<script setup lang=ts>
import RButton from '../../../../components/basic/RButton.vue';
import RInput from '../../../../components/form/RInput.vue';
import RIcon from '../../../../components/basic/RIcon.vue';

/**
 * 
 */
</script>


<template>

  <section p-b-40px flex items-center>

    <RInput shadow-md m-r-10px size="large">
      <template #append>
        <RButton type="default">
            <RIcon type="attachment" />
        </RButton>
        <RButton type="default">
            <RIcon type="emoji" />
        </RButton>
        <RButton  type="default">
            <RIcon type="gif"/>
        </RButton>
      </template>
    </RInput>


    <RButton size="large">
      <RIcon type="send" size="1.5em" />
    </RButton>
  </section>
</template>


<style>


</style>