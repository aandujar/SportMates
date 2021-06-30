<template>
  <div id="app">
    <v-app>
      <div v-if="loading" style="height: 100vh" class="center-items">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <router-view v-else />
    </v-app>
    <notifications style="margin-top: 75px" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.$router.onReady(() => {
      const user = localStorage.getItem("user");
      if (user) {
        this.$store.commit("user/SET_USER", JSON.parse(user));
        if (this.$route.path === "/") {
          this.$router.push("/event");
        }
        this.$store.dispatch("event/getSports");
      } else {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 350);
    });
  },
};
</script>

<style lang="scss">
.app {
  height: 100vh;
  width: 100vw;
}
</style>
