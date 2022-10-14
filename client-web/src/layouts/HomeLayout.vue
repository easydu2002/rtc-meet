<script setup lang="ts">

/**
 */
</script>


<template>

  <section flex h-full>

    <div w-310px style="background-color: var(--chat-bg-color)">
      <slot name="op" />
    </div>

    <div flex-1 >

      <slot />
    </div>
  </section>

</template>


<style>


</style>