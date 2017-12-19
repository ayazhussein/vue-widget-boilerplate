import Vue from 'vue'
import App from './App.vue'


// Main Entry point
export default class Deviz {
  constructor (selector) {
    this.init(selector)

    return this
  }
  init (selector) {
    this.vm = new Vue(App)
    this.vm.$mount(selector)
  }
}
