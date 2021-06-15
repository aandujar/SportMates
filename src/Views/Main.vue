<template>
  <div class="main">
    <Toolbar class="main__toolbar" />
    <div class="main__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Toolbar from "@/layout/Toolbar";
export default {
  name: "Main",
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Toolbar,
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #cfd8dc;
  min-height: 100vh;
  width: 100%;

  &__toolbar {
    z-index: 10;
    position: fixed;
    width: 100%;
  }

  &__content {
    padding-top: 70px;
    z-index: 0;
    position: relative;
  }
}
</style>