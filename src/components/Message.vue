<template>
    <div :class="containerStyle" @click="playAudio">
        <div class="avatar-con">
            <img src="/avatar.jpg" alt="avatar" v-if="data.role === 'user'" class="user-avatar">
            <img src="/chatGPT.png" alt="avatar" v-if="data.role === 'assistant'" class="assistant-avatar">
        </div>
        <div :class="messageStyle">
            <div class="message">{{ data.content }}</div>
        </div>
    </div>
    <audio :src="URL" controls ref="audio" class="audio-tag"></audio>
</template>

<script>
import { speechS } from '../tools.js';
export default {
    name: 'Message',
    props: {
        data: {
            type: Object,
            required: true

        }
    },
    data() {
        return {
            containerStyle: "",
            messageStyle: "",
            URL: "",
            playing: false
        }
    },
    methods: {
        async getURL() {
            let url = await speechS(this.data.content);
            this.URL = url;
        },
        playAudio() {
            if (!this.playing) {
                this.$refs.audio.play();
                this.playing = true;
            } else {
                this.$refs.audio.pause();
                this.playing = false;
            }
        },
    },
    mounted() {
        this.containerStyle = this.data.role === 'user' ? "message-container flex-end" : "message-container flex-start";
        this.messageStyle = this.data.role === 'user' ? "user-msg msg-con" : "assistant-msg msg-con";

        this.$refs.audio.addEventListener("loadedmetadata", () => {
            if (this.data.role === 'assistant') {
                this.playAudio();
            }
        });


        this.$refs.audio.addEventListener("ended", () => {
            this.playing = false;
        });

        this.getURL();


    }
}
</script>
<style scoped>
.user-avatar,
.assistant-avatar {
    height: 50px;
    width: 50px;
    border-radius: 10px;
}

.message-container {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
}

.flex-end {
    justify-content: flex-start;
    flex-direction: row-reverse;
}

.flex-start {
    justify-content: flex-start;
    flex-direction: row;
}

.msg-con {
    max-width: 50%;
    border-radius: 5px;
    padding: 10px;
}

.assistant-msg {
    background-color: #f7f7f7;
    margin-left: 10px;

}

.user-msg {
    background-color: #94ee6e;
    margin-right: 10px;
    word-wrap: break-word;
}

.audio-tag {
    display: none;
}
</style>