<template>
  <div class="floating-button center-items pointer" @click="clicked">
    <v-icon medium class="floating-button__icon"> mdi-plus-thick </v-icon>
  </div>
</template>

<script>
export default {
  name: "FloatingButton",
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.floating-button {
  border-radius: 50%;
  background-color: #3f51b5;
  height: 50px;
  width: 50px;
  bottom: 10px;
  right: 10px;
  position: fixed;

  &__icon {
    color: white;
  }

  &:hover {
    box-shadow: 0px 0px 23px -4px rgba(0, 0, 0, 0.77);
  }
}
</style>