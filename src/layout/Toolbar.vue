<template>
  <div class="toolbar flex-row flex-row--space-between flex-row--aligned pr-4">
    <!-- hamburguer icon -->
   <!--  <div class="toolbar__hamburguer" @click="showIcons">-->
     <!-- <font-awesome-icon icon="bars" color="black" class="icon icon--small" />-->
   <!--  </div>-->
    <!-- logo -->
    <div class="flex-row--content-end">
       <v-img class="toolbar__logo" :src="require(`@/assets/logo.png`)"></v-img>
    </div>
    <!-- rigth items -->
    <!--  <ToolbarIcons class="toolbar__icons-rigth" />-->

    <div class="toolbar__image">
       <v-img height="100%" widt="100%" :src="require(`@/assets/avatar.png`)"></v-img>
    </div>
  </div>
</template>

<script>
//import ToolbarIcons from "../components/ToolbarIcons.vue";

export default {
  name: "Toolbar",
 /* components: {
    ToolbarIcons
  },*/
  data: function () {
    return {
      showCardIcons: false,
    };
  },
  methods: {
    showIcons(){
      this.$emit("showIcons");
    }
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  background-color: #3f51b5;
  position: fixed;
  height: 70px;

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

}
</style>