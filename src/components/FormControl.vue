<template>
  <component
    :is="`control-${control.type}`"
    :control="control"
    :id="id"
    :name="name"
    @input="input"
  ></component>
  <hr />
</template>

<script>
import ControlText from './controls/ControlText.vue';
import ControlTextarea from './controls/ControlTextarea.vue';
import ControlTextareaFormat from './controls/ControlTextareaFormat.vue';

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
      console.log('sdf');
      this.$store.dispatch('changeControlValue', {
        control: this.control,
        value,
      });
    },
  },
  components: {
    ControlText,
    ControlTextarea,
    ControlTextareaFormat,
  },
};
</script>
