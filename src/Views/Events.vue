<template>
  <div class="events flex-column mt-2 pa-4">
    <div class="flex-row flex-row--centered w-100">
      <EventFilter :combo="event.combo" @filter="getEvents" />
    </div>
    <div class="flex-row flex-row--centered flex-row--wrapped">
      <Event
        class="ma-2"
        v-for="currentEvent in event.events"
        :key="currentEvent.id"
        :event="currentEvent"
        :disabled="isLoading"
        @addToEvent="addToEvent"
      />
    </div>
    <div class="flex-row flex-row--centered w-100">
      <v-pagination v-model="page" circle :length="maxPages"></v-pagination>
    </div>
    <!-- loading -->
    <v-dialog
      v-model="isLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Espere un momento...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EventFilter from "@/components/EventFilter";

export default {
  name: "Events",
  data() {
    return {
      page: 1,
      maxPages: null,
      filter: {
        sport: [],
        country: [],
        province: [],
        city: [],
      },
    };
  },
  components: {
    EventFilter,
    Event: () => import("@/components/Event"),
  },
  watch: {
    page() {
      this.getEvents();
    },
  },
  computed: {
    ...mapState(["event"]),
    ...mapGetters({ getUserId: "user/getUserId" }),
    isLoading() {
     return this.event.status === 'loading';
    }
  },
  created() {
    this.getEvents();
    this.getCombo();
  },
  methods: {
    addToEvent(eventId) {
      this.$store
        .dispatch("event/addUserToEvent", {
          eventId: eventId,
          userId: this.getUserId,
        })
        .then(() => {
          this.getEvents();
          this.$notify({
            text: "Te has inscrito al evento correctamente",
            type: "info",
            duration: 3000,
          });
        })
        .catch((error) => {
          this.$notify({
            text: error.response.data,
            type: "error",
            duration: 3000,
          });
        });
    },
    getEvents(filter = null) {
      if (filter !== null) {
        this.filter = Object.assign({}, filter);
      }
      this.$store
        .dispatch("event/getEvents", {
          params: {
            userId: this.getUserId,
            page: this.page - 1,
            size: 20,
            sort: "id,ASC",
          },
          data: this.filter,
        })
        .then((response) => (this.maxPages = response.data.totalPages))
        .catch((error) => {
          this.$notify({
            text: error.response.data,
            type: "error",
            duration: 3000,
          });
        });
    },
    getCombo() {
      this.$store.dispatch("event/getCombo").catch(() => {
        this.$notify({
          text: "Ha ocurrido un error",
          type: "error",
          duration: 3000,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  width: 100vw;
}
</style>