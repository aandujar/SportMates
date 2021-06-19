<template>
  <div class="main">
    <Toolbar ref="toolbar" class="main__toolbar" />
    <div class="main__content" @click="closeMenu">
      <router-view />
    </div>
    <FloatingButton @clicked="toggleShowDialog" />
    <DialogCreateEvent v-if="showDialog" @close="toggleShowDialog" />
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import FloatingButton from "@/components/FloatingButton";

export default {
  name: "Main",
  data() {
    return {
      loading: true,
      showDialog: false,
    };
  },
  components: {
    Toolbar,
    FloatingButton,
    DialogCreateEvent: () => import("@/components/DialogCreateEvent"),
  },
  methods: {
    closeMenu() {
      this.$refs.toolbar.closeMenu();
    },
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
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