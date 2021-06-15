<template>
  <div class="toolbar-icons">
    <!-- rigth items -->
    <div
      class="flex-row flex-row--aligned bar-pr"
      :class="{ 'flex-row': row, 'flex-column': !row }"
    >
      <!-- help -->
      <div class="flex-row flex-row--aligned margin">
        <font-awesome-icon
          icon="file"
          color="black"
          class="icon icon--small margin"
        />
        <span class="text text--small text--bold margin">Ayuda</span>
      </div>
      <!-- sign in -->
      <div class="flex-row flex-row--aligned margin">
        <font-awesome-icon
          icon="user"
          color="black"
          class="icon icon--small margin"
        />
        <span class="text text--small text--bold margin">Sign in</span>
      </div>
      <!-- language -->
      <div class="flex-row flex-row--aligned margin">
        <span class="text text--small text--bold margin">ES</span>
        <font-awesome-icon
          style="margin-top: -8px"
          icon="sort-down"
          color="black"
          class="icon icon--small margin"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolbarIcons",
  props: { row: { type: Boolean, required: false, default: true } },
};
</script>

<style lang="scss" scoped>
.toolbar-icons {
  .margin {
    margin: 5px;
  }
}
</style>