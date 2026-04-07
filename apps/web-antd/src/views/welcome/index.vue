<template>
  <div class="page">
    <div class="container">
      <!-- Left -->
      <div class="left">
        <h1 class="title">
          欢迎使用
          <br />
          <span class="highlight">数字人</span>
        </h1>
        <!-- <p class="desc">实时防护 · 数据加密 · 安全可控</p> -->
      </div>

      <!-- Right -->
      <div class="right">
        <div class="floating">
          <!-- <svg width="260" height="260" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="#3b82f6" stroke-width="4" opacity="0.25" fill="none"/>
            <path d="M100 60 L140 90 V120 C140 140 120 160 100 170 C80 160 60 140 60 120 V90 L100 60Z" fill="#3b82f6"/>
            <circle cx="100" cy="110" r="10" fill="#ffffff"/>
          </svg> -->
          <img
            :alt="appName"
            src="../../assets/images/slogan1.png"
            style="width: 38rem; height: 50rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(135deg, #acbde6, #acbde6, #acbde6); */
  color: #fff;
}

.container {
  width: 100%;
  /* max-width: 1200px; */
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* padding: 0 10px; */
}

.left {
  max-width: 500px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.3;
  color: #000;
}

.highlight {
  color: #3b82f6;
}

.desc {
  margin-top: 20px;
  color: #94a3b8;
  font-size: 18px;
}

.right {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* padding-left: 100px; */
  margin-left: 250px;
  margin-top: -170px;
  /* margin-left:-20px; */
  /* margin-left: -100px; */
}

/* 浮动动画 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}
</style>
