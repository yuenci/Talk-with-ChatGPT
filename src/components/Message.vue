<template>
    <div :class="containerStyle">
        <div class="avatar-con">
            <img src="/avatar.jpg" alt="avatar" v-if="data.role === 'user'" class="user-avatar">
            <img src="/chatGPT.png" alt="avatar" v-if="data.role === 'assistant'" class="assistant-avatar">
        </div>
        <div :class="messageStyle">
            <div class="message">{{ data.message }}</div>
        </div>
    </div>
</template>
<script>
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
            messageStyle: ""
        }
    },
    methods: {
    },
    mounted() {
        this.containerStyle = this.data.role === 'user' ? "message-container flex-end" : "message-container flex-start";
        this.messageStyle = this.data.role === 'user' ? "user-msg msg-con" : "assistant-msg msg-con";
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
</style>