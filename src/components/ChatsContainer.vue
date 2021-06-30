<template>
  <div class="chats-container pa-4">
    <div
      class="chats-container__image mb-4 pointer"
      v-for="event in events"
      :key="event.id"
      @click="showChat(event)"
    >
      <v-img
        class="chats-container__image__img"
        :src="require(`@/assets/${getImage(event)}`)"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/plugins/EventBus";

export default {
  name: "ChatsContainer",
  data: function () {
    return {
      events: [],
    };
  },
  created() {
    EventBus.$on("addEvent", (event) => {
      const eventIndex = this.getEventIndex(event);
      if (eventIndex === -1) {
        this.events.push(event);
      }
    });

    EventBus.$on("closeEvent", (event) => {
      console.log(event);
      const eventIndex = this.getEventIndex(event);
      console.log(eventIndex);
      if (eventIndex > -1) {
        this.events.splice(eventIndex, 1);
      }
    });
  },
  methods: {
    getEventIndex(event) {
      return this.events.findIndex((ev) => ev.id === event.id);
    },
    showChat(event) {
      EventBus.$emit("showChat", event);
    },
    getImage(event) {
      let image = "";
      switch (event.sport.code) {
        case "CI":
          image = "cycling.jpg";
          break;
        case "FT":
          image = "football.jpg";
          break;
        case "SE":
          image = "treeking.jpg";
          break;
        default:
          image = "surf.jpg";
          break;
      }
      return image;
    },
  },
};
</script>

<style lang="scss" scoped>
.chats-container {
  height: calc(100vh - 70px);
  width: 80px;
  position: fixed;
  z-index: 100;
  top: 70px;
  left: 40;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__image {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;

    &__img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>