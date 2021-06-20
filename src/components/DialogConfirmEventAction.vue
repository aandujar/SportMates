<template>
  <v-dialog v-model="dialog" width="500" height="200">
    <div class="dialog-confirm-event-action">
        <div><div>
            <div>
      <v-btn color="error" text @click="dialog = false"> I accept </v-btn>
      <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
    </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogConfirmEventAction",
  props: { message: { type: String, required: true } },
};
</script>

<style lang="scss" scoped>
.dialog-confirm-event-action {
  &__content {
  }
}
</style>

