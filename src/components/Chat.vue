<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <div class="chat">
      <div class="chat__actions flex-row flex-row--content-end w-100 pa-1">
        <v-icon medium color="white" class="pointer" @click="minimize">
          mdi-window-minimize
        </v-icon>
        <v-icon medium color="white" class="pointer" @click="close">
          mdi-close
        </v-icon>
      </div>
      <div class="chat__messages pa-4 mb-2" id="messages">
        <div
          class="chat__messages__no-data center-items"
          v-if="getMessages.length === 0"
        >
          {{ $text.noMessages }}
        </div>
        <div
          v-for="(item, index) in getMessages"
          :key="index"
          class="chat__messages__item text text--medium my-1 pa-1"
        >
          <div
            class="
              chat__messages__item__header
              flex-row flex-row--space-between
            "
          >
            <div>{{ item.user.username }}</div>
            <div>{{ formatDate(item.date) }}</div>
          </div>
          <div class="break-word">{{ item.message }}</div>
          <div
            v-if="item.user.id === getUserId"
            class="flex-row flex-row--content-end w-100"
          >
            <v-icon
              small
              color="primary"
              class="pointer"
              @click="editMessage(item)"
              v-show="newMessage.id !== item.id"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="error"
              class="pointer"
              @click="deleteMessage(item.id)"
              v-show="newMessage.id !== item.id"
            >
              mdi-delete
            </v-icon>
            <v-icon
              small
              color="primary"
              class="pointer"
              @click="cancelEditMessage"
              v-show="newMessage.id === item.id"
            >
              mdi-cancel
            </v-icon>
          </div>
        </div>
      </div>
      <div class="chat__publish pa-1">
        <v-textarea
          class="chat__publish__message"
          outlined
          height="100px"
          :label="$text.writeMessage"
          counter="100"
          maxlength="100"
          v-model="newMessage.message"
          background-color="white"
          append-icon="mdi-send"
          :error-messages="messageErrors"
          @input="$v.newMessage.message.$touch()"
          @keyup.enter="addMessage"
          @click:append="addMessage"
        ></v-textarea>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Chat",
  props: { event: { type: Object, required: true } },
  data: function () {
    return {
      dialog: true,
      newMessage: {
        message: "",
        user: null,
        event: null,
        date: "",
        id: null,
      },
    };
  },
  validations: {
    newMessage: {
      message: { required, maxLength: maxLength(100) },
    },
  },
  computed: {
    ...mapState(["chat", "user"]),
    ...mapGetters({ getUserId: "user/getUserId" }),
    messageErrors() {
      const errors = [];
      if (this.$v.newMessage.message.$dirty) {
        !this.$v.newMessage.message.maxLength &&
          errors.push(this.$text.maximumSizeExceeded);
        !this.$v.newMessage.message.required &&
          errors.push(this.$text.requiredField);
      }
      return errors;
    },
    getMessages() {
      const arrayMessages = this.chat.chats.filter(
        (message) => message.eventId === this.event.id
      );

      return arrayMessages.length > 0 ? arrayMessages[0].chats : [];
    },
  },
  created() {
    this.newMessage.user = this.user.user;
    this.newMessage.event = this.event.id;
    this.searchMessages();
  },
  mounted() {
    this.goToBottomOfMessages();
  },
  methods: {
    editMessage(message) {
      this.newMessage.id = message.id;
      this.newMessage.message = message.message;
    },
    cancelEditMessage() {
      this.newMessage.id = null;
      this.newMessage.message = "";
      this.$v.$reset();
    },
    close() {
      this.$emit("close");
    },
    goToBottomOfMessages() {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    deleteMessage(messageId) {
      const data = { messageId: messageId, userId: this.getUserId };
      this.$store
        .dispatch("chat/deleteMessage", data)
        .then(() => this.searchMessages())
        .catch((err) => {
          this.$errorMessage(
            err.response && err.response.data
              ? err.response.data
              : this.$text.errorOcurred
          );
        });
    },
    minimize() {
      this.$emit("minimize");
    },
    addMessage() {
      this.$v.$touch();
      if (this.newMessage.id) {
        this.updateMessage();
      } else {
        this.saveMessage();
      }
    },
    saveMessage() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("chat/addMessage", this.newMessage)
          .then(() => {
            this.newMessage.message = "";
            this.$v.$reset();
            this.searchMessages();
          })
          .catch((err) => {
            this.$errorMessage(
              err.response && err.response.data
                ? err.response.data
                : this.$text.errorOcurred
            );
          });
      }
    },
    updateMessage() {
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("chat/updateMessage", this.newMessage)
          .then(() => {
            this.newMessage.message = "";
            this.newMessage.id = null;
            this.$v.$reset();
            this.searchMessages(false);
          })
          .catch((err) => {
            this.$errorMessage(
              err.response && err.response.data
                ? err.response.data
                : this.$text.errorOcurred
            );
          });
      }
    },
    searchMessages(goBottom = true) {
      this.$store
        .dispatch("chat/getMessagesByEvent", {
          userId: this.getUserId,
          eventId: this.event.id,
        })
        .then(() => {
          if (goBottom) {
            this.goToBottomOfMessages();
          }
        });
    },
    formatDate(date) {
      console.log("------");
      const now = moment();
      const dateSplitSpace = date.split(" ");
      console.log(dateSplitSpace);
      const dateSplitted = dateSplitSpace[0].split("-");
      const isSameYear = now.year() == dateSplitted[2];
      const isSameMonth = now.month() == dateSplitted[1];
      const isSameDay = now.date() == dateSplitted[0];
      console.log("------");
      let value = dateSplitSpace[1];
      if (!isSameYear && !isSameMonth && !isSameDay) {
        value += ` ${dateSplitSpace[0]}`;
      }
      console.log("------");
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  background-color: $grey-background;
  height: 510px;

  &__actions {
    height: 8%;
    width: 100%;
    background-color: $blue-primary;
  }

  &__messages {
    height: 63%;
    width: 100%;
    overflow-y: auto;

    &__item {
      border: 1px solid black;
      background-color: white;
      min-height: 30px;
      border-radius: 5px;

      &__header {
        color: $blue-primary;
      }
    }

    &__no-data {
      height: 100%;
      width: 100%;
    }
  }

  &__publish {
    height: 20%;
    width: 100%;
  }
}
</style>