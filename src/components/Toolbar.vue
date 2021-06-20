<template>
  <div
    class="toolbar flex-row flex-row--space-between flex-row--aligned pr-4"
    @click.prevent="closeMenu"
  >
    <div class="flex-row--content-end">
      <v-img class="toolbar__logo" :src="require(`@/assets/logo.png`)"></v-img>
    </div>
    <div class="toolbar__image pointer" v-on:click.stop="toggleMenu">
      <v-img
        height="100%"
        width="100%"
        :src="require(`@/assets/avatar.png`)"
      ></v-img>
    </div>
    <div
      class="toolbar__menu flex-column"
      :class="{
        'toolbar__menu--show': showMenu,
        'toolbar__menu--hide': !showMenu,
      }"
    >
      <div
        v-if="!isInUnsubscriptedEventsPage"
        class="toolbar__menu__item pointer flex-row flex-row--aligned pa-2"
        @click="goTo(routes.unsubscripted)"
      >
        <v-icon class="mr-2" medium color="primary"
          >mdi-folder-open-outline</v-icon
        >{{ $text.main }}
      </div>
      <div
        v-if="!isInInscriptedEventsPage"
        class="toolbar__menu__item pointer flex-row flex-row--aligned pa-2"
        @click="goTo(routes.inscripted)"
      >
        <v-icon class="mr-2" medium color="primary"
          >mdi-folder-open-outline</v-icon
        >{{ $text.inscriptions }}
      </div>
      <div
        v-if="!isInOwnEventsPage"
        class="toolbar__menu__item pointer flex-row flex-row--aligned pa-2"
        @click="goTo(routes.owned)"
      >
        <v-icon class="mr-2" medium color="primary"
          >mdi-folder-open-outline</v-icon
        >{{ $text.myEvents }}
      </div>
      <div
        class="toolbar__menu__item pointer flex-row flex-row--aligned pa-2"
        @click="goTo('profile')"
      >
        <v-icon class="mr-2" medium color="primary"> mdi-account </v-icon>{{ $text.profile }}
      </div>
      <div
        class="toolbar__menu__item pointer flex-row flex-row--aligned pa-2"
        @click="logout"
      >
        <v-icon class="mr-2" medium color="primary"> mdi-power-standby</v-icon>
        {{ $text.signOff }}
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/router/routesInterface";

export default {
  name: "Toolbar",
  data: function () {
    return {
      showCardIcons: false,
      showMenu: false,
      menuOpened: false,
      routes
    };
  },
  computed: {
    isInUnsubscriptedEventsPage() {
      return this.$route.path === routes.unsubscripted;
    },
    isInOwnEventsPage() {
      return this.$route.path === routes.owned;
    },
    isInInscriptedEventsPage() {
      return this.$route.path === routes.inscripted;
    },
  },
  methods: {
    showIcons() {
      this.$emit("showIcons");
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      if (this.showMenu) {
        this.toggleMenu();
      }
    },
    logout() {
      this.$store.commit("user/SET_USER", null);
      localStorage.removeItem("user");
      this.$router.push("/");
    },
    goTo(eventRoute) {
      this.$router.push(eventRoute);
    }
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  background-color: $blue-primary;
  position: fixed;
  height: 70px;
  z-index: 90;

 &__logo {
    height: 200px;
    width: 400px;
  }

  &__image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: white;
  }
  
  @media (max-width: 600px) {
   &__logo {
    height: 200px;
    width: 200px;
  }

  &__image {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: white;
  }
}

  &__menu {
    width: 200px;
    background-color: white;
    position: absolute;
    z-index: 80;
    right: 0;
    top: 70px;

    &--show {
      min-height: 120px;
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
      z-index: 10;
      transition: transform 0.26s ease;
    }

    &__item {
      height: 40px;
      width: 100%;

      &:hover {
        background-color: #f0f0f5;
      }
    }
  }
}
</style>