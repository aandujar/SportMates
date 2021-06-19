<template>
  <div class="inscripted-events flex-column mt-2 pa-4">
    <!-- loading -->
    <DialogLoader v-show="isLoading" />
    <div class="flex-row flex-row--centered w-100">
      <EventFilter :sports="event.sports" @filter="getEvents" />
    </div>
    <div class="flex-row flex-row--centered flex-row--wrapped">
      <Event
        class="ma-2"
        v-for="currentEvent in event.suscriptedEvents"
        :key="currentEvent.id"
        :event="currentEvent"
        :disabled="isLoading"
        inscripted
        @unsuscript="unsuscriptToEvent"
      />
    </div>
    <div class="flex-row flex-row--centered w-100">
      <v-pagination v-model="page" circle :length="maxPages"></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EventFilter from "@/components/EventFilter";
import DialogLoader from "@/components/DialogLoader";

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
    DialogLoader,
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
      return this.event.status === "loading";
    },
  },
  created() {
    this.getEvents();
  },
  beforeDestroy() {
    this.$store.commit("event/SET_SUSCRIPTED_EVENTS", []);
  },
  methods: {
    unsuscriptToEvent(eventId) {
      this.$store
        .dispatch("event/unsuscribeUserToEvent", {
          eventId: eventId,
          userId: this.getUserId,
        })
        .then(() => {
          this.getEvents();
          this.$infoMessage;
          this.$infoMessage("Te has desisincrito del evento correctamente");
        })
        .catch((error) => this.$errorMessage(error.response.data));
    },
    getEvents(filter = null) {
      if (filter !== null) {
        this.filter = Object.assign({}, filter);
      }
      this.$store
        .dispatch("event/getSuscriptedEvents", {
          params: {
            userId: this.getUserId,
            page: this.page - 1,
            size: 16,
            sort: "id,ASC",
          },
          data: this.filter,
        })
        .then((response) => (this.maxPages = response.data.totalPages))
        .catch((error) => this.$errorMessage(error.response.data));
    },
  },
};
</script>

<style lang="scss" scoped>
.all-events {
  width: 100vw;
}
</style>