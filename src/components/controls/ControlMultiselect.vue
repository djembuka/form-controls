<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <div class="twpx-form-control__multiselect">
      <div
        class="twpx-form-control__multiselect-item"
        :class="{
          'twpx-form-control__multiselect-item--checked': isChecked(item),
        }"
        v-for="item in control.options"
        :value="item.code"
        :key="item.code"
        @click="click(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div
      class="twpx-form-control-hint"
      v-if="control.hint_external"
      v-html="control.hint_external"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['control'],
  emits: ['input'],
  computed: {
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    isChecked(item) {
      return this.control.value.find((v) => v === item.code);
    },
    click(item) {
      let checked = false;
      if (this.isChecked(item)) {
        checked = true;
      }
      this.$emit('input', { value: item.code, checked: !checked });
    },
  },
};
</script>

<style>
.twpx-form-control {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
}
.twpx-form-control-hint {
  color: #2d3142;
  font-size: 9px;
  margin: 8px 0 0 14px;
  line-height: 1.2;
}
.twpx-form-control__multiselect-item {
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: 'Open Sans', Arial, sans-serif;
  color: #2d3142;
  padding: 0 24px;
  background-color: #f5f7f8;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  margin: 0 16px 16px 0;
}
.twpx-form-control__multiselect-item:hover {
  background-color: #d7dee1;
}
.twpx-form-control__multiselect-item.twpx-form-control__multiselect-item--checked {
  background-color: #2d3142;
  color: #fff;
  font-weight: bold;
}
.twpx-form-control--disabled {
  pointer-events: none;
  opacity: 0.7;
}
</style>
