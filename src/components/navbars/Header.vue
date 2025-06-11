<style setup lang="ts">
</style>
<template>
  <!-- <header class="topbar">
      <img
        class="logo"
        src="@/assets/images/logo.png" alt="Logo" />
      <span class="title">Добрые лапки</span>

  </header> -->
  <header class="header">
    <div class="header-content">
      <div class="logo-name">
        <img src="@/assets/images/logo.png" alt="Логотип" class="logo-img">
        <div class="logo-name-text">
            <span>Добрые</span>
            <span>лапки</span>
        </div>
        <router-link to="/login" class="back-button">←</router-link>
      </div>
    </div>
  </header>
</template>



<style scoped lang="scss">
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 130px;
  background-color: #B2E2F2;
  border-radius: 0 0 32px 32px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 100;
  transition: all 0.3s ease;
      transition: transform 0.3s ease;


  img{
    width: 34px;
    height: 34px;
  }
  img.logo {
    width: 84px;
    height: 64px;
  }
  img.show{
    transform: rotate(180deg);

  }

  .title-page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    font-weight: bold;
    color: black;
  }


}
</style>
