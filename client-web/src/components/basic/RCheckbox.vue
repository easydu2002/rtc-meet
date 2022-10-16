<script setup lang="ts">

defineProps<{
    modelValue: Boolean,
    label: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>

    <section class="r-checkbox" flex items-center>
        <label class="r-checkbox__input" checkbox>
            <input type="checkbox" v-show="false" :model-value="$props.modelValue" @update="$emit('update:modelValue', $event.target.value)" />
        </label>

        <span class="r-checkbox__label" m-l-8px color-black font-600> {{$props.label}} </span>
    </section>
</template>