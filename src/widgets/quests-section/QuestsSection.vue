<template>
  <section class="quests-section">
    <div class="section-head">
      <h2>Квесты</h2>
      <button class="close-btn">×</button>
    </div>

    <div class="quests-layout">
      <DailyWheelCard />
      <PromoQuestCard />
    </div>

    <QuestTasksGrid :tasks="store.tasks" />
  </section>
</template>

<script setup lang="ts">
import DailyWheelCard from '../../features/daily-wheel/DailyWheelCard.vue';
import PromoQuestCard from '../../features/quest-actions/PromoQuestCard.vue';
import QuestTasksGrid from '../../features/quest-actions/QuestTasksGrid.vue';
import { useQuestsStore } from '../../entities/quest/store/quests.store';

const store = useQuestsStore();
</script>

<style scoped>
.quests-section {
  color: #fff;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-head h2 {
  margin: 0;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 42px;
  line-height: 42px;
  font-weight: 400;
}

.close-btn {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  cursor: pointer;
}

.quests-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
  gap: 14px;
  align-items: start;
  margin-bottom: 14px;
  align-items: center;
}
</style>