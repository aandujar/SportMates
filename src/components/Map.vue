<template>
<v-dialog
      v-model="dialog"
      width="500"
    >
  <div>
    <gmap-map :center="center" :zoom="12" style="width: 100%; height: 400px">
      <gmap-marker :position="center"></gmap-marker>
    </gmap-map>
  </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      center: 0,
      dialog: true
    };
  },
  props: {
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
  created() {
    if (this.latitude && this.longitude) {
      this.center = { lat: Number(this.latitude), lng: Number(this.longitude) };
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };
      });
    }
  }
};
</script>