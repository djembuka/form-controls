<template>
  <form-control
    v-for="control in controls"
    :key="control.id"
    :control="control"
  ></form-control>
  <button @click="changeValue">Change value</button>
  <button @click="initValidation">init validation</button>
  <button @click="initFocus">init focus</button>
  <button @click="setDisabled">set disabled</button>
</template>

<script>
import FormControl from './components/FormControl.vue';

export default {
  name: 'App',
  computed: {
    controls() {
      return this.$store.getters.controls;
    },
  },
  methods: {
    changeValue() {
      this.$store.dispatch('changeControlValue', {
        control: this.$store.state.controls[0],
        value: 'новое значение',
      });
    },
    initValidation() {
      this.$store.dispatch('validateControl', {
        control: this.$store.state.controls[0],
      });
    },
    initFocus() {
      this.$store.dispatch('focusControl', {
        control: this.$store.state.controls[0],
      });
    },
    setDisabled() {
      this.$store.dispatch('disableControl', {
        control: this.$store.state.controls[0],
        value: true,
      });
    },
  },
  components: {
    FormControl,
  },
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  width: 1000px;
  margin: 0 auto;
  padding: 50px;
}
#app a {
  text-decoration: none;
  color: cornflowerblue;
}
</style>
