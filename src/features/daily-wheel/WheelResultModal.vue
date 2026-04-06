<template>
  <div v-if="open && reward" class="result-modal">
    <div class="result-modal__backdrop" @click="$emit('close')"></div>

    <div class="result-modal__content">
      <h3 class="result-modal__title">
        <template v-if="isTryTomorrow">
          <span>В другой раз</span>
          <span>повезёт!</span>
        </template>

        <template v-else>
          <span>Поздравляем!</span>
          <span>Вы выиграли</span>
        </template>
      </h3>

      <div class="result-modal__reward">
        <div class="result-modal__reward-title">
          {{ reward.title }}
        </div>

        <div class="result-modal__reward-image">
          <img :src="reward.image" :alt="reward.value" />
        </div>

        <div class="result-modal__reward-value">
          {{ modalValue }}
        </div>
      </div>

      <p v-if="modalNote" class="result-modal__note">
        {{ modalNote }}
      </p>

      <button class="result-modal__button" @click="$emit('close')">
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Reward = {
  id: number;
  title: string;
  value: string;
  image: string;
};

const props = defineProps<{
  open: boolean;
  reward: Reward | null;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const isTryTomorrow = computed(() => {
  if (!props.reward) return false;
  return props.reward.title === 'ПОПРОБУЙТЕ';
});

const modalValue = computed(() => {
  if (!props.reward) return '';

  if (props.reward.title === 'БЕСПЛАТНЫЕ') {
    return '6 часов';
  }

  return props.reward.value;
});

const modalNote = computed(() => {
  if (!props.reward) return '';

  if (props.reward.title === 'ПОПРОБУЙТЕ') {
    return '';
  }

  if (props.reward.title === 'БЕСПЛАТНЫЕ') {
    return 'Они уже добавлены к вашей подписке';
  }

  return 'Активируйте в течение 24 часов';
});
</script>

<style scoped>
.result-modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.result-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(8, 10, 15, 0.72);
  backdrop-filter: blur(4px);
}

.result-modal__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 360px;
  min-height: 336px;
  padding: 26px 20px 22px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #1b1f29 0%, #171b24 100%);
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
}

.result-modal__title {
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 1.15;
  color: #f3f4f7;
}

.result-modal__reward {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 26px;
}

.result-modal__reward-title,
.result-modal__reward-value {
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  color: #f3f4f7;
}

.result-modal__reward-title {
  text-align: right;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
}

.result-modal__reward-value {
  text-align: left;
  font-size: 28px;
  line-height: 1;
}

.result-modal__reward-image {
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-modal__reward-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.result-modal__note {
  margin: 0 auto 18px;
  text-align: center;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.2;
  color: #e2e4ea;
}

.result-modal__button {
  margin-top: auto;
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(180deg, #ff184f 0%, #ff003d 100%);
  color: #fff;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
}
</style>