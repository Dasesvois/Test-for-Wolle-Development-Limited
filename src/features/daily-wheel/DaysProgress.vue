<template>
  <div class="days-progress">
    <div class="days-progress__progress">
      <div
        class="days-progress__progress-fill"
        :style="{ width: progressWidth }"
      ></div>
    </div>

    <div class="days-progress__list">
      <div
        v-for="day in totalDays"
        :key="day"
        class="days-progress__item"
        :class="{
          'days-progress__item--active': day <= currentDay && day !== totalDays,
          'days-progress__item--gift': day === totalDays,
        }"
      >
        <template v-if="day === totalDays">
          <div class="days-progress__gift-wrap">
            <img :src="giftImage" alt="gift" />
            <span class="days-progress__gift-number">7</span>
          </div>
        </template>
        <template v-else>
          {{ day }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const giftImage = '/images/presSeven.png';

const props = defineProps<{
  currentDay: number;
  totalDays: number;
}>();

const progressWidth = computed(() => {
  const safeDay = Math.min(Math.max(props.currentDay, 1), props.totalDays);
  return `${(safeDay / props.totalDays) * 100}%`;
});
</script>

<style scoped>
.days-progress {
  position: relative;
  padding: 14px 12px 10px;
  border: 1px solid #2e3442;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
}

.days-progress__progress {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 31px;
  height: 12px;
  background: #2a2f39;
  border-radius: 999px;
  overflow: hidden;
}

.days-progress__progress-fill {
  height: 100%;
  background: #ff0f47;
}

.days-progress__list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  gap: 10px;
}

.days-progress__item {
  position: relative;
  z-index: 1;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 25px;
  line-height: 25px;
  text-align: center;
  color: #f5f5f5;
}

.days-progress__item--gift {
  display: flex;
  align-items: center;
  justify-content: center;
}

.days-progress__gift-wrap {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.days-progress__gift-wrap img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.days-progress__gift-number {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #ffffff;
  pointer-events: none;
}
</style>