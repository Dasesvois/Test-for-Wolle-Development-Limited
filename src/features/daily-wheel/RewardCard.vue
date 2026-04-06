<template>
  <div class="reward-card" :class="{ 'reward-card--active': active }">
    <div class="reward-card__label">{{ title }}</div>

    <div class="reward-card__image-wrap">
      <img :src="image" :alt="value" class="reward-card__image" />
    </div>

    <div class="reward-card__value">{{ value }}</div>

    <div v-if="active" class="reward-card__pointer"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  image: string;
  active?: boolean;
}>();
</script>

<style scoped>
.reward-card {
  position: relative;
  min-height: 156px;
  padding: 10px 6px 8px;
  border: 1px solid #7d7f87;
  border-radius: 8px;
  background: linear-gradient(180deg, #282c35 0%, #1d212a 100%);
  display: flex;
  flex-direction: column;
  width: 84px;
  flex: 0 0 84px;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.reward-card--active {
  border-color: #ff0f47;
  box-shadow: 0 0 0 1px rgba(255, 15, 71, 0.25);
  transform: translateY(-2px);
}

.reward-card__label {
  min-height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 14px;
  line-height: 14px;
  color: #d8d9de;
  text-transform: uppercase;
  text-align: center;
}

.reward-card__image-wrap {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  margin-bottom: 6px;
}

.reward-card__image {
  max-width: 66px;
  max-height: 76px;
  object-fit: contain;
}

.reward-card__value {
  margin-top: auto;
  min-height: 25px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 25px;
  line-height: 25px;
  color: #f1f1f1;
  text-align: center;
}

.reward-card__pointer {
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 18px solid #ff0f47;
}

</style>