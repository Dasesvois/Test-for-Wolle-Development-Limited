<template>
  <div class="account-page">
    <AppHeader />

    <main class="page-content">
      <h1 class="page-title">АККАУНТ</h1>
      <QuestsSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../../widgets/header/AppHeader.vue';
import AppFooter from '../../widgets/footer/AppFooter.vue';
import QuestsSection from '../../widgets/quests-section/QuestsSection.vue';
</script>

<style scoped>
.account-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top center, rgba(255, 30, 74, 0.12), transparent 28%),
    linear-gradient(180deg, #161924 0%, #10131b 100%);
  padding: 12px 20px 28px;
}

.page-content {
  max-width: 1100px;
  margin: 0 auto;
}

.page-title {
  margin: 10px 0 24px;
  text-align: center;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-size: 58px;
  line-height: 58px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .page-content {
    max-width: 920px;
  }

  .page-title {
    font-size: 52px;
    line-height: 52px;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .account-page {
    padding: 10px 16px 24px;
  }

  .page-title {
    font-size: 42px;
    line-height: 42px;
    margin: 8px 0 18px;
  }
}

@media (max-width: 480px) {
  .account-page {
    padding: 8px 12px 20px;
  }

  .page-title {
    font-size: 28px;
    line-height: 32px;
    margin: 8px 0 16px;
  }
}
</style>