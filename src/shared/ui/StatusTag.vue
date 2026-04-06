<template>
  <span class="status-tag">
    <slot />
  </span>
</template>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: #ff164b;
}
</style>