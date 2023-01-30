<template>
  <div class="numbers-page">
    <h1>Расчитайте среднее арифметическое</h1>
    <div class="messages-sender nubers-form">
      <input 
        type="text" 
        placeholder="Введите ваше имя"
        v-model="autor"
        @keypress.enter="sendNumber"
        :class="{
          danger: validate.autor
        }"
      >
      <input 
        type="text" 
        placeholder="Введите число"
        v-model="value"
        @keypress.enter="sendNumber"
        :class="{
          danger: validate.value
        }"
      >
      <button @click="sendNumber">Отправить</button>
    </div>
    <div class="numbers-details">
      <label for="float"><input type="checkbox" id="float"> Число дробное</label>
      <label for="minus"><input type="checkbox" id="minus"> Число отрицательное</label>
    </div>
    <div class="numbers-list">
      <p v-if="numbers.length">История запросов:</p>
      <div v-for="(item, ind) in numbers" :key="item.newNumber" class="numbers-item">
        <span>{{ind + 1}}) ({{ item.oldNumber }} + {{ item.newNumber }}) / 2 = {{ item.arithmeticMean }}</span>
        <span>Старое число: {{ item.oldNumber }}, новое число: {{ item.newNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumbersPage',
  data: () => ({
    value: '',
    autor: '',
    validate: {
      value: false,
      autor: false
    },
    numbers: []
  }),
  computed: {
  },
  methods: {
    async sendNumber() {
      try {
        if(!this.autor || !String(this.autor).length) {
          this.validate.autor = true
          return
        }

        if(!this.value || !String(this.value).length || !Number(this.value) || Number(this.value) == NaN) {
          this.validate.value = true
          return
        }

        this.validate.value = false
        this.validate.autor = false

        const { data: number } = await this.$axios.post('send-numbers', {
          autor: this.autor,
          value: this.value
        })

        this.numbers.push(number)
      } catch {
        this.validate.value = false
        this.validate.autor = false
      }
    }
  },
  mounted() {
  },
}
</script>

<style>

input {
  cursor: pointer;
}

label {
  cursor: pointer;
  margin-right: 25px;
}

.numbers-list {
  margin: 15px 0;
}

.numbers-list p {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
}
</style>
