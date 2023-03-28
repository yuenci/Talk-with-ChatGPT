<template>
    <div class="modal-container">
        <div class="modal-con">
            <div class="modal-title">API Keys</div>
            <input type="text" placeholder="Enter your api key" class="modal-input">
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.modal-container {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    padding: 20%;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
}

.modal-con {
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
}

.modal-title {
    width: 100%;
    text-align: center;
}

.modal-input {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 20px;
}
</style>