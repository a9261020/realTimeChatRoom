<template>
  <div class="chat-window">
    <div class="messages">
      <div class="message" v-for="message in messages" :key="message._id">
        <div class="username">{{ message.username }}</div>
        <div class="message-text">
          <p>
            {{ message.msg }}
          </p>
        </div>
      </div>
    </div>
    <form class="input-container" @submit="sendMessageBtn">
      <input type="text" v-model="msg" />
      <button @click="sendMessageBtn" :disabled="!msg">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "chatroom",
  props: ["messages"],
  data: function() {
    return {
      msg: ""
    };
  },
  methods: {
    sendMessageBtn: function() {
      if (!this.msg) {
        alert("Please enter a message");
        return;
      }
      this.$emit("sendMessage", this.msg);
      this.msg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.15);
  height: 768px;
  .messages {
    flex: 1;
    overflow-y: scroll;
    .message {
      display: flex;
      border-bottom: 1px solid #efefef;
      padding: 10px;
      &:last-child {
        border-bottom: none;
      }
      p {
        margin: 0;
        padding: 0;
        word-break: break-all;
      }
      .username {
        width: 100px;
        margin-right: 20px;
      }
      .message-text {
        flex: 1;
      }
    }
  }
  .input-container {
    display: flex;
    box-sizing: border-box;
    input {
      flex: 1;
      height: 35px;
      font-size: 18px;
    }
    button {
      width: 75px;
    }
  }
}
</style>
