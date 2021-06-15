<template>
  <div class="event">
    <v-img class="event__image" :src="require(`@/assets/${getImage}`)"></v-img>
    <div class="event__content flex-column pa-4">
      <v-row cols="12" xs="12"
        ><div class="flex-row flex-row--wrapped flex-row--aligned">
          <v-icon medium color="primary"> mdi-calendar-month </v-icon>
          <div>{{ event.startDate }}</div>
        </div></v-row
      >
      <v-row cols="12" xs="12"
        ><div class="flex-row flex-row--wrapped flex-row--aligned">
          <v-icon medium color="primary"> mdi-timer-sand </v-icon>
          <div>{{ getDuration }}</div>
        </div></v-row
      >
      <v-row cols="12" xs="12"
        ><div class="flex-row flex-row--wrapped flex-row--aligned-start">
          <v-icon medium color="primary"> mdi-map-marker-outline </v-icon>
          <div>{{ getDirection }}</div>
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
      <v-row cols="12" xs="12"
        ><div
          class="flex-row flex-row--wrapped flex-row--aligned"
          @click="showMap = true"
        >
          <v-icon medium color="primary" class="pointer"> mdi-map-search </v-icon>
          <div class="pointer-underlined">Ver ubicación en mapa</div>
        </div></v-row
      >
      <v-row cols="12" xs="12">
        <div class="flex-row flex-row--content-end w-100">
          <v-btn
            rounded
            color="primary"
            :disabled="disabled"
            @click="addToEvent"
          >
            Inscribirse
          </v-btn>
        </div></v-row
      >
    </div>
    <Map
      v-if="showMap"
      :latitude="event.latitude"
      :longitude="event.longitude"
    />
  </div>
</template>

<script>
export default {
  name: "Event",
  props: {
    event: { type: Object, required: true },
    disabled: { type: Boolean, required: false, default: false },
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
    getDirection() {
      return `${this.event.direction}, ${this.event.city.name}, ${this.event.city.province.name}, ${this.event.city.province.country.name}`;
    },
    getDuration() {
      return `${this.event.duration} ${this.event.duration === 1 ? 'hora' : 'horas'}`;
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
    addToEvent() {
      this.$emit("addToEvent", this.event.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.event {
  height: 320px;
  width: 270px;
  background-color: white;

  &:hover {
    box-shadow: 0px 0px 23px 4px rgba(0, 0, 0, 0.54);
  }

  &__image {
    height: 40%;
    width: 100%;
  }

  &__content {
    height: 60%;
    width: 100%;
  }
}
</style>