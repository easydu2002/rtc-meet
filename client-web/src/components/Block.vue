<script setup lang="ts">

/**
 */
defineProps({
  title: String
})
</script>


<template>
  <section>

    <header flex items-center>
      <h6 flex-1 color-regular text-12px tracking-widest m-y-10px>{{ $props.title}}</h6>

      <div>
        <slot name="append" />
      </div>
    </header>
    
    <div>

      <slot />
    </div>

  </section>

</template>


<style>


</style>