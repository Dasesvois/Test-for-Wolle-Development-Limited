<template>
  <button
    class="base-button"
    :class="variantClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClass = computed(() => `base-button--${props.variant}`);

function handleClick(event: MouseEvent) {
  if (props.disabled) return;
  emit('click', event);
}
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Kelly Slab', Arial, sans-serif;
  text-transform: uppercase;
}

.base-button:disabled {
  cursor: not-allowed;
}

.base-button--primary {
  color: #fff;
  background: linear-gradient(180deg, #ff184f 0%, #ff003d 100%);
  box-shadow: 0 4px 10px rgba(255, 0, 61, 0.3);
}

.base-button--secondary {
  color: #181818;
  background: #ffffff;
}
</style>