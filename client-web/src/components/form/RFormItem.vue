
<script setup lang="ts">

defineProps({
    label: String,
    labelWidth: { type: String, default: () => 'auto' }
})

</script>

<template>
    
    <section class="r-form-item">

        <span class="r-form-item__label" font-bold color-black text-14px>
            {{ $props.label }}
        </span>

        <div class="r-form-item__body">
            <slot />
        </div>
        
    </section>
</template>

<style>

.r-form-item + .r-form-item {
    margin-top: 20px;
}

.r-form-item__label {
    width: v-bind($props.labelWidth);
}

</style>