<template>
  <div class="profile pa-4">
    <!-- loading -->
    <DialogLoader v-if="user.status === 'loading'" />
    <!-- avatar -->
    <div class="profile__avatar flex-column pa-4">
      <div class="profile__title text text--big mb-4">{{ $text.avatar }}</div>
      <div class="flex-column center-items">
        <v-img class="profile__avatar__image mb-4" :src="getUserAvatar"></v-img>
        <transition name="fade" mode="out-in">
          <div
            v-if="changeImage"
            class="center-items flex-column"
            key="changeImage"
          >
            <vue-dropzone
              class="profile__avatar__dropzone mb-4"
              id="dropzone"
              ref="dropzone"
              :options="dropzoneOptions"
              v-on:vdropzone-file-added="fileAdded"
            ></vue-dropzone>
            <div class="flex-row flex-row--centered">
              <v-btn class="mr-2" color="error" @click="toggleChangeImage">
                {{ $text.cancel }}
              </v-btn>
              <v-btn class="ml-2" color="primary" @click="changeAvatar">
                {{ $text.changeAvatar }}
              </v-btn>
            </div>
          </div>
          <div v-else class="center-items" key="notChangeImage">
            <v-btn color="primary" @click="toggleChangeImage">
              {{ $text.changeAvatar }}
            </v-btn>
          </div>
        </transition>
      </div>
    </div>
    <!-- user data -->
    <div class="profile__data flex-row flex-row--wrapped pa-4">
      <div class="profile__title text text--big mb-4">
        {{ $text.personalData }}
      </div>
      <div class="profile__data__item flex-column break-word">
        <p class="text text--medium text--bold">{{ $text.name }}</p>
        <p class="text text--medium">{{ user.user.name | notNull }}</p>
      </div>
      <div class="profile__data__item flex-column break-word">
        <p class="text text--medium text--bold">{{ $text.surnames }}</p>
        <p class="text text--medium">{{ user.user.surnames | notNull }}</p>
      </div>
      <div class="profile__data__item flex-column break-word">
        <p class="text text--medium text--bold">{{ $text.email }}</p>
        <p class="text text--medium">{{ user.user.email | notNull }}</p>
      </div>
      <div class="profile__data__item flex-column break-word">
        <p class="text text--medium text--bold">{{ $text.username }}</p>
        <p class="text text--medium">{{ user.user.username | notNull }}</p>
      </div>
      <div class="profile__data__item flex-column">
        <p class="text text--medium text--bold underlined">
          {{ $text.bornDate }}
        </p>
        <p class="text text--medium">{{ user.user.bornDate | notNull }}</p>
      </div>
    </div>

    <!-- password -->
    <div class="profile__password pa-4">
      <div class="profile__title text text--big mb-4">{{ $text.password }}</div>
      <div class="flex-row flex-row--wrapped">
        <!-- current -->
        <v-text-field
          class="profile__password__textfield"
          :label="$text.currentPassword"
          v-model="newPassword.current"
          counter="50"
          maxlength="50"
          :type="showCurrentPassword ? 'text' : 'password'"
          :error-messages="currentPasswordErrors"
          :append-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (showCurrentPassword = !showCurrentPassword)"
          @input="$v.newPassword.current.$touch()"
          @blur="$v.newPassword.current.$touch()"
        ></v-text-field>
        <!-- new -->
        <v-text-field
          class="profile__password__textfield"
          :label="$text.newPassword"
          v-model="newPassword.newP"
          counter="50"
          maxlength="50"
          :type="showNewPassword ? 'text' : 'password'"
          :error-messages="newPasswordErrors"
          :append-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (showNewPassword = !showNewPassword)"
          @input="$v.newPassword.newP.$touch()"
          @blur="$v.newPassword.newP.$touch()"
        ></v-text-field>
        <!-- repeat new password -->
        <v-text-field
          class="profile__password__textfield"
          :label="$text.repeatNewPassword"
          v-model="repeatNewPassword"
          counter="50"
          maxlength="50"
          :type="showRepeatNewPassword ? 'text' : 'password'"
          :error-messages="repeatNewPasswordErrors"
          :append-icon="showRepeatNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (showRepeatNewPassword = !showRepeatNewPassword)"
          @input="$v.repeatNewPassword.$touch()"
          @blur="$v.repeatNewPassword.$touch()"
        ></v-text-field>
      </div>
      <div class="w-100 mt-4" style="text-align: right">
        <v-btn class="align-right" color="error" @click="changePassword">
          {{ $text.changePassword }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DialogLoader from "@/components/DialogLoader";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "Profile",
  components: {
    DialogLoader,
    vueDropzone,
  },
  filters: {
    notNull: function (value) {
      return value ? value : '';
    },
  },
  data: function () {
    return {
      showCurrentPassword: false,
      showNewPassword: false,
      showRepeatNewPassword: false,
      image: null,
      changeImage: false,
      newPassword: {
        current: "",
        newP: "",
      },
      repeatNewPassword: "",
      dropzoneOptions: {
        url: " ",
        maxFilesize: 500,
        thumbnailWidth: 180,
        thumbnailHeight: 120,
        uploadMultiple: false,
        autoProcessQueue: false,
        maxFiles: 1,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictDefaultMessage: this.$text.addNewProfileImage,
      },
    };
  },
  validations: {
    newPassword: {
      current: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50),
        valid: function () {
          return this.$isPasswordValid(this.newPassword.current);
        },
      },
      newP: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50),
        valid: function () {
          return this.$isPasswordValid(this.newPassword.newP);
        },
      },
    },
    repeatNewPassword: {
      sameAs: sameAs(function () {
        return this.newPassword.newP;
      }),
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters({
      getUserId: "user/getUserId",
      getUserAvatar: "user/getUserAvatar",
    }),
    currentPasswordErrors() {
      const errors = [];
      if (this.$v.newPassword.current.$dirty) {
        !this.$v.newPassword.current.valid &&
          errors.push(this.$text.invalidPassword);
        !this.$v.newPassword.current.maxLength &&
          errors.push(this.$text.maximumSizeExceeded);
        !this.$v.newPassword.current.minLength &&
          errors.push(this.$text.minimumSizeNotReached);
        !this.$v.newPassword.current.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (this.$v.newPassword.newP.$dirty) {
        !this.$v.newPassword.newP.valid &&
          errors.push(this.$text.invalidPassword);
        !this.$v.newPassword.newP.maxLength &&
          errors.push(this.$text.maximumSizeExceeded);
        !this.$v.newPassword.newP.minLength &&
          errors.push(this.$text.minimumSizeNotReached);
        !this.$v.newPassword.newP.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
    repeatNewPasswordErrors() {
      const errors = [];
      if (this.$v.repeatNewPassword.$dirty) {
        !this.$v.repeatNewPassword.sameAs &&
          errors.push(this.$text.passwordNotEquals);
      }
      return errors;
    },
  },
  methods: {
    toggleChangeImage() {
      this.changeImage = !this.changeImage;
    },
    changePassword() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("user/changePassword", {
            userId: this.getUserId,
            password: this.newPassword,
          })
          .then(() => {
            this.$infoMessage(this.$text.passwordChangedCorrectly);
            this.newPassword.current = "";
            this.newPassword.newP = "";
            this.repeatNewPassword = "";
            this.$v.$reset();
          })
          .catch((error) => {
            this.$errorMessage(
              error.response.data
                ? error.response.data
                : this.$text.errorOcurred
            );
          });
      } else {
        this.$errorMessage(this.$text.invalidPasswords);
      }
    },
    async changeAvatar() {
      if (this.$refs.dropzone.getAcceptedFiles().length === 1) {
        const avatar = await this.getImageParsedToBase64();
        if (avatar === null) {
          this.$errorMessage(this.$text.errorOcurred);
        } else {
          this.$store
            .dispatch("user/updateAvatar", {
              userId: this.getUserId,
              avatar: avatar,
            })
            .then(() => {
              this.$store.commit("user/SET_AVATAR", avatar);
              this.toggleChangeImage();
              this.$infoMessage(this.$text.avatarChangedCorrectly);
            })
            .catch(() => {
              this.$errorMessage(this.$text.errorOcurred);
            });
        }
      } else {
        this.$errorMessage(this.$text.mustAddImage);
      }
    },
    fileAdded(file) {
      if (this.$refs.dropzone.getAcceptedFiles().length === 1) {
        this.$refs.dropzone.removeFile(file);
        this.$errorMessage(this.$text.onlyCanAddOneImage);
      }
    },
    getImageParsedToBase64() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.$refs.dropzone.getAcceptedFiles()[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-areas:
    "profile__avatar profile__data profile__data"
    "profile__avatar profile__password profile__password"
    "profile__avatar profile__password profile__password"
    "profile__avatar profile__password profile__password";

  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 800px) {
    grid-template-areas:
      "profile__data profile__data profile__data"
      "profile__avatar profile__avatar profile__avatar"
      "profile__password profile__password profile__password";
  }

  #dropzone {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__avatar {
    grid-area: profile__avatar;
    width: 100%;

    &__image {
      height: 300px;
      width: 300px;
    }

    &__dropzone {
      height: 300px;
      width: 300px;
    }
  }

  &__data {
    grid-area: profile__data;
    width: 100%;

    &__item {
      width: 50%;
    }

    @media (max-width: 750px) {
      &__item {
        width: 100%;
      }
    }
  }

  &__password {
    grid-area: profile__password;
    width: 100%;

    &__textfield {
      width: 32%;
      margin: 5px;
    }

    @media (max-width: 500px) {
      &__textfield {
        width: 100%;
      }
    }
  }

  &__title {
    border-bottom: 1px solid $blue-primary;
    color: $blue-primary;
    width: 100%;
    height: 30px;
  }
}
</style>