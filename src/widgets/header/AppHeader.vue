<template>
  <header class="topbar">
    <div class="topbar-left">
      <div class="logo">
        <span class="logo__main">HIRO</span>
        <span class="logo__vpn">VPN</span>
      </div>
      <button class="blog-btn">FAQ</button>
      <button class="blog-btn">Тарифы</button>
    </div>

    <nav class="nav">
      <a href="#" class="download">Скачать</a>
    </nav>

    <div class="topbar-right">
      <button class="blog-btn">Блог</button>
      <button class="account-btn">Аккаунт</button>
      <button class="lang-btn">РУ <span>⌄</span></button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.logo {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: flex-start;
  position: relative;
  font-family: 'Kelly Slab', Arial, sans-serif;
  font-weight: 400;
  font-size: 44px;
  line-height: 44px;
  text-transform: uppercase;
  color: #fff;
}

.logo__vpn {
  display: inline-block;
  position: relative;
  margin-left: 2px;
  font-size: 12px;
  line-height: 12px;
  transform: rotate(-90deg);
  transform-origin: left top;
  top: 2px;
  left: 2px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav a,
.account-btn,
.lang-btn {
  font-family: 'Kelly Slab', Arial, sans-serif;
  color: #f2f2f2;
  text-decoration: none;
  white-space: nowrap;
}

.nav a {
  font-size: 14px;
  line-height: 14px;
}

.download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  height: 30px;
  padding: 0 18px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ff325b 0%, #ff003d 100%);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.account-btn,
.blog-btn,
.lang-btn {
  height: 30px;
  padding: 0 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  cursor: pointer;
}

.lang-btn,
.blog-btn{
  border: 0px solid rgba(255, 255, 255, 0.35);
  color: #f2f2f2;
  align-items: center;
  text-align: center;
}

</style>