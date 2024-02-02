<template>
  <component
    :is="`control-${componentType}`"
    :control="control"
    :id="id"
    :name="name"
    @input="input"
  ></component>
  <hr v-if="control.property !== 'heading'" />
</template>

<script>
import ControlFile from './controls/ControlFile.vue';
import ControlText from './controls/ControlText.vue';
import ControlTextareaPlain from './controls/ControlTextareaPlain.vue';
import ControlTextareaFormatted from './controls/ControlTextareaFormatted.vue';
import ControlMultiselect from './controls/ControlMultiselect.vue';
import ControlSelectRadio from './controls/ControlSelectRadio.vue';
import ControlCheckboxCheckbox from './controls/ControlCheckboxCheckbox.vue';
import ControlCheckboxSwitch from './controls/ControlCheckboxSwitch.vue';
import ControlHeading from './controls/ControlHeading.vue';

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
    ControlFile,
    ControlText,
    ControlTextareaPlain,
    ControlTextareaFormatted,
    ControlMultiselect,
    ControlSelectRadio,
    ControlCheckboxCheckbox,
    ControlCheckboxSwitch,
    ControlHeading,
  },
};
</script>
