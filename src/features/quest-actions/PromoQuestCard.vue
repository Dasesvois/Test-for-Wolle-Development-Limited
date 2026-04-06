<template>
  <BaseCard class="promo-card light">
    <StatusTag>Доступно</StatusTag>
    <h3>РАССКАЖИ О HIRO</h3>
    <p>
      Просто напиши пост / статью о нас в крупном канале или на своей странице
      в соцсети со ссылкой на нас.
    </p>
    <p>
      Пришли ссылку на пост / статью — и мы начислим тебе от 15 до 90 дней VPN
      бесплатно!
    </p>
    <p class="small-text">Чем больше охват, тем длиннее подарок!</p>
    <BaseButton>ОТПРАВИТЬ ССЫЛКИ</BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../../shared/ui/BaseCard.vue';
import BaseButton from '../../shared/ui/BaseButton.vue';
import StatusTag from '../../shared/ui/StatusTag.vue';
</script>

<style scoped>
.promo-card {
  display: block;
  align-items: center;
  text-align: left;
  padding: 10px;
}
.light {
  background: #f2f2f2;
  color: #181818;
}

h3 {
  margin: 12px 0 12px;
  font-family: 'Oswald', sans-serif;
  font-size: 34px;
  line-height: 1;
}

p {
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.45;
}

.small-text {
  margin-bottom: 16px;
  opacity: 0.7;
}
</style>