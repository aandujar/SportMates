<template>
  <v-dialog v-model="dialog" persistent width="600">
    <div class="dialog-create-event">
      <div
        class="
          dialog-create-event__title
          w-100
          pa-4
          flex-row flex-row--centered flex-row--aligned
        "
      >
        <h2>{{ $text.newEvent }}</h2>
        <v-icon class="align-right pointer" medium color="white" @click="close">
          mdi-close
        </v-icon>
      </div>
      <div class="w-100 dialog-create-event__content">
        <v-row cols="12" xs="12">
          <v-autocomplete
            :items="event.sport"
            v-model="eventModel.sport"
            dense
            :label="$text.sport"
            clearable
            item-text="name"
            return-object
            :error-messages="sportErrors"
          ></v-autocomplete>
        </v-row>
        <v-row cols="12" xs="12" class="flex-row flex-row--wrapped">
          <v-text-field
            v-model="eventModel.numberOfParticipants"
            :label="$text.numberOfParticipants"
            type="number"
            class="textfield-margin-right"
            :error-messages="numberOfParticipantsErrors"
            @input="$v.eventModel.numberOfParticipants.$touch()"
            @blur="$v.eventModel.numberOfParticipants.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="eventModel.duration"
            :label="$text.duration"
            type="number"
            class="textfield-margin-left"
            :suffix="getDurationSuffix"
            :error-messages="durationErrors"
            @input="$v.eventModel.duration.$touch()"
            @blur="$v.eventModel.duration.$touch()"
          ></v-text-field>
        </v-row>
        <v-row cols="12" xs="12">
          <Map
            creation
            :latitude="getLatitude"
            :longitude="getLongitude"
            @position="getPosition"
          />
        </v-row>
        <v-row cols="12" xs="12">
          <v-text-field
            class="pointer"
            :value="$formatEventUbication(eventModel)"
            :label="$text.address"
            readonly
            :error-messages="latitudeLongitudeErrors"
          ></v-text-field>
        </v-row>
        <v-row cols="12" xs="12">
          <v-text-field
            v-model="eventModel.observation"
            :label="$text.observations"
            maxlength="50"
            counter="50"
            :error-messages="observationErrors"
            @input="$v.eventModel.observation.$touch()"
            @blur="$v.eventModel.observation.$touch()"
          ></v-text-field>
        </v-row>
        <v-row cols="12" xs="12">
          <DatePicker
            ref="datePicker"
            required
            :minDate="$getCurrentDate()"
            v-model="date"
          />
          <TimePicker
            ref="timePicker"
            required
            :minTime="$getMinTime(date)"
            v-model="time"
          />
        </v-row>
        <v-row cols="12" xs="12">
          <v-btn
            rounded
            color="primary"
            class="align-right"
            :loading="event.status === 'loading'"
            @click="createEvent"
          >
            Crear
          </v-btn>
        </v-row>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import Map from "@/components/Map";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";

import {
  required,
  maxLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";

export default {
  name: "DialogCreatEvent",
  components: { Map, DatePicker, TimePicker },
  data() {
    return {
      center: 0,
      dialog: true,
      date: "",
      time: "",
      eventModel: {
        latitude: "",
        longitude: "",
        direction: "",
        city: "",
        province: "",
        country: "",
        postalCode: null,
        observation: "",
        sport: {
          code: "",
        },
        numberOfParticipants: "",
        date: "",
        duration: "",
        creator: { id: null },
      },
    };
  },
  validations: {
    date: { required },
    time: { required },
    eventModel: {
      observation: { maxLength: maxLength(50) },
      latitude: { required, maxLength: maxLength(100) },
      longitude: { required, maxLength: maxLength(100) },
      city: { required, maxLength: maxLength(100) },
      province: { required, maxLength: maxLength(100) },
      country: { required, maxLength: maxLength(100) },
      numberOfParticipants: {
        required,
        minValue: minValue(2),
        maxValue: maxValue(300),
      },
      sport: { code: { required } },
      duration: { required, minValue: minValue(1), maxValue: maxValue(12) },
    },
  },
  computed: {
    ...mapState(["event"]),
    ...mapGetters({ getUserId: "user/getUserId" }),
    getDurationSuffix() {
      let suffix = "";
      if (this.eventModel.duration.length > 0) {
        suffix =
          this.eventModel.duration === 1 ? this.$text.hour : this.$text.hours;
      }
      return suffix.toLowerCase();
    },
    getLatitude() {
      return this.eventModel.latitude.length > 0
        ? this.eventModel.latitude
        : null;
    },
    getLongitude() {
      return this.eventModel.longitude.length > 0
        ? this.eventModel.longitude
        : null;
    },
    observationErrors() {
      const errors = [];
      if (this.$v.eventModel.observation.$dirty) {
        !this.$v.eventModel.observation.maxLength &&
          errors.push(this.$text.maximumSizeExceeded);
      }
      return errors;
    },
    latitudeLongitudeErrors() {
      const errors = [];
      if (
        this.$v.eventModel.latitude.$dirty ||
        this.$v.eventModel.longitude.$dirty
      ) {
        (!this.$v.eventModel.latitude.maxLength ||
          !this.$v.eventModel.longitude.maxLength) &&
          errors.push(this.$text.maximumSizeExceeded);
        (!this.$v.eventModel.latitude.required ||
          !this.$v.eventModel.longitude.required) &&
          errors.push(this.$text.mustSelectUbicationInMap);
      }
      return errors;
    },
    numberOfParticipantsErrors() {
      const errors = [];
      if (this.$v.eventModel.numberOfParticipants.$dirty) {
        !this.$v.eventModel.numberOfParticipants.maxValue &&
          errors.push(this.$text.maxValue300);
        !this.$v.eventModel.numberOfParticipants.minValue &&
          errors.push(this.$text.minValue2);
        !this.$v.eventModel.numberOfParticipants.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
    durationErrors() {
      const errors = [];
      if (this.$v.eventModel.duration.$dirty) {
        !this.$v.eventModel.duration.maxValue &&
          errors.push(this.$text.maxValue12);
        !this.$v.eventModel.duration.minValue &&
          errors.push(this.$text.minValue1);
        !this.$v.eventModel.duration.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (this.$v.date.$dirty) {
        !this.$v.date.required && errors.push(this.$text.requiredField);
      }
      return errors;
    },
    sportErrors() {
      const errors = [];
      if (this.$v.eventModel.sport.code.$dirty) {
        !this.$v.eventModel.sport.code.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
  },
  methods: {
    saveDate(date) {
      this.$refs.menuDate.save(date);
    },
    getPosition(position) {
      this.eventModel.latitude = position.lat.toString();
      this.eventModel.longitude = position.lng.toString();
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.eventModel.latitude}&lon=${this.eventModel.longitude}`
        )
        .then((response) => {
          this.eventModel.province = response.data.address.state;
          this.eventModel.country = response.data.address.country;

          if (response.data.name) {
            this.eventModel.direction = response.data.name;
          }

          if (response.data.address.postcode) {
            this.eventModel.postalCode = response.data.address.postcode;
          }

          if (response.data.address.city) {
            this.eventModel.city = response.data.address.city;
          } else if (response.data.address.town) {
            this.eventModel.city = response.data.address.town;
          } else {
            this.eventModel.city = response.data.address.village;
          }
        })
        .catch(() => this.$errorMessage(this.$text.errorOcurred));
    },
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.eventModel.date = `${this.date} ${this.time}`;
        this.$store
          .dispatch("event/createEvent", this.eventModel)
          .then(() => {
            this.$infoMessage(this.$text.eventCreated);
            this.close();
          })
          .catch((error) => {
            const message = error.response.data
              ? error.response.data
              : this.$text.errorOcurred;
            this.$errorMessage(message);
          });
      } else {
        this.$refs.datePicker.$v.$touch();
        this.$refs.timePicker.$v.$touch();
        this.$errorMessage(this.$text.mustEnterAllFields);
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-create-event {
  background-color: white;

  &__title {
    color: white;
    background-color: $blue-primary;
    height: 70px;
    font-size: 16px;
  }

  &__content {
    padding: 30px;

    @media (min-width: 500px) {
      .textfield-margin-left {
        margin-left: 5px;
      }

      .textfield-margin-right {
        margin-right: 5px;
      }
    }
  }
}
</style>