<template>
  <form-control
    v-for="control in controls"
    :key="control.id"
    :control="control"
  ></form-control>
  <button @click="changeValue">Change value</button>
  <button @click="clearFileInput">Clear file input</button>
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
        value: '324234328',
        checked: true,
      });
    },
    clearFileInput() {
      this.$store.dispatch('clearFileInput', {
        control: this.$store.state.controls[7],
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
:root {
  --slr2-background: #fcfcfc;
  --slr2-buttons: #0a16aa;
  --slr2-color: #000;
  --slr2-light: #f7f9ff;
  --slr2-font-size-sm: 14px;
  --slr2-font-size: 16px;
  --slr2-gap-big: 30px;
  --slr2-gap: 24px;
  --slr2-gap-middle: 16px;
  --slr2-padding: 16px;
}
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
#app hr {
  margin: 20px;
  border: none;
}
</style>
