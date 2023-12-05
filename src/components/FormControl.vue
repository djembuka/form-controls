<template>
  <control-text
    :control="control"
    :id="id"
    :name="name"
    @input="input"
  ></control-text>
</template>

<script>
import ControlText from './controls/ControlText.vue';

export default {
  data() {
    return {
      id: `PROPERTY_${this.control.id}`,
      name: `PROPERTY_${this.control.id}`,
    };
  },
  props: ['control'],
  methods: {
    input(value) {
      this.$store.dispatch('changeControlValue', {
        control: this.control,
        value,
      });
    },
  },
  components: {
    ControlText,
  },
};
</script>
