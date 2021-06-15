<template>
  <div class="event-filter flex-column pa-4">
    <div
      class="flex-row flex-row--wrapped flex-row--content-end w-100 mb-2"
    >
      <transition name="fade">
        <v-icon
          v-show="filterApplied"
          medium
          color="primary"
          @click="emptyFilter"
        >
          mdi-close-circle
        </v-icon>
      </transition>
      <transition name="fade" mode="out-in">
        <v-icon v-if="showFilter" medium color="primary" @click="toggleFilter">
          mdi-filter-remove
        </v-icon>
        <v-icon v-else medium color="primary" @click="toggleFilter">
          mdi-filter-plus
        </v-icon>
      </transition>
    </div>
    <div
      class="flex-row flex-row--wrapped"
      id="filter"
      :class="{ 'show-filter': showFilter, 'hide-filter': !showFilter }"
    >
      <!-- sport -->
      <v-autocomplete
        :items="combo.sport"
        v-model="filter.sport"
        outlined
        dense
        label="Deportes"
        chips
        clearable
        multiple
        item-text="name"
        item-value="code"
        @change="getEvents"
      ></v-autocomplete>
      <!-- country -->
      <v-autocomplete
        :items="combo.country"
        v-model="filter.country"
        outlined
        dense
        label="Pais"
        chips
        clearable
        multiple
        item-text="name"
        item-value="code"
        @change="countrySelected"
      ></v-autocomplete>
      <!-- province -->
      <v-autocomplete
        :items="getProvinces"
        v-model="filter.province"
        outlined
        dense
        label="Provincia"
        chips
        clearable
        multiple
        item-text="name"
        item-value="code"
        @change="provinceSelected"
      ></v-autocomplete>
      <!-- city -->
      <v-autocomplete
        :items="getCities"
        v-model="filter.city"
        outlined
        dense
        label="Ciudad"
        chips
        clearable
        multiple
        item-text="name"
        item-value="code"
        @change="getEvents"
      ></v-autocomplete>
      <!-- start date -->
      <v-menu
        ref="menuStartDate"
        v-model="menuStartDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="filter.startDate"
            label="Día de inicio"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filter.startDate"
          :active-picker.sync="activeStartDatePicker"
          :min="getMinimumStartDate"
          @change="saveStartDate"
        ></v-date-picker>
      </v-menu>
      <!-- finish date -->
      <v-menu
        ref="menuFinishDate"
        v-model="menuFinishDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="filter.finishDate"
            label="Día de fin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filter.finishDate"
          :active-picker.sync="activeFinishDatePicker"
          @change="saveFinishDate"
        ></v-date-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "EventFilter",
  props: { combo: { Type: Object, required: true } },
  data() {
    return {
      activeStartDatePicker: null,
      activeFinishDatePicker: null,
      menuStartDate: false,
      menuFinishDate: false,
      showFilter: false,
      filter: {
        sport: [],
        country: [],
        province: [],
        city: [],
        startDate: null,
        finishDate: null,
      },
    };
  },
  watch: {
    "filter.startDate"() {
      this.compareDates();
    },
    "filter.finishDate"() {
      this.compareDates();
    }
  },
  computed: {
    filterApplied() {
      const sportSelected = this.filter.sport.length > 0;
      const countrySelected = this.filter.country.length > 0;
      const provinceSelected = this.filter.province.length > 0;
      const citySelected = this.filter.city.length > 0;
      const startDateSelected = this.filter.startDate !== null;
      const finishDateSelected = this.filter.finishDate !== null;
      return (
        sportSelected ||
        countrySelected ||
        provinceSelected ||
        citySelected ||
        startDateSelected ||
        finishDateSelected
      );
    },
    getMinimumStartDate() {
      const today = new Date();
      return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    },
    getProvinces() {
      return this.filter.country.length === 0
        ? this.combo.province
        : this.combo.province.filter(
            (province) =>
              this.filter.country.findIndex(
                (country) => country === province.country.code
              ) > -1
          );
    },
    getCities() {
      return this.filter.province.length === 0
        ? this.combo.city
        : this.combo.city.filter(
            (city) =>
              this.filter.province.findIndex(
                (province) => province === city.province.code
              ) > -1
          );
    },
  },
  methods: {
    saveStartDate(date) {
      this.$refs.menuStartDate.save(date);
      this.getEvents();
    },
    saveFinishDate(date) {
      this.$refs.menuFinishDate.save(date);
      this.getEvents();
    },
    compareDates() {
      if (moment(this.startDate) > moment(this.finishDate)) {
        this.finishDate = this.startDate;
      }
    },
    countrySelected() {
      if (this.filter.country.length > 0) {
        this.filter.province = this.filter.province.filter((province) => {
          const provinceObject = this.combo.province.find(
            (fullProvince) => fullProvince.code === province
          );
          return (
            this.filter.country.findIndex(
              (country) => country === provinceObject.country.code
            ) > -1
          );
        });
      }
      this.provinceSelected();
    },
    provinceSelected() {
      console.log("entra1")
      if (this.filter.province.length > 0) {
        this.filter.city = this.filter.city.filter((city) => {
          const cityObject = this.combo.city.find(
            (fullCity) => fullCity.code === city
          );
          return (
            this.filter.city.findIndex(
              (city) => city === cityObject.province.code
            ) > -1
          );
        });
      }
      this.getEvents();
    },
    getEvents() {
      console.log("entra2")
      this.$emit("filter", this.filter);
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    emptyFilter() {
      this.filter.sport = [];
      this.filter.country = [];
      this.filter.province = [];
      this.filter.city = [];
      this.filter.startDate = null;
      this.filter.finishDate = null;
      this.getEvents();
    },
  },
};
</script>

<style lang="scss" scoped>
.event-filter {
  min-height: 40px;
  width: 95%;
  background-color: white;
}

.show-filter {
  min-height: 50px;
  transition: min-height 0.15s ease-out;
  transform: scaleY(1);
  transform-origin: top;
  transition: transform 0.26s ease;
}
.hide-filter {
  height: 0px;
  transition: height 0.15s ease-out;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.26s ease;
}
</style>