<template>
  <BaseCard class="wheel-card">
    <div class="wheel-card__top">
      <div class="wheel-card__title-wrap">
        <h2 class="wheel-card__title">КОЛЕСО ФОРТУНЫ</h2>

        <template v-if="store.hasSpunToday && !store.canClaimFinalReward">
          <div class="wheel-card__countdown">
            <div class="wheel-card__countdown-values">
              <div class="wheel-card__countdown-group">
                <div class="wheel-card__time-box">{{ hoursLeft }}</div>
              </div>

              <div class="wheel-card__separator">:</div>

              <div class="wheel-card__countdown-group">
                <div class="wheel-card__time-box">{{ minutesLeft }}</div>
              </div>

              <div class="wheel-card__separator">:</div>

              <div class="wheel-card__countdown-group">
                <div class="wheel-card__time-box">{{ secondsLeft }}</div>
              </div>
            </div>

            <div class="wheel-card__countdown-labels">
              <span>Часы</span>
              <span>Минуты</span>
              <span>Секунды</span>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="wheel-card__subtitle">
            Испытайте удачу раз в день
            <br />
            и выигрывайте бонусы для VPN!
          </p>
        </template>
      </div>

      <div class="wheel-card__badge">
        <img :src="badgeImage" alt="badge" />
      </div>
    </div>

    <template v-if="!store.hasSpunToday && !store.canClaimFinalReward">
      <div ref="viewportRef" class="wheel-card__viewport">
        <div class="wheel-card__track" :style="trackStyle">
          <RewardCard
            v-for="(reward, index) in repeatedRewards"
            :key="`${reward.id}-${index}`"
            :title="reward.title"
            :value="reward.value"
            :image="reward.image"
          />
        </div>

        <div class="wheel-card__selector"></div>
      </div>
    </template>

    <p class="wheel-card__note">
      Крути колесо 7 дней подряд, без пропусков и получи на 7-й день
      гарантированный 1 день подписки!
    </p>

    <DaysProgress
      :current-day="store.currentDay"
      :total-days="7"
    />

    <BaseButton
      class="wheel-card__action"
      :disabled="isActionDisabled"
      @click="handleMainAction"
    >
      <span>{{ store.spinButtonText }}</span>
      <img :src="buttonIcon" alt="" />
    </BaseButton>

    <button class="wheel-card__reset-btn" @click="store.resetDailyWheelProgress()">
      СБРОС ТАЙМЕРА
    </button>

    <WheelResultModal
      :open="store.isResultModalOpen"
      :reward="store.selectedReward"
      @close="store.closeResultModal"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import BaseCard from '../../shared/ui/BaseCard.vue';
import BaseButton from '../../shared/ui/BaseButton.vue';
import RewardCard from './RewardCard.vue';
import DaysProgress from './DaysProgress.vue';
import WheelResultModal from './WheelResultModal.vue';
import { useQuestsStore } from '../../entities/quest/store/quests.store';

const store = useQuestsStore();

const badgeImage = '/images/icon-DailywheelCard1.png';
const buttonIcon = '/images/gift-small.png';

const viewportRef = ref<HTMLElement | null>(null);
const offsetX = ref(0);

const repeats = 20;
const visibleCenterIndex = 2;

const nowTs = ref(Date.now());
let timerId: number | null = null;

const repeatedRewards = computed(() =>
  Array.from({ length: repeats }).flatMap(() => store.rewards)
);

const trackStyle = computed(() => ({
  transform: `translate3d(-${offsetX.value}px, 0, 0)`,
}));

const msLeft = computed(() => {
  if (!store.countdownTarget) return 0;
  return Math.max(store.countdownTarget - nowTs.value, 0);
});

const hoursLeft = computed(() =>
  String(Math.floor(msLeft.value / 1000 / 60 / 60)).padStart(2, '0')
);

const minutesLeft = computed(() =>
  String(Math.floor((msLeft.value / 1000 / 60) % 60)).padStart(2, '0')
);

const secondsLeft = computed(() =>
  String(Math.floor((msLeft.value / 1000) % 60)).padStart(2, '0')
);

const isActionDisabled = computed(() => {
  if (store.isSpinning) return true;
  if (store.hasSpunToday && !store.canClaimFinalReward) return true;
  return false;
});

function startClock() {
  if (timerId) {
    window.clearInterval(timerId);
  }

  timerId = window.setInterval(() => {
    nowTs.value = Date.now();

    if (msLeft.value <= 0) {
      store.refreshProgressState();
    }
  }, 1000);
}

function stopClock() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

onMounted(() => {
  startClock();
});

onBeforeUnmount(() => {
  stopClock();
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStep() {
  if (!viewportRef.value) return 0;

  const firstCard = viewportRef.value.querySelector('.reward-card') as HTMLElement | null;
  const track = viewportRef.value.querySelector('.wheel-card__track') as HTMLElement | null;

  if (!firstCard || !track) return 0;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.gap || styles.columnGap || '0');

  return cardWidth + gap;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

function animateOffset(
  from: number,
  to: number,
  duration: number,
  easing: (t: number) => number
) {
  return new Promise<void>((resolve) => {
    const start = performance.now();

    function frame(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress);

      offsetX.value = from + (to - from) * eased;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        offsetX.value = to;
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

function getCenteredRewardIndexByDom() {
  if (!viewportRef.value) return 0;

  const viewportRect = viewportRef.value.getBoundingClientRect();
  const cards = Array.from(
    viewportRef.value.querySelectorAll('.reward-card')
  ) as HTMLElement[];

  if (!cards.length) return 0;

  const viewportCenterX = viewportRect.left + viewportRect.width / 2;

  let closestIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenterX - viewportCenterX);

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex % store.rewards.length;
}

async function spinWheel() {
  if (store.isSpinning || !store.canSpinToday) return;

  store.isSpinning = true;
  store.isResultModalOpen = false;
  store.selectedReward = null;

  await nextTick();

  const step = getStep();
  if (!step) {
    store.isSpinning = false;
    return;
  }

  const rewardsCount = store.rewards.length;
  const randomWinnerIndex = Math.floor(Math.random() * rewardsCount);

  const currentAbsoluteIndex =
    Math.round(offsetX.value / step) + visibleCenterIndex;
  const currentCycleIndex =
    ((currentAbsoluteIndex % rewardsCount) + rewardsCount) % rewardsCount;

  const deltaToWinner =
    randomWinnerIndex >= currentCycleIndex
      ? randomWinnerIndex - currentCycleIndex
      : rewardsCount - currentCycleIndex + randomWinnerIndex;

  const extraFullRounds = rewardsCount * 4;
  const finalAbsoluteIndex =
    currentAbsoluteIndex + extraFullRounds + deltaToWinner;

  const targetOffset = Math.max(
    0,
    (finalAbsoluteIndex - visibleCenterIndex) * step
  );
  const overshootOffset = targetOffset + step * 0.35;

  const startOffset = offsetX.value;

  await animateOffset(startOffset, overshootOffset, 3200, easeOutQuint);
  await animateOffset(overshootOffset, targetOffset, 420, easeOutCubic);

  const normalizedCycle = 6;
  const normalizedAbsoluteIndex =
    normalizedCycle * rewardsCount + randomWinnerIndex;

  offsetX.value = Math.max(
    0,
    (normalizedAbsoluteIndex - visibleCenterIndex) * step
  );

  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

  const landedRewardIndex = getCenteredRewardIndexByDom();

  store.selectedReward = store.rewards[landedRewardIndex];
  store.activeRewardIndex = landedRewardIndex;
  store.markTodaySpinComplete();

  await sleep(120);

  store.isSpinning = false;
  store.isResultModalOpen = true;
}

function handleMainAction() {
  if (store.canClaimFinalReward) {
    store.claimFinalReward();
    return;
  }

  spinWheel();
}
</script>

<style scoped>
.wheel-card {
  width: 100%;
  padding: 16px 16px 12px;
  color: #fff;
}

.wheel-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.wheel-card__title {
  margin: 0 0 8px;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 24px;
  line-height: 24px;
  font-weight: 400;
  text-transform: uppercase;
}

.wheel-card__subtitle {
  margin: 0;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 13px;
  line-height: 15px;
  color: #c7cbd4;
}

.wheel-card__badge {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
}

.wheel-card__badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.wheel-card__countdown {
  margin-top: 14px;
  margin-bottom: 18px;
  width: fit-content;
}

.wheel-card__countdown-values {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wheel-card__countdown-group {
  width: 64px;
  display: flex;
  justify-content: center;
}

.wheel-card__time-box {
  width: 64px;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #e7e7ea;
  border-radius: 6px;
  background: transparent;
  box-sizing: border-box;

  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  font-size: 56px;
  line-height: 1;
  color: #f4f4f6;
}

.wheel-card__separator {
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  font-size: 64px;
  line-height: 1;
  color: #f4f4f6;

  transform: translateY(-4px);
}

.wheel-card__countdown-labels {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 64px 64px 64px;
  gap: 36px;

  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color: #c6c7cc;
}

.wheel-card__countdown-labels span {
  text-align: center;
} 

.wheel-card__viewport {
  --visible-cards: 5;
  --card-gap: 2px;
  --card-width: calc(
    (100% - (var(--visible-cards) - 1) * var(--card-gap)) / var(--visible-cards)
  );

  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 12px;
}

.wheel-card__viewport::before,
.wheel-card__viewport::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 24px;
  z-index: 3;
  pointer-events: none;
}

.wheel-card__viewport::before {
  left: 0;
  background: linear-gradient(90deg, #181c25 0%, rgba(24, 28, 37, 0) 100%);
}

.wheel-card__viewport::after {
  right: 0;
  background: linear-gradient(270deg, #181c25 0%, rgba(24, 28, 37, 0) 100%);
}

.wheel-card__track {
  display: flex;
  gap: var(--card-gap);
  width: max-content;
  will-change: transform;
}

.wheel-card__selector {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 18px solid #ff0f47;
  pointer-events: none;
  z-index: 2;
}

.wheel-card__note {
  margin: 0 0 12px;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 13px;
  line-height: 17px;
  color: #f0f0f0;
}

.wheel-card__action {
  width: 100%;
  height: 36px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.wheel-card__action span {
  font-size: 15px;
  line-height: 15px;
}

.wheel-card__reset-btn {
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 14px;
  line-height: 14px;
}
</style>