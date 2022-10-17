<script setup lang="ts">
import { computed } from 'vue';
import RIcon from '../basic/RIcon.vue';

/**
 * 
 */
defineProps({
  icon: String,
  shape: { type: String, default:() => 'circle' || 'square' },
  size: { type: String, default:() => 'default' || 'large' || 'small' },
  src: String
})

</script>


<template>

  <section class="r-avatar" 
    :class="`r-avatar--${$props.size} r-avatar--${$props.shape}`"
    inline-block box-border p-1 bg-white>
    <RIcon v-if="$props.icon" :type="$props.icon" />
    <img pointer-events-none v-else-if="$props.src" :src="$props.src" />
  </section>
</template>


<style>

.r-avatar {
  --r-avatar-width: 40px;
  --r-avatar-height: 40px;

  width: var(--r-avatar-width);
  height: var(--r-avatar-height);
  min-width: var(--r-avatar-width);
  min-height: var(--r-avatar-height);
  max-width: var(--r-avatar-width);
  max-height: var(--r-avatar-height);
}

.r-avatar img {
  max-width: 100%;
  max-height: 100%;
  border-radius: inherit;
}

.r-avatar--small {
  --r-avatar-width: 30px;
  --r-avatar-height: 30px;
}

.r-avatar--square {
  border-radius: 4px;
}
.r-avatar--circle {
  border-radius: 50%;
}

</style>