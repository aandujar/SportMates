<template>
  <div>
    <div v-if="dialog">
      <v-dialog v-model="open" width="500">
        <div id="mapid" v-on-clickaway="close" class="map-big"></div>
      </v-dialog>
    </div>
    <div id="mapid" v-on-clickaway="close" class="map-small" v-else></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { directive as onClickaway } from "vue-clickaway";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Map",
  directives: {
    onClickaway: onClickaway,
  },
  props: {
    dialog: { type: Boolean, default: false, required: false },
    creation: { type: Boolean, default: false, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
  data() {
    return {
      center: null,
      open: true,
      map: null,
      marker: null,
    };
  },
  computed: {
    getMarkerPosition() {
      let markerPosition = null;
      if (this.creation) {
        if (this.latitude && this.longitude) {
          markerPosition = {
            lat: Number(this.latitude),
            lng: Number(this.longitude),
          };
        }
      } else {
        if (this.center !== null) {
          markerPosition = Object.assign({}, this.center);
        }
      }
      return markerPosition;
    },
  },
  mounted() {
    if (this.latitude && this.longitude) {
      this.center = [Number(this.latitude), Number(this.longitude)];
      this.mountMap();
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.center = [
          Number(position.coords.latitude),
          Number(position.coords.longitude),
        ];
        this.mountMap();
      });
    }
  },
  methods: {
    mountMap() {
      this.map = L.map("mapid").setView(this.center, 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWFuZHVqYXIiLCJhIjoiY2twemhwdWVlMGhrbzJucnJ4MnVkMGQ0eSJ9.8jefm-ZWksXMJXzdONq9sQ",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoiYWFuZHVqYXIiLCJhIjoiY2twemhwdWVlMGhrbzJucnJ4MnVkMGQ0eSJ9.8jefm-ZWksXMJXzdONq9sQ",
        }
      ).addTo(this.map);

      if (this.creation) {
        this.map.on("click", (coords) => {
          this.$emit("position", coords.latlng);
          if (this.marker) {
            this.map.removeLayer(this.marker);
            this.marker = null;
          }
          this.marker = new L.Marker(coords.latlng).addTo(this.map);
        });
      } else {
        this.marker = new L.marker(this.center).addTo(this.map);
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.map-big {
  height: 500px;
  width: 500px;
}

.map-small {
  height: 140px;
  width: 550px;
}

@media (max-width: 750px) {
  .map-small {
    height: 140px;
    width: 325px;
  }
}

@media (max-width: 600px) {
  .map-small {
    height: 140px;
    width: 330px;
  }
}

@media (max-width: 380px) {
  .map-small {
    height: 140px;
    width: 280px;
  }
}

@media (max-width: 380px) {
  .map-small {
    height: 140px;
    width: 240px;
  }
}

@media (max-width: 300px) {
  .map-small {
    height: 140px;
    width: 200px;
  }
}
</style>