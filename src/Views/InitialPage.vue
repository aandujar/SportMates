<template>
  <div class="initial-page center-items">
    <v-img
      class="initial-page__img"
      :src="require('@/assets/login.png')"
    ></v-img>
    <div class="initial-page__box center-items pa-2">
      <Login v-if="showLogin" @change="toggleView" @logged="goToEvents" />
      <Register v-else @change="toggleView" @logged="goToEvents" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InitialPage",
  data: function () {
    return {
      showLogin: true,
    };
  },
  components: {
    Login: () => import("@/Views/Login.vue"),
    Register: () => import("@/Views/Register.vue"),
  },
  methods: {
    toggleView() {
      this.showLogin = !this.showLogin;
    },
    goToEvents() {
      this.$router.push("/main");
    }
  },
};
</script>

<style lang="scss" scoped>
.initial-page {
  height: 100vh;
  width: 100%;

  &__img {
    height: 100%;
    width: 100%;
    z-index: 0;
    position: relative;
  }

  &__box {
    width: 60vw;
    z-index: 1;
    position: absolute;
  }
}
</style>