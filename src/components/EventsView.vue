<template>
  <div class="events-view flex-column mt-2 pa-4">
    <!-- loading -->
    <DialogLoader v-if="isLoading" />
    <div class="flex-row flex-row--centered w-100">
      <EventFilter :sports="event.sport" @filter="getEvents" />
    </div>
    <div
      class="flex-row flex-row--centered flex-row--wrapped"
      v-show="showEvents"
    >
      <Event
        class="ma-2"
        v-for="currentEvent in getEventsToShow"
        :key="currentEvent.id"
        :event="currentEvent"
        :disabled="isLoading"
        :unsubscripted="eventType === 'unsubscripted'"
        :inscripted="eventType === 'inscripted'"
        :owned="eventType === 'owned'"
        @inscribe="inscribe"
        @unsubscribe="unsubscribe"
        @remove="remove"
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
  name: "EventsView",
  components: {
    EventFilter,
    DialogLoader,
    NoData,
    Event: () => import("@/components/Event"),
  },
  props: { eventType: { type: String, required: true } },
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
    getEventsToShow() {
      return this.event[`${this.eventType}Events`];
    },
    getEventTypeCapitalized() {
      return `${this.eventType.charAt(0).toUpperCase()}${this.eventType.slice(
        1
      )}`;
    },
    isLoading() {
      return this.event.status === "loading";
    },
    showEvents() {
      return this.event[`${this.eventType}Events`].length > 0 && !this.loading;
    },
  },
  beforeDestroy() {
    this.$store.commit(`event/SET_${this.eventType.toUpperCase()}_EVENTS`, []);
  },
  methods: {
    showErrorMessage(error) {
      this.$errorMessage(
        error.response.data ? error.response.data : this.$text.errorOcurred
      );
    },
    inscribe(eventId) {
      this.$store
        .dispatch("event/inscribeToEvent", {
          eventId: eventId,
          userId: this.getUserId,
        })
        .then(() => {
          this.getEvents();
          this.$infoMessage(this.$text.eventInscriptionCorrectly);
        })
        .catch((error) => this.showErrorMessage(error));
    },
    unsubscribe(eventId) {
      this.$store
        .dispatch("event/unsubscribeToEvent", {
          eventId: eventId,
          userId: this.getUserId,
        })
        .then(() => {
          this.getEvents();
          this.$infoMessage(this.$text.eventUnsuscriptionCorrectly);
        })
        .catch((error) => this.showErrorMessage(error));
    },
    remove(eventId) {
      this.$store
        .dispatch("event/removeEvent", {
          eventId: eventId,
          userId: this.getUserId,
        })
        .then(() => {
          this.getEvents();
          this.$infoMessage(this.$text.eventDeletedCorrectly);
        })
        .catch((error) => this.showErrorMessage(error));
    },
    getEvents(filter = null) {
      if (filter !== null) {
        this.filter = Object.assign({}, filter);
      }
      this.$store
        .dispatch(`event/get${this.getEventTypeCapitalized}Events`, {
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
.events-view {
  width: 100vw;
}
</style>