<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid #2e3442;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.015) 100%),
    #181c25;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
</style>