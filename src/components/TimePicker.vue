<template>
  <div class="time-picker">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      class="textfield-margin-left"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :label="$text.startHour"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
          :error-messages="timeErrors"
          @input="$v.time.$touch()"
          @blur="$v.time.$touch()"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu"
        v-model="time"
        full-width
        :disabled="disabled"
        :min="minTime"
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
import { requiredIf } from "vuelidate/lib/validators";

export default {
  name: "TimePicker",
  props: {
    minTime: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      menu: null,
      time: "",
    };
  },
  validations: {
    time: {
      required: requiredIf(function () {
        return this.required;
      }),
    },
  },
  watch: {
    time() {
      this.emitTime();
    },
    disabled() {
      if (this.disabled) {
        this.time = "";
      }
    },
    minTime() {
      if (this.checkIfSelectedTimeHigherThanMinTime()) {
        this.$refs.menu.save("");
        this.time = "";
      }
    },
  },
  computed: {
    timeErrors() {
      const errors = [];
      if (this.$v.time.$dirty) {
        !this.$v.time.required && errors.push(this.$text.requiredField);
      }
      return errors;
    },
  },
  methods: {
    checkIfSelectedTimeHigherThanMinTime() {
      let isHigher = false;
      if (this.time.length > 0 && this.minTime) {
        const splitedTime = this.time.split(":");
        const splitedMinTime = this.minTime.split(":");
        // hour lower or same hour and minutes higher or equal
        isHigher =
          Number(splitedTime[0]) < Number(splitedMinTime[0]) ||
          (Number(splitedTime[0]) === Number(splitedMinTime[0]) &&
            Number(splitedTime[1]) >= Number(splitedMinTime[1]));
      }
      return isHigher;
    },
    emitTime() {
      this.$emit("input", this.time.length > 0 ? `${this.time}:00` : "");
    },
  },
};
</script>