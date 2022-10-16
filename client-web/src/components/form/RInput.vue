<script setup lang="ts">

/**
 */

defineProps({
  modelValue: String,
  type: String,
  placeholder: String,
  width: { type: String, default: () => '100%' }
})
</script>


<template>


  <section class="r-input" rounded-lg>

    <div class="r-input__prepend" v-if="$slots.prepend">
      <slot name="prepend" />
    </div>

    <input :type="$props.type" v-model="$props.modelValue" :placeholder="$props.placeholder">
    
    <div class="r-input__prepend" v-if="$slots.append" flex items-center justify-center p-x-8px>
      <slot name="append" />
    </div>
  </section>

</template>


<style>

.r-input {
  --r-input-border-color: #CCCCCC;
  --r-input-font-color: var(--color-regular);
  border: 1px solid var(--r-input-border-color);
  height: 34px;

  display: flex;
  background-color: #fff;

  width: v-bind($props.width);
}
.r-input input {
  
  outline: none;
  border: none;
  padding: 0 20px;
  flex: 1;
  color: var(--r-input-font-color);
  background-color: transparent;
}
</style>