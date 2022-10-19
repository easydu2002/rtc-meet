<script setup lang="ts">
import RAvatar from './data/RAvatar.vue';

/**
 * 
 */
defineProps({
  checked: Boolean,
  label: String,
  imgSrc: String,
  tagLabel: String
})
</script>


<template>

    <section class="block-item" :class="`${$props.checked ? 'block-item--checked' : ''}`" 
      flex items-center 
      rounded-md
      box-border
      h-42px px-10px
      cursor-pointer transition>
      
      <slot name="prepend" v-if="$slots.prepend" />
      <RAvatar v-else :src="$props.imgSrc" size="small" border border-ddd />

      <span class="block-item__label" m-l-8px color-regular>{{$props.label}}</span>

      <span v-if="$props.tagLabel && !$props.checked" 
        inline-block m-l-8px 
        bg-primary color-white 
        rounded-full 
        py-0 px-4 
        text-12px leading-6>{{$props.tagLabel}}</span>

       <span m-l-auto>
        <slot name="append" />
       </span>

    </section>

</template>


<style>

.block-item--checked {
  background-color: var(--color-primary);  
  border: 2px solid var(--color-ccc);
}

.block-item--checked > .block-item__label{

  color: #fff;
  font-weight: bold;
}


.block-item + .block-item {
  margin-top: 10px;
}

.block-item:not(.block-item--checked):hover {
  background-color: var(--color-ddd);
}

</style>