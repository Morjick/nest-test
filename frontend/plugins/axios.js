export default async function ({ $axios, $cookies, store, redirect, req, app }) {
  $axios.setHeader('Access-Control-Allow-Origin', '*')
}