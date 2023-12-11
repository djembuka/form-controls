<template>
  <component
    :is="`control-${componentType}`"
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
import ControlMultiselect from './controls/ControlMultiselect.vue';
import ControlSelectRadio from './controls/ControlSelectRadio.vue';
import ControlCheckboxCheckbox from './controls/ControlCheckboxCheckbox.vue';

export default {
  data() {
    return {
      id: `PROPERTY_${this.control.id}`,
      name: `PROPERTY_${this.control.id}`,
      componentType: `${this.control.property}${
        this.control.type ? '-' + this.control.type : ''
      }`,
    };
  },
  props: ['control'],
  methods: {
    input({ value, checked }) {
      this.$store.dispatch('changeControlValue', {
        control: this.control,
        value,
        checked,
      });
    },
  },
  components: {
    ControlText,
    ControlTextarea,
    ControlTextareaFormat,
    ControlMultiselect,
    ControlSelectRadio,
    ControlCheckboxCheckbox,
  },
};
</script>
