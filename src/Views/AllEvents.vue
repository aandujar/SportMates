<template>
  <div class="all-events flex-column mt-2 pa-4">
    <!-- loading -->
    <DialogLoader v-if="isLoading" />
    <div class="flex-row flex-row--centered w-100">
      <EventFilter :sports="event.sport" @filter="getEvents" />
    </div>
    <div class="flex-row flex-row--centered flex-row--wrapped" v-show="showEvents">
      <Event
        class="ma-2"
        v-for="currentEvent in event.events"
        :key="currentEvent.id"
        :event="currentEvent"
        :disabled="isLoading"
        all
        @suscript="addToEvent"
      />
    </div>
    <!-- no events -->
    <div v-show="!showEvents">
      <NoData />
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
import NoData from "@/components/NoData";

export default {
  name: "Events",
    components: {
    EventFilter,
    DialogLoader,
    NoData,
    Event: () => import("@/components/Event"),
  },
  data() {
    return {
      page: 1,
      maxPages: null,
      filter: {},
    };
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
    showEvents() {
      return this.event.events.length > 0 && !this.loading;
    }
  },
  beforeDestroy() {
    this.$store.commit("event/SET_EVENTS", []);
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
          this.$infoMessage(this.$text.eventInscriptionCorrectly);
        })
        .catch((error) => this.$errorMessage(error.response.data));
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
            size: 16,
            sort: "id,ASC",
          },
          data: this.filter,
        })
        .then((response) => this.maxPages = response.data.totalPages)
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