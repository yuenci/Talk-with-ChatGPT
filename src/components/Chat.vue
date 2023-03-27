<template  >
    <div class="chat-con" :style="{ height: chatConHeigth + 'px' }">
        <img :src="icon" alt="voice" class="voice-icon" @click="changeIcon">
        <textarea class="input" v-if="icon === '/voice.svg'" v-model="input"
            :style="{ width: textareaWidth, height: textAreaHeight + 'px' }" ref="textArea"></textarea>
        <div class="talk-btn" v-else>Hold to Talk</div>
        <div class="chat-right">
            <img src="/face.svg" alt="voice" class="face-icon">
            <img src="/add.svg" alt="voice" class="add-icon" v-if="!showSend">
            <button v-else class="send-btn" @click="sendMsg">Send</button>
        </div>
    </div>
</template>
<script>
import PubSub from 'pubsub-js';
export default {
    data() {
        return {
            icon: "/voice.svg",
            input: "",
            showSend: false,
            textareaWidth: "calc(100% - 100px)",
            textAreaHeight: 35,
            chatConHeigth: 30
        }
    },
    watch: {
        input() {
            this.changeTextAreaHeight();
            if (this.input.length > 0) {
                this.collapseTextarea();
                this.showSend = true;
            } else {
                this.expandTextarea();
                this.showSend = false;
                this.textAreaHeight = 35;
                this.chatConHeigth = 30;
            }
        }
    },
    methods: {
        changeIcon() {
            this.icon = this.icon === "/voice.svg" ? "/keyboard.svg" : "/voice.svg";
        },
        expandTextarea() {
            this.textareaWidth = "calc(100% - 100px)";
        },
        collapseTextarea() {
            this.textareaWidth = "calc(100% - 130px)";
        },
        changeTextAreaHeight() {
            let height = this.detectTextAreaHeight();
            if (height !== this.textAreaHeight) {
                this.textAreaHeight = height + 14;
                this.chatConHeigth = this.textAreaHeight + 14;
            }
        },
        detectTextAreaHeight() {
            const scrollHeight = this.$refs.textArea.scrollHeight;
            return scrollHeight;
        },
        sendMsg() {
            PubSub.publish('updateMsg', { message: this.input, role: 'user' });
            this.input = "";
        }
    }
}
</script>
<style scoped>
.voice-icon,
.face-icon,
.add-icon {
    height: 25px;
}

.chat-con {
    width: calc(100% - 20px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    background-color: #f7f7f7;
    padding: 10px 10px 10px 10px;
}

.face-icon {
    margin-right: 10px;
    height: 27px;
}

.input {
    /* width: calc(100% - 100px); */
    border: none;
    outline: none;
    background-color: white;
    height: 35px;
    resize: none;
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
    transition: 0.3s;
}

.talk-btn {
    width: calc(100% - 100px);
    background-color: white;
    height: 35px;
    line-height: 35px;
    text-align: center;
}

.chat-right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
}

.send-btn {
    background-color: #09bf61;
    color: white;
    border: none;
    outline: none;
    height: 30px;
    width: 50px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
}
</style>