<template>
  <div class="main">
    <Toolbar ref="toolbar" class="main__toolbar" />
    <div class="main__content" @click="closeMenu">
      <router-view />
    </div>
    <ChatsContainer />
    <FloatingButton @clicked="toggleShowDialog" />
    <DialogCreateEvent v-if="showDialog" @close="toggleShowDialog" />
    <Chat
      v-if="event !== null"
      :event="event"
      @close="closeChat"
      @minimize="minimizeChat"
    />
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import FloatingButton from "@/components/FloatingButton";
import ChatsContainer from "@/components/ChatsContainer";

import { EventBus } from "@/plugins/EventBus";

export default {
  name: "Main",
  data() {
    return {
      loading: true,
      showDialog: false,
      event: null,
    };
  },
  components: {
    Toolbar,
    FloatingButton,
    ChatsContainer,
    DialogCreateEvent: () => import("@/components/DialogCreateEvent"),
    Chat: () => import("@/components/Chat"),
  },
  created() {
    EventBus.$on("showChat", (event) => {
      this.event = event;
    });
  },
  methods: {
    closeMenu() {
      this.$refs.toolbar.closeMenu();
    },
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
    minimizeChat() {
      EventBus.$emit("addEvent", this.event);
      this.event = null;
    },
    closeChat() {
      EventBus.$emit("closeEvent", this.event);
      this.event = null;
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