<template>
  <section class="layout-default">
    <header>
      <div class="header-inner">
        <nuxt-link to="/">Сообщения</nuxt-link>
        <nuxt-link to="/numbers">Расчитать число</nuxt-link>
      </div>
    </header>
    <section class="content container">
      <Nuxt />
    </section>
  </section>
</template>

<script>
export default {
  name: 'DefaultLayout',
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  outline: none;
}

h1 {
  font-size: 34px;
  margin: 10px 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.layout-default header {
  display: flex;
  align-items: center;

  height: 70px;
  background: #202020;
}

.header-inner {
  width: 1440px;
  margin: 0 auto;
}

.header-inner a {
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  transition: color .3s;
}

.header-inner a:hover {
  color: red;
}

.content {
  margin: 10px auto;
}
</style>
