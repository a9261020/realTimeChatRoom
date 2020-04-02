<template>
  <div id="app">
    <div class="header">
      <h1>Chatroom</h1>
      <p class="username">Username: {{ username }}</p>
      <p class="onlineUsers">Online: {{ users.length }}</p>
    </div>
    <Chatroom :messages="messages" @sendMessage="this.sendMessage" />
  </div>
</template>

<script>
import io from "socket.io-client";
import Chatroom from "./components/Chatroom";

export default {
  name: "App",
  data() {
    return {
      socket: io("http://localhost:5000"),
      username: "",
      users: [],
      messages: []
    };
  },
  components: { Chatroom },
  methods: {
    joinServer() {
      this.socket.on("login", data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.username);
      });

      this.listen();
    },
    listen() {
      this.socket.on("userOnline", user => {
        this.users.push(user);
      });

      this.socket.on("userLeft", user => {
        this.users.splice(this.users.indexOf(user), 1);
      });

      this.socket.on("msg", message => {
        this.messages.push(message);
      });
    },
    sendMessage: function(message) {
      this.socket.emit("msg", message);
    }
  },
  mounted() {
    this.username = prompt("What's your name", "Anonymous");

    if (!this.username) {
      this.username = "Anonymous";
    }

    this.joinServer();
  }
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
