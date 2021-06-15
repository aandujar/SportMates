<template>
  <div class="footer flex-row flex-row--space-between flex-row--aligned">
    <div class="bar-pl">
      <span class="text text--medium text--grey"
        >{{ getCurrentlyYear }} © We Are Marketing</span
      >
    </div>
    <div class="bar-pr">
      <img class="footer__image" alt="logo" src="../assets/wam.jpeg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    getCurrentlyYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100vw;
  background-color: white;

  &__image {
    height: 40px;
    width: 60px;
  }
}
</style>