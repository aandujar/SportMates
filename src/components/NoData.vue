<template>
  <div class="no-data flex-column center-items my-4">
    <div class="no-data__img">
      <v-img
        class="no-data__img__image"
        :src="require('@/assets/no-data.svg')"
      ></v-img>
    </div>
    {{ $text.noEventsToShow }}
  </div>
</template>

<script>
export default {
  name: "NoData",
};
</script>

<style lang="scss" scoped>
.no-data {
  height: 100%;
  width: 100vw;
  &__img {
    height: 300px;
    width: 300px;
    &__image {
      height: 100%;
      width: 100%;
    }
  }
}
</style>