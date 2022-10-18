<script setup lang="ts">
import RIcon from '../components/basic/RIcon.vue';

/**
 * 
 * @author Du Qingsong
 * @date 2022-10-18
 * @version 1.0.0
 */
defineProps({
  active: Boolean,
  fillBackground: Boolean,
  label: String,
  icon: String,
  activeIcon: String
})
</script>


<template>

  <div class="navbar__item"
      relative
      w70px h70px
      flex flex-col items-center justify-center
      cursor-pointer
      :active="$props.active"
      :fillbg="$props.fillBackground">
    <RIcon :type="$props.active ? ($props.activeIcon || $props.icon): $props.icon" size="1.5em" />
    <span color-black> {{ $props.label }} </span>
  </div>
</template>


<style>
.navbar__item[fillbg=true] {
  background-color: var(--color-primary);
  border-top: 1px solid #fff;
}

.navbar__item.navbar__item[fillbg=true] span {
  color: #fff;
}

</style>