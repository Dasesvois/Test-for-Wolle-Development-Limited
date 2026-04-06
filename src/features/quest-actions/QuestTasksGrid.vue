<template>
  <div class="task-grid">
    <BaseCard v-for="task in tasks" :key="task.id" class="task-card">
      <StatusTag>
        {{ task.status === 'available' ? 'Доступен' : 'Закрыт' }}
      </StatusTag>

      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>

      <BaseButton variant="secondary" class="task-card__button">
        {{ task.button }}
      </BaseButton>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../../shared/ui/BaseCard.vue';
import BaseButton from '../../shared/ui/BaseButton.vue';
import StatusTag from '../../shared/ui/StatusTag.vue';
import type { QuestTask } from '../../entities/quest/store/quests.store';

defineProps<{
  tasks: QuestTask[];
}>();
</script>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.task-card {
  padding: 14px 16px 18px;
}

.task-card h3 {
  margin: 12px 0 10px;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 22px;
  line-height: 24px;
  font-weight: 400;
  text-transform: uppercase;
  color: #fff;
}

.task-card p {
  min-height: 54px;
  margin: 0 0 18px;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.72);
}

.task-card__button {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 14px;
}
</style>