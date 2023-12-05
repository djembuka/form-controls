<template>
  <div class="form-control-grid">
    <div
      :class="{
        'form-control': true,
        'form-control--active': active,
        'form-control--invalid': invalid,
        'form-control--disabled': disabled,
      }"
    >
      <img
        :src="disabled"
        class="form-control__disabled-icon"
        v-if="disabled"
      />
      <div class="form-control__label">{{ control.label }}</div>
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
        class="form-control__input"
      />
      <div class="form-control__hint" v-html="hint" v-if="hint"></div>
    </div>
    <div class="form-control-link" v-if="control.hint_external">
      <span
        >Нажмите, чтобы подставить значение: &nbsp;
        <a href="#" @click.prevent="clickLink">{{
          control.hint_external
        }}</a></span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
      blured: false,
      disabled: this.control.disabled,
      hint: '',
    };
  },
  props: ['control', 'id', 'name'],
  emits: ['input'],
  computed: {
    controlId() {
      return this.id || this.control.id || null;
    },
    controlName() {
      return this.name || this.control.name || null;
    },
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
            this.hint = this.control.regexp_description;
          } else {
            this.hint = '';
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
    clickLink() {
      this.value = this.control.hint_external;
    },
  },
};
</script>

<style>
.form-control-grid {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
.form-control-link {
  display: flex;
  align-items: center;
  font-size: 10pt;
  margin-left: 30px;
  width: 250px;
  flex-shrink: 0;
}
.form-control {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
  width: 100%;
}
.form-control--active .form-control__label {
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  font-size: 9px;
  color: #848c95;
}
.form-control__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.form-control__label {
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
.form-control--invalid .form-control__label {
  color: #ff0000;
}
.form-control--disabled .form-control__label {
  color: #2d3142;
  opacity: 0.3;
}
.form-control__input {
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
.form-control__input:focus,
.form-control__input:hover {
  outline: none;
  border-color: #2d3142 !important;
}
.form-control--invalid .form-control__input {
  background-color: #fff5f5;
  border-color: #e38080 !important;
  outline: none;
  color: #ff0000;
}
.form-control--disabled .form-control__input {
  color: #00000055;
  pointer-events: none;
  background-color: #f5f7f855;
  border: 1px solid #f5f7f855 !important;
}
.form-control__hint {
  font-size: 9pt;
}
</style>
