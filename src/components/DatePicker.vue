<template>
  <div class="date-picker">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      class="textfield-margin-rigth"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="formattedDate"
          :label="$text.startDate"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :append-icon="clearable && formattedDate.length > 0 ? 'mdi-close' : ''"
          :error-messages="dateErrors"
          @click:append="emptyDate"
          @input="$v.date.$touch()"
          @blur="$v.date.$touch()"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="datePicker"
        :min="minDate"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { requiredIf } from "vuelidate/lib/validators";

export default {
  name: "DatePicker",
  props: {
    minDate: { type: String, required: false },
    required: { type: Boolean, required: false },
    clearable: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      menu: false,
      datePicker: null,
      date: "",
    };
  },
  validations: {
    date: {
      required: requiredIf(function () {
        return this.required;
      }),
    },
  },
  watch: {
    date() {
      this.$emit("input", this.formattedDate);
    },
  },
  computed: {
    formattedDate() {
      let dateFormatted = "";
      if (this.date.length > 0) {
        const dateSplitted = this.date.split("-");
        dateFormatted = `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}`;
      }
      return dateFormatted;
    },
    dateErrors() {
      const errors = [];
      if (this.$v.date.$dirty) {
        !this.$v.date.required && errors.push(this.$text.requiredField);
      }
      return errors;
    },
  },
  methods: {
    emptyDate() {
      this.date = "";
    },
  },
};
</script>