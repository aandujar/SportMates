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
    const user = localStorage.getItem("user");
    console.log(this.$route);
    if (user) {
      this.$store.commit("user/SET_USER", JSON.parse(user));
      if (this.$route.path === "/") {
        this.$router.push("/main");
      }
    } else {
      this.$router.push("/");
    }
    setTimeout(() => {
      this.loading = false;
    }, 350);
  },
};
</script>

<style lang="scss">
.app {
  //background-color: $grey-background;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;*/
  height: 100vh;
  width: 100vw;
  /* padding: 0;

  &__toolbar {
    position: fixed;
    left: 0;
    top: 0;
    height: 80px;
    width: 100vw;
    z-index: 5;
  }

  &__icons {
    position: absolute;
    left: 0;
    z-index: 40;
    background-color: white;
    border: 1px solid black;
    height: 150px;
    width: 150px;
    padding: 10px;

    &--hidded {
      animation: slideUp 0.25s ease;
      top: -200px;
    }

    &--visible {
      animation: slideDown 0.25s ease;
      top: 80px;
    }
  }

  @keyframes slideDown {
    0% {
      transform: translateY(-200px);
    }

    50% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(60px);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(100px);
    }

    50% {
      transform: translateY(40px);
    }

    100% {
      transform: translateY(-200px);
    }
  }

  &__body {
    padding-top: 80px;
    padding-bottom: 80px;
    height: 100%;
    width: 100%;
  }

  &__footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 80px;
    width: 100vw;
    z-index: 5;
  }*/
}
</style>
