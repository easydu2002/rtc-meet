
<script setup lang="ts">

    defineProps<{
        type: string,
        size?: string
    }>()
</script>

<template>

    <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="`#icon-${$props.type}`"></use>
    </svg>
</template>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>