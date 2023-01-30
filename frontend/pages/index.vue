<template>
  <section class="home-page">
    <h1>Все сообщения</h1>
    <div class="messages">
      <div class="messages-inner">
        <div v-for="item in messages" :key="item.value" class="messages-item">
          <span>{{ item.autor }}: </span>
          <span>{{ item.text }}</span>
        </div>
      </div>
      <div class="messages-sender">
        <input 
          placeholder="Введите ваше имя" 
          type="text"
          v-model="autor"
          @keypress.enter="sendMessage"
          :class="{
            danger: validate.autor
          }"
        >
        <input 
          placeholder="Введите ваше сообщение" 
          type="text"
          v-model="message"
          @keypress.enter="sendMessage"
          :class="{
            danger: validate.message
          }"
        >
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData ({ $axios }) {
    try {
      const { data: messages } = await $axios.get('get-messages')

      return {
        messages
      }
    } catch {
      return { messages: [] }
    }
  },
  data: () => ({
    message: '',
    autor: '',
    validate: {
      message: false,
      autor: false
    }
  }),
  computed: {
  },
  methods: {
    async sendMessage() {
      try {
        if(!this.autor || !String(this.autor).length) {
          this.validate.autor = true
          return
        }

        if(!this.message || !String(this.message).length) {
          this.validate.message = true
          return
        }

        const { data: messages } = await this.$axios.post('send-message', {
          text: this.message,
          autor: this.autor
        })

        this.validate.message = false
        this.validate.autor = false
        this.messages = messages
      } catch {
        this.validate.message = false
        this.validate.autor = false
      }
    }
  },
  mounted() {
  },
}
</script>

<style>
.messages-item {
  border-bottom: 1px dashed #000;
  padding: 10px 0;
  margin-bottom: 10px;
}

.messages-item span:first-child {
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
}

.messages-sender {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  bottom: 0;

  width: 1440px;
  height: 70px;

  background: #202020;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
}

.messages-sender input {
  width: 60%;

  padding: 10px;
  background: #343434;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(255, 255, 255, .3);
  color: #fff;
}

.messages-sender input:first-child {
  width: 20%;
}

.messages-sender input::placeholder {
  color: #fff;
}

.messages-sender button {
  padding: 15px 20px;
  border-radius: 10px;
  background: #0052CC;
  color: #fff;
  cursor: pointer;
}

.messages-sender input.danger {
  box-shadow: 0 0 5px 0 red;
}
.nubers-form {
  position: static;
  background: #fff;
  padding: 10px 0;
}
</style>
