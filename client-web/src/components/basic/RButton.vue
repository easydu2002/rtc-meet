<script setup lang="ts">

/**
 */

defineProps({
  type: { type: String, default: () => 'primary' },
  size: { type: String, default: () => 'normal' || 'large' },
})

</script>


<template>

  <section class="r-button" :class="`r-button--${$props.type} r-button--${$props.size}`" rounded>
    <slot />
  </section>

</template>


<style>

.r-button {

  --r-button-bg-color: #fff;
  --r-button-text-color: #000;

  height: 34px;
  line-height: 34px;
  width: auto;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  transition: opacity .25s;
  background-color: var(--r-button-bg-color);
  color: var(--r-button-text-color);
}
.r-button:hover {
  opacity: .8;
}

.r-button + .r-button {
  margin-left: 8px;
}
.r-button--primary {
  --r-button-bg-color: var(--color-primary);
  --r-button-text-color: #fff;
}
</style>