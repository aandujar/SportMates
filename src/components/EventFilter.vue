<template>
  <div
    class="event-filter flex-column pa-4"
    :class="{
      'event-filter--big': showFilter,
      'event-filter--small': !showFilter,
    }"
  >
    <div class="flex-row w-100">
      <span>{{ eventTypeMessage }}</span>
      <div class="align-right">
        <transition name="fade">
          <v-icon
            v-show="filterApplied"
            class="mx-1"
            medium
            color="primary"
            @click="emptyFilter"
          >
            mdi-close-circle
          </v-icon>
        </transition>
        <transition name="fade" mode="out-in">
          <v-icon
            v-if="showFilter"
            class="mx-1"
            medium
            color="primary"
            @click="toggleFilter"
          >
            mdi-filter-remove
          </v-icon>
          <v-icon
            v-else
            class="mx-1"
            medium
            color="primary"
            @click="toggleFilter"
          >
            mdi-filter-plus
          </v-icon>
        </transition>
        <v-icon class="mx-1" medium color="primary" @click="getEvents">
          mdi-refresh
        </v-icon>
      </div>
    </div>
    <div
      class="event-filter__content"
      :class="{
        'event-filter__content--show': showFilter,
        'event-filter__content--hide': !showFilter,
      }"
    >
      <!-- main data -->
      <div class="flex-row flex-row--wrapped">
        <!-- sport -->
        <v-autocomplete
          class="mr-2"
          :items="sports"
          v-model="filter.sport"
          :label="$text.sports"
          clearable
          item-text="name"
          item-value="code"
          @change="getEvents"
        ></v-autocomplete>
        <!-- country -->
        <v-text-field
          class="mr-2"
          :label="$text.country"
          v-model="filter.country"
          v-on:input="debounce"
        ></v-text-field>
        <!-- province -->
        <v-text-field
          class="mr-2"
          :label="$text.province"
          v-model="filter.province"
          @input="debounce"
        ></v-text-field>
        <!-- city -->
        <v-text-field
          class="mr-2"
          :label="$text.city"
          v-model="filter.city"
          @input="debounce"
        ></v-text-field>
        <!-- postalCode -->
        <v-text-field
          class="mr-2"
          :label="$text.postalCode"
          v-model="filter.postalCode"
          @input="debounce"
        ></v-text-field>
        <!-- direction -->
        <v-text-field
          class="mr-2"
          :label="$text.address"
          v-model="filter.direction"
          @input="debounce"
        ></v-text-field>
      </div>
      <!-- temporal data -->
      <div class="flex-row flex-row--wrapped">
        <!-- start date -->
        <DatePicker
          ref="datePicker"
          :minDate="$getCurrentDate()"
          clearable
          v-model="startDate"
        />
        <!-- start hour -->
        <TimePicker
          ref="timePicker"
          v-model="startTime"
          :minTime="$getMinTime(startDate)"
          :disabled="startDate.length === 0"
        />
        <!-- finish date -->
        <DatePicker
          ref="datePicker"
          :minDate="$getCurrentDate()"
          clearable
          v-model="finishDate"
        />
        <!-- finish hour -->
        <TimePicker
          ref="timePicker"
          v-model="finishTime"
          :minTime="$getMinTime(finishDate)"
          :disabled="finishDate.length === 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import moment from "moment";
import _ from "lodash";
import routes from "@/router/routesInterface";

export default {
  name: "EventFilter",
  components: {
    DatePicker,
    TimePicker,
  },
  props: { sports: { Type: Array, required: true } },
  data() {
    return {
      startDate: "",
      startTime: "",
      finishDate: "",
      finishTime: "",
      showFilter: false,
      filter: {
        sport: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        direction: "",
        startDate: null,
        finishDate: null,
      },
    };
  },
  watch: {
    startDate() {
      console.log("entra");
      //hay que comparar las fechas primero
      this.getEvents();
    },
    startTime() {
      //hay que comparar las fechas primero
      this.getEvents();
    },
    finishDate() {
      console.log("entra");
      //hay que comparar las fechas primero
      this.getEvents();
    },
    finishTime() {
      //hay que comparar las fechas primero
      this.getEvents();
    },
  },
  computed: {
    eventTypeMessage() {
      let message;
      switch (this.$route.path) {
        case routes.unsubscripted:
          message = this.$text.eventsToInscript;
          break;
        case routes.owned:
          message = this.$text.eventsOwned;
          break;
        case routes.inscripted:
          message = this.$text.eventsJustInscripted;
          break;
        default:
          message = "";
          break;
      }
      return message;
    },
    filterApplied() {
      const sportSelected =
        this.filter.sport !== null && this.filter.sport.length > 0;
      const countrySelected = this.filter.country.length > 0;
      const provinceSelected = this.filter.province.length > 0;
      const citySelected = this.filter.city.length > 0;
      const directionSelected = this.filter.direction.length > 0;
      const startDateSelected = this.filter.startDate !== null;
      const finishDateSelected = this.filter.finishDate !== null;
      return (
        sportSelected ||
        countrySelected ||
        provinceSelected ||
        citySelected ||
        directionSelected ||
        startDateSelected ||
        finishDateSelected
      );
    },
    getMinimumStartDate() {
      const today = new Date();
      return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    },
  },
  created() {
    this.getEvents();
  },
  methods: {
    debounce: _.debounce(function () {
      this.getEvents();
    }, 200),
    compareDates() {
      //TO DO
      if (moment(this.startDate) > moment(this.finishDate)) {
        this.finishDate = this.startDate;
      }
      this.getEvents();
    },
    formatDate(type) {
      const date = `${type}Date`;
      const time = `${type}Time`;
      if (this[date] && this[date].length > 0) {
        const timeValue =
          this[time] && this[time].length > 0 ? this[time] : "00:00:00";
        this.filter[date] = `${this[date]} ${timeValue}`;
      } else {
        this.filter[date] = null;
      }
    },
    getEvents() {
      this.formatDate("start");
      this.formatDate("finish");
      this.$emit("filter", this.filter);
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    emptyFilter() {
      this.startTime = "";
      this.finishTime = "";
      this.startDate = "";
      this.finishDate = "";
      this.filter.sport = "";
      this.filter.country = "";
      this.filter.province = "";
      this.filter.city = "";
      this.filter.direction = "";
      this.filter.postalCode = "";
      this.filter.startDate = null;
      this.filter.finishDate = null;
      this.filter.startTime = null;
      this.filter.finishTime = null;
      this.getEvents();
    },
  },
};
</script>

<style lang="scss" scoped>
.event-filter {
  width: 95%;
  background-color: white;
  min-height: 40px;
  padding-left: 30%;

  &--big {
    min-height: 200px;
    transition: min-height 0.1s ease;
  }

  &--small {
    min-height: 40px;
    transition: min-height 0.3s ease;
  }

  &__content {
    &--show {
      min-height: 50px;
      transition: min-height 0.15s ease-out;
      transform: scaleY(1);
      transform-origin: top;
      transition: transform 0.26s ease;
    }

    &--hide {
      height: 0px;
      transition: height 0.15s ease-out;
      transform-origin: top;
      transform: scaleY(0);
      transition: transform 0.26s ease;
    }
  }
}
</style>