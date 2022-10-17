<script setup lang="ts">

/**
 */
</script>


<template>

  <section flex h-full>

    <div w-310px style="background-color: var(--chat-bg-color)" box-border border-x border-ddd  p-20px>
      <slot name="op" />
    </div>

    <div flex-1 >

      <slot />
    </div>
  </section>

</template>


<style>


</style>