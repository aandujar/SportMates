<template>
  <div class="body flex-row flex-row--centered flex-row--wrapped">
    <Stepper :step="step" style="width: 100%" class="center-items" />
    <br />
    <div class="body__container body__container--width">
      <MyData v-show="1 == step" @next="next" />
      <ProductPayment
        v-show="2 == step"
        :person="person"
        @previous="previous"
        @next="next"
      />
      <Congratulations v-show="3 == step" />
    </div>
  </div>
</template>

<script>
import Stepper from "../components/Stepper.vue";
import MyData from "../components/MyData.vue";
import ProductPayment from "../components/ProductPayment.vue";
import Congratulations from "../components/Congratulations.vue";

export default {
  name: "Body",
  components: {
    Stepper,
    MyData,
    ProductPayment,
    Congratulations,
  },
  data: function () {
    return {
      step: 1,
      person: {
        name: "",
        surnames: "",
      },
    };
  },
  methods: {
    previous() {
      this.step--;
    },
    next(personData) {
      if (null !== personData) {
        this.person = personData;
      }
      this.step++;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;

  &__container {
    min-height: 150px;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: white;
    box-shadow: 1px 3px 15px -6px #000000;

    &--width {
      width: 40vw;
    }

    @media (max-width: 1200px) {
      &--width {
        width: 60vw;
      }
    }

    @media (max-width: 1200px) {
      &--width {
        width: 80vw;
      }
    }

    @media (max-width: 700px) {
      &--width {
        width: 90vw;
      }
    }
  }
}
</style>