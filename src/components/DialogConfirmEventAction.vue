<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <div class="dialog-confirm-event-action">
      <div class="dialog-confirm-event-action__message pa-4">
        {{ message }}
      </div>
      <div class="dialog-confirm-event-action__buttons w-100" style="text-align: right">
        <v-btn color="primary" text @click="cancel">{{ $text.cancel }}</v-btn>
        <v-btn color="error" text @click="accept">{{ $text.accept }}</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogConfirmEventAction",
  props: { message: { type: String, required: true } },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    accept() {
      this.$emit("accept");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-confirm-event-action {
  background-color: white;
  width: 100%;
  &__message {
    height: 100px;
  }
}
</style>

