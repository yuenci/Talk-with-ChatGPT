<template>
  <div class="app-container">
    <Title />
    <div class="message-con">
      <Message v-for="(message, index) in mockData" :data="message" :key="index" />
      <div ref="buttom"></div>
    </div>
    <Chat class="chat" />
  </div>
</template>

<script>
import Title from './components/Title.vue';
import Chat from './components/Chat.vue';
import Message from './components/Message.vue';
import PubSub from 'pubsub-js';
export default {
  name: 'App',
  components: {
    Title, Chat, Message
  },
  data() {
    return {
      mockData: [
        {
          role: 'user',
          message: ' Hello Hello Hello Hello Hello Hello '
        },
        {
          role: 'assistant',
          message: `Some modules' assignments in my university need to explain the code in documentation, and I don't like to do these meaningless things, so I wrote this project and use the GPT-3 artificial intellige`
        }
      ]
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.buttom.scrollIntoView(
          {
            behavior: 'smooth',
          }
        );
      })
    },

    addUserMessage(msg) {
      this.mockData.push({
        role: 'user',
        message: msg
      })
      this.scrollToBottom();
    },
    addAssistantMessage(msg) {
      this.mockData.push({
        role: 'assistant',
        message: msg
      })
      this.scrollToBottom();
    }
  },
  mounted() {
    PubSub.subscribe('updateMsg', (msg, data) => {
      if (data.role === 'user') {
        this.addUserMessage(data.message)
      } else {
        this.addAssistantMessage(data.message)
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
  padding: 0 10px;
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
}
</style>
