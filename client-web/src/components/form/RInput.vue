<script setup lang="ts">

/**
 */

defineProps({
  modelValue: String,
  type: String,
  placeholder: String,
  size: { type: String, default:() => 'default' },
  width: { type: String, default: () => '100%' }
})
</script>


<template>


  <section class="r-input" :class="`r-input--${$props.size}`" rounded-lg>

    <div class="r-input__prepend" v-if="$slots.prepend" flex items-center justify-center  p-l-8px>
      <slot name="prepend" />
    </div>

    <input :type="$props.type" v-model="$props.modelValue" :placeholder="$props.placeholder" w-0>
    
    <div class="r-input__prepend" v-if="$slots.append" flex items-center justify-center p-r-8px>
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

.r-input--large {
  height: 50px;
  font-size: 20px;
}
</style>