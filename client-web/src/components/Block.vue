<script setup lang="ts">

/**
 */
defineProps({
  title: String
})
</script>


<template>
  <section>

    <h6  color-regular text-12px tracking-widest m-y-10px>{{ $props.title}}</h6>
    
    <div>

      <slot />
    </div>

  </section>

</template>


<style>


</style>