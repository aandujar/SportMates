<template>
  <div class="login center-items flex-column">
    <v-col cols="12" xs="12">
      <h3 class="text text--big text--bold">Login</h3>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Usuario"
        v-model="username"
        @keyup.enter="login"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        prepend-inner-icon="mdi-lock"
        label="Contraseña"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @keyup.enter="login"
        @click:append="() => (showPassword = !showPassword)"
      ></v-text-field>
    </v-col>
    <transition name="slide-fade">
      <div
        class="text text--medium text--error"
        v-show="errorMessage.length > 0"
      >
        {{ errorMessage }}
      </div>
    </transition>
    <v-col cols="12" sm="12" md="6">
      <v-btn
        rounded
        color="primary"
        :loading="user.status === 'loading'"
        @click="login"
      >
        Acceder
      </v-btn>
    </v-col>
    <v-col cols="12" xs="12"
      ><div class="pointer-underlined" @click="$emit('change')">
        ¿Aun no estás registrado? Haz clic aquí
      </div></v-col
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      errorMessage: "",
      showPassword: false,
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    hideErrorMessage() {
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
    },
    login() {
      if (this.$v.$invalid) {
        this.errorMessage = "Debes introducir usuario y contraseña";
        this.hideErrorMessage();
      } else {
        this.$store
          .dispatch("user/login", {
            username: this.username,
            password: this.password,
          })
          .then(() => this.$emit("logged"))
          .catch(() => {
            this.errorMessage = "Usuario o contraseña incorrectos";
            this.hideErrorMessage();
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 30vw;
  min-height: 30vh;
  background-color: white;
}

@media (max-width: 1300px) {
  .login {
    width: 50vw;
  }
}

@media (max-width: 700px) {
  .login {
    width: 80vw;
  }
}
</style>