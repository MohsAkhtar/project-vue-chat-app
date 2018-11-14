<template>
  <div>
    <div class="messageForm">
      <form>
        <div class="input-group mb-3">
          <input type="message" id="message" placeholder="Write something" class="form-control mt-3" autofocus>


          <div class="input-group-append">
            <button class="btn btn-primary mt-3">Send</button>

            <button class="btn btn-warning mt-3">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-form'
};
</script>

<style scoped>
.messageForm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: white;
  text-align: center;
  margin-bottom: -16px;
  margin-left: 33.3%;
}

input,
button {
  height: 50px;
}
</style>
