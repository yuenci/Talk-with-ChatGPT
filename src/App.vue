<template>
  <div class="app-container">
    <Title />
    <div class="message-con">
      <Message v-for="(message, index) in messagesDataList" :data="message" :key="index" />
      <div ref="buttom"></div>
    </div>
    <Chat class="chat" />
    <Modal />
  </div>
</template>

<script>
import Title from './components/Title.vue';
import Chat from './components/Chat.vue';
import Message from './components/Message.vue';
import Modal from './components/Modal.vue';
import PubSub from 'pubsub-js';
import { chatWithGPT } from "./tools.js";
export default {
  name: 'App',
  components: {
    Title, Chat, Message, Modal
  },
  data() {
    return {
      messagesDataList: []
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.buttom.scrollIntoView({ behavior: 'smooth', });
      })
    },

    addUserMessage(msg) {
      this.messagesDataList.push({
        role: 'user',
        content: msg
      })
      this.scrollToBottom();
      this.chatWithChatGPT();
    },
    addAssistantMessage(msg) {
      this.messagesDataList.push({
        role: 'assistant',
        content: msg
      })
      this.scrollToBottom();
    },
    async chatWithChatGPT() {
      chatWithGPT(this.messagesDataList).then((res) => {
        this.addAssistantMessage(res);
      })
    }
  },
  mounted() {
    PubSub.subscribe('updateMsg', (msg, data) => {
      if (data.role === 'user') {
        this.addUserMessage(data.content)
      } else {
        this.addAssistantMessage(data.content)
      }
    });
  },
  beforeDestroy() {
    PubSub.unsubscribe('updateMsg');
  }
}

</script>

<style scoped>
.app-container {
  box-sizing: border-box;
  width: 100vw;
}

.chat {
  position: fixed;
  bottom: 0;
  left: 0;
}

.message-con {
  /* background-color: aqua; */
  height: calc(100vh - 100px);
  overflow-y: scroll;
  padding: 0 10px;
}
</style>
