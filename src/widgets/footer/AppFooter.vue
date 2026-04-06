<template>
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <h4>HIRO®</h4>
        <ul>
          <li>FAQ</li>
          <li>Тарифы</li>
          <li>Блог</li>
          <li>Роутеры</li>
          <li>Партнёрам</li>
          <li>Аккаунт</li>
        </ul>
      </div>

      <div>
        <h4>Скачать</h4>
        <ul>
          <li>iOS</li>
          <li>Android</li>
          <li>Android TV</li>
          <li>Windows</li>
          <li>Mac OS</li>
        </ul>
      </div>

      <div>
        <h4>Способы оплаты</h4>
        <ul>
          <li>СБП</li>
          <li>Sberpay</li>
          <li>Tinkoff Pay</li>
          <li>Банковская карта</li>
          <li>Криптовалюта</li>
        </ul>
      </div>

      <div>
        <h4>Поддержка 24/7</h4>
        <button class="telegram-btn">Telegram</button>
        <ul class="legal">
          <li>Публичная оферта</li>
          <li>Пользовательское соглашение</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  max-width: 1180px;
  margin: 32px auto 0;
  padding: 28px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

h4 {
  margin: 0 0 18px;
  font-family: 'Oswald', sans-serif;
  font-size: 22px;
  font-weight: 400;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
}

.telegram-btn {
  height: 38px;
  border: none;
  border-radius: 999px;
  padding: 0 18px;
  background: #fff;
  cursor: pointer;
  font-weight: 700;
}

.legal {
  margin-top: 18px;
}
</style>