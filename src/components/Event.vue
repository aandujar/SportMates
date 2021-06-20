<template>
  <div class="event">
    <div class="event__data">
      <v-img
        class="event__data__image"
        :src="require(`@/assets/${getImage}`)"
      ></v-img>
      <div class="event__data__content flex-column pa-4">
        <v-row cols="12" xs="12"
          ><div class="flex-row flex-row--wrapped flex-row--aligned mb-1">
            <v-icon class="mr-1" medium color="primary">
              mdi-calendar-month
            </v-icon>
            <div>{{ event.date }}</div>
          </div></v-row
        >
        <v-row cols="12" xs="12"
          ><div class="flex-row flex-row--wrapped flex-row--aligned mb-1">
            <v-icon class="mr-1" medium color="primary">
              mdi-timer-sand
            </v-icon>
            <div>{{ getDuration }}</div>
          </div></v-row
        >
        <v-row cols="12" xs="12"
          ><div class="flex-row flex-row--content-start flex-row--aligned mb-1">
            <v-icon class="mr-1" medium color="primary">
              mdi-map-marker-outline
            </v-icon>
            <div class="flex-row flex-row--wrapped break-word">{{ $formatEventUbication(event) }}</div>
          </div></v-row
        >
        <v-row cols="12" xs="12"
          ><div class="flex-row flex-row--content-start flex-row--aligned break-word mb-1">
            <v-icon class="mr-1" medium color="primary">
              mdi-information-outline
            </v-icon>
            <div class="flex-row flex-row--wrapped">{{ getObservations }}</div>
          </div></v-row
        >
        <v-row cols="12" xs="12"
          ><div class="flex-row flex-row--wrapped flex-row--aligned">
            <v-icon medium color="primary"> mdi-account </v-icon>
            <div>
              {{ event.currentParticipants }} / {{ event.numberOfParticipants }}
            </div>
          </div></v-row
        >
        <div
          class="
            flex-row flex-row--aligned flex-row--space-between
            event__buttons
            w-100
            mt-2
            pt-4
          "
        >
          <!-- mapa -->
          <v-row cols="5" xs="5" style="margin: 0px"
            ><div
              class="flex-row flex-row--content-start mx-1"
              @click="showMapEvent"
            >
              <v-icon medium color="primary"> mdi-map-search-outline </v-icon>
              <div class="flex-row flex-row--wrapped pointer-underlined mx-1">
                {{ $text.viewInMap }}
              </div>
            </div></v-row
          >
          <!-- inscription -->
          <v-row v-if="unsubscripted" cols="5" xs="5" style="margin: 0px"
            ><div
              class="flex-row flex-row--content-start mx-1"
              @click="inscribe"
            >
              <v-icon medium color="primary"> mdi-plus-box-outline </v-icon>
              <div class="flex-row flex-row--wrapped pointer-underlined mx-1">
                {{ $text.subscribe }}
              </div>
            </div></v-row
          >
          <!-- unsubscribe -->
          <v-row v-if="inscripted" cols="5" xs="5" style="margin: 0px"
            ><div
              class="flex-row flex-row--content-start mx-1"
              @click="unsubscribe"
            >
              <v-icon medium color="primary"> mdi-minus-box-outline </v-icon>
              <div class="flex-row flex-row--wrapped pointer-underlined mx-1">
                {{ $text.unsubscribe }}
              </div>
            </div></v-row
          >
          <!-- delete -->
          <v-row v-if="owned" cols="5" xs="5" style="margin: 0px"
            ><div
              class="flex-row flex-row--content-start mx-1"
              @click="remove"
            >
              <v-icon medium color="primary"> mdi-delete-forever </v-icon>
              <div class="flex-row flex-row--wrapped pointer-underlined mx-1">
                {{ $text.delete }}
              </div>
            </div></v-row
          >
        </div>
      </div>
    </div>
    <Map
      v-if="showMap"
      dialog
      :latitude="event.latitude"
      :longitude="event.longitude"
      @close="closeMap"
    />
  </div>
</template>

<script>

export default {
  name: "Event",
  props: {
    event: { type: Object, required: true },
    disabled: { type: Boolean, required: false, default: false },
    unsubscripted: { type: Boolean, required: false, default: false },
    inscripted: { type: Boolean, required: false, default: false },
    owned: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      showMap: false,
    };
  },
  components: {
    Map: () => import("@/components/Map"),
  },
  computed: {
    getObservations() {
      return this.event.observation
        ? this.event.observation
        : "Sin obervaciones";
    },
    getDuration() {
      return `${this.event.duration} ${
        this.event.duration === 1 ? "hora" : "horas"
      }`;
    },
    getImage() {
      let image = "";
      switch (this.event.sport.code) {
        case "CI":
          image = "cycling.jpg";
          break;
        case "FT":
          image = "football.jpg";
          break;
        case "SE":
          image = "treeking.jpg";
          break;
        default:
          image = "surf.jpg";
          break;
      }
      return image;
    },
  },
  methods: {
    showMapEvent() {
      if (!this.disabled) {
        this.showMap = true;
      }
    },
    closeMap() {
      this.showMap = false;
    },
    inscribe() {
      if (!this.disabled) {
        this.$emit("inscribe", this.event.id);
      }
    },
    unsubscribe() {
      if (!this.disabled) {
        this.$emit("unsubscribe", this.event.id);
      }
    },
    remove(){
      if (!this.disabled) {
        this.$emit("remove", this.event.id);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.event {
  height: 390px;
  width: 330px;
  background-color: white;

  @media (max-width: 330px) {
    height: 460px;
    width: 300px;
    background-color: white;
  }

  @media (max-width: 300px) {
    height: 530px;
    width: 260px;
    background-color: white;
  }

  &:hover {
    box-shadow: 0px 0px 23px 4px rgba(0, 0, 0, 0.54);
  }

  &__data {
    height: 100%;
    width: 100%;

    &__image {
      height: 35%;
      width: 100%;
    }

    &__content {
      height: 65%;
      width: 100%;
    }

    &__buttons {
      margin-top: auto;
    }
  }
}
</style>