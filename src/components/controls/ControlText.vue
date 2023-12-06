<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--active': active,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <img
      :src="disabled"
      class="twpx-form-control__disabled-icon"
      v-if="disabled"
    />
    <div class="twpx-form-control__label">{{ control.label }}</div>
    <input
      type="text"
      :id="controlId"
      :name="controlName"
      v-model="value"
      @focus="focus"
      @blur="blur"
      :disabled="disabled"
      ref="input"
      autocomplete="off"
      :placeholder="placeholder"
      class="twpx-form-control__input"
    />
    <div
      class="twpx-form-control__warning"
      v-html="warning"
      v-if="warning"
    ></div>
    <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      focused: false,
      blured: false,
      warning: '',
      hint: this.control.hint_external,
    };
  },
  props: ['control', 'id', 'name'],
  emits: ['input'],
  computed: {
    value: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    placeholder() {
      if (this.focused && !this.value.trim()) {
        return this.control.hint_internal;
      } else {
        return '';
      }
    },
    active() {
      return this.focused || !!this.control.value.trim();
    },
    invalid() {
      return this.blured && !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
    validateWatcher() {
      return this.control.validateWatcher;
    },
    focusWatcher() {
      return this.control.focusWatcher;
    },
  },
  watch: {
    validateWatcher() {
      this.blured = true;
    },
    focusWatcher() {
      this.$refs.input.focus();
    },
  },
  methods: {
    focus() {
      this.focused = true;
      this.blured = false;
    },
    blur() {
      this.focused = false;
      this.blured = true;
    },
    validate() {
      if (
        (this.control.required && this.value.trim()) ||
        !this.control.required
      ) {
        if (this.control.regexp) {
          const match = String(this.value.trim()).match(
            RegExp(this.control.regexp)
          );
          if (!match) {
            this.warning = this.control.regexp_description;
          } else {
            this.warning = '';
          }
          return match;
        } else {
          return true;
        }
      } else if (this.control.required && !this.value) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.twpx-form-control {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
  width: 100%;
}
.twpx-form-control--active .twpx-form-control__label {
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  font-size: 9px;
  color: #848c95;
}
.twpx-form-control__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control__label {
  position: absolute;
  top: 0;
  left: 14px;
  margin: 0;
  padding: 0;
  color: #2d3142;
  font-size: 14px;
  -webkit-transition: -webkit-transform 0.2s ease-out,
    -webkit-font-size 0.2s ease-out;
  transition: transform 0.2s ease-out, font-size 0.2s ease-out;
  -webkit-transform: translateY(14px);
  transform: translateY(14px);
  pointer-events: none;
  line-height: 1.1;
}
.twpx-form-control--invalid .twpx-form-control__label {
  color: #ff0000;
}
.twpx-form-control--disabled .twpx-form-control__label {
  color: #2d3142;
  opacity: 0.3;
}
.twpx-form-control__input {
  display: block !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 14px !important;
  background-color: #f5f7f8;
  border: 1px solid #f5f7f8 !important;
  border-radius: 3px;
  height: 48px !important;
  line-height: 48px;
  border-radius: 3px !important;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px !important;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  outline: none !important;
  box-shadow: none !important;
  box-sizing: border-box;
}
.twpx-form-control__input:focus,
.twpx-form-control__input:hover {
  outline: none;
  border-color: #2d3142 !important;
}
.twpx-form-control--invalid .twpx-form-control__input {
  background-color: #fff5f5;
  border-color: #e38080 !important;
  outline: none;
  color: #ff0000;
}
.twpx-form-control--disabled .twpx-form-control__input {
  color: #00000055;
  pointer-events: none;
  background-color: #f5f7f855;
  border: 1px solid #f5f7f855 !important;
}
.twpx-form-control__warning,
.twpx-form-control__hint {
  font-size: 9pt;
  margin: 5px;
  line-height: 1.1;
}
.twpx-form-control__warning {
  color: #ff0000;
}
</style>
