<template>
  <div class="register center-items flex-column">
    <v-col cols="12" xs="12">
      <h3 class="text text--big text--bold">Registro</h3>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        label="Nombre"
        v-model="newUser.name"
        counter="50"
        maxlength="50"
        type="text"
        :error-messages="nameErrors"
        @input="$v.newUser.name.$touch()"
        @blur="$v.newUser.name.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        label="Apellidos"
        v-model="newUser.surnames"
        counter="50"
        maxlength="50"
        type="text"
        :error-messages="surnamesErrors"
        @input="$v.newUser.surnames.$touch()"
        @blur="$v.newUser.surnames.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        label="Email"
        v-model="newUser.email"
        type="text"
        counter="50"
        maxlength="50"
        :error-messages="emailErrors"
        @input="$v.newUser.email.$touch()"
        @blur="$v.newUser.email.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        label="Contraseña"
        v-model="newUser.password"
        counter="50"
        maxlength="50"
        :type="showPassword ? 'text' : 'password'"
        :error-messages="passwordErrors"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showPassword = !showPassword)"
        @input="$v.newUser.password.$touch()"
        @blur="$v.newUser.password.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        label="Repetir contraseña"
        v-model="repeatPassword"
        counter="50"
        maxlength="50"
        :type="showRepeatPassword ? 'text' : 'password'"
        :append-icon="showRepeatPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (showRepeatPassword = !showRepeatPassword)"
        :error-messages="repeatPasswordErrors"
        @input="$v.repeatPassword.$touch()"
        @blur="$v.repeatPassword.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="newUser.bornDate"
            label="Fecha de nacimiento"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="newUser.bornDate"
          :active-picker.sync="activePicker"
          :max="getMinimumBornDate"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-btn
        rounded
        color="primary"
        :loading="user.status === 'loading'"
        @click="createUser"
        @keyup.enter="createUser"
      >
        Registrarse
      </v-btn>
    </v-col>
    <transition name="slide-fade">
      <div
        class="text text--medium text--error"
        v-show="errorMessage.length > 0"
      >
        {{ errorMessage }}
      </div>
    </transition>
    <v-col cols="12" xs="12"
      ><div class="pointer-underlined" @click="$emit('change')">
        ¿Ya estás registrado? Haz clic aquí
      </div></v-col
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: function () {
    return {
      menu: false,
      activePicker: null,
      errorMessage: "",
      showPassword: false,
      showRepeatPassword: false,
      repeatPassword: "",
      newUser: {
        name: "",
        surnames: "",
        email: "",
        password: "",
        bornDate: "",
      },
    };
  },
  validations: {
    newUser: {
      name: { required, minLength: minLength(1), maxLength: maxLength(50) },
      surnames: { required, minLength: minLength(1), maxLength: maxLength(50) },
      email: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(50),
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50),
        valid: function (value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return (
            containsUppercase &&
            containsLowercase &&
            containsNumber &&
            containsSpecial
          );
        },
      },
      bornDate: { required, minLength: minLength(1), maxLength: maxLength(50) },
    },
    repeatPassword: {
      sameAs: sameAs(function () {
        return this.newUser.password;
      }),
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    ...mapState(["user"]),
    getMinimumBornDate() {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 18);
      return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    },
    nameErrors() {
      const errors = [];
      if (this.$v.newUser.name.$dirty) {
        !this.$v.newUser.name.maxLength && errors.push("Campo incorrecto");
        !this.$v.newUser.name.minLength && errors.push("Campo incorrecto");
        !this.$v.newUser.name.required && errors.push("Campo incorrecto");
      }
      return errors;
    },
    surnamesErrors() {
      const errors = [];
      if (this.$v.newUser.surnames.$dirty) {
        !this.$v.newUser.surnames.maxLength && errors.push("Campo incorrecto");
        !this.$v.newUser.surnames.minLength && errors.push("Campo incorrecto");
        !this.$v.newUser.surnames.required && errors.push("Campo incorrecto");
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (this.$v.newUser.email.$dirty) {
        !this.$v.newUser.email.maxLength && errors.push("Campo incorrecto");
        !this.$v.newUser.email.minLength && errors.push("Campo incorrecto");
        !this.$v.newUser.email.email && errors.push("Campo incorrecto");
        !this.$v.newUser.email.required && errors.push("Campo incorrecto");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (this.$v.newUser.password.$dirty) {
        !this.$v.newUser.password.valid && errors.push("No valido");
        !this.$v.newUser.password.maxLength && errors.push("Campo incorrecto");
        !this.$v.newUser.password.minLength && errors.push("Campo incorrecto");
        !this.$v.newUser.password.required && errors.push("Campo incorrecto");
      }
      return errors;
    },
    bornDateErrors() {
      const errors = [];
      if (this.$v.newUser.bornDate.$dirty) {
        !this.$v.newUser.bornDate.maxLength && errors.push("Campo incorrecto");
        !this.$v.newUser.bornDate.minLength && errors.push("Campo incorrecto");
        !this.$v.newUser.bornDate.required && errors.push("Campo incorrecto");
      }
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (this.$v.repeatPassword.$dirty) {
        !this.$v.repeatPassword.sameAs && errors.push("Campo incorrecto");
      }
      return errors;
    },
  },
  methods: {
    createUser() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("user/register", this.newUser)
        .then(() => this.$emit("logged") )
        .catch(() => {
          this.errorMessage = "Ha ocurrido un error";
          this.emptyErrorMessage();
        });
      } else {
        this.errorMessage = "Datos incorrectos";
        this.$v.$touch();
        this.emptyErrorMessage();
      }
    },
    emptyErrorMessage() {
      setTimeout(() => {
        this.errorMessage = "";
      }, 2000);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 30vw;
  min-height: 30vh;
  background-color: white;
}

@media (max-width: 1300px) {
  .register {
    width: 50vw;
  }
}

@media (max-width: 700px) {
  .register {
    width: 80vw;
  }
}
</style>