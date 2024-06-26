<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--radio': true,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <label
      class="twpx-form-control__radio"
      v-for="option in control.options"
      :key="option.code"
    >
      <input
        class="with-gap"
        :name="controlName"
        type="radio"
        :value="option.code"
        v-model="checked"
      />
      <span>{{ option.label || '' }}</span>
    </label>
    <div class="twpx-form-control-hint" v-if="hint" v-html="hint"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      hint: this.control.hint_external,
    };
  },
  props: ['control', 'id', 'name'],
  emits: ['input'],
  computed: {
    checked: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });
      },
    },
    invalid() {
      return !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    validate() {
      if (
        !this.control.required ||
        (this.control.required && this.control.value)
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.twpx-form-control--radio {
  position: relative;
  margin-bottom: 16px;
}
.twpx-form-control--radio .twpx-form-control-hint {
  color: #2d3142;
  font-size: 9px;
  margin: 8px 0 0 14px;
  line-height: 1.2;
}

/*Radio*/
.twpx-form-control--radio .twpx-form-control__radio {
  display: block;
  margin-bottom: var(--slr2-gap-middle);
}
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked),
.twpx-form-control--radio .twpx-form-control__radio [type='radio']:checked {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span {
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  line-height: var(--slr2-font-size-sm);
  font-size: var(--slr2-font-size-sm);
  -webkit-transition: 0.28s ease;
  transition: 0.28s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']
  + span:before,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']
  + span:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  z-index: 0;
  -webkit-transition: 0.28s ease;
  transition: 0.28s ease;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span:before,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span:after,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span:before,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span:after,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:before,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:after {
  border-radius: 50%;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span:before {
  background-color: #f5f7f8;
}
.twpx-form-control--radio
  .twpx-form-control__radio:hover
  [type='radio']:not(:checked)
  + span:before {
  background-color: #d7dee1;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span:after {
  border: 2px solid transparent;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:not(:checked)
  + span:after {
  -webkit-transform: scale(0);
  transform: scale(0);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span:after,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:before {
  background-color: #d7dee1;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:after {
  background-color: #2d3142;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span:after,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:after {
  background-color: #2d3142;
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:checked
  + span:after {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:checked
  + span:after {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:disabled:checked
  + span:before {
  border: 2px solid rgba(0, 0, 0, 0.42);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio'].with-gap:disabled:checked
  + span:after {
  border: none;
  background-color: rgba(0, 0, 0, 0.42);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:disabled:not(:checked)
  + span:before,
.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:disabled:checked
  + span:before {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.42);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:disabled
  + span {
  color: rgba(0, 0, 0, 0.42);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:disabled:not(:checked)
  + span:before {
  border-color: rgba(0, 0, 0, 0.42);
}

.twpx-form-control--radio
  .twpx-form-control__radio
  [type='radio']:disabled:checked
  + span:after {
  background-color: rgba(0, 0, 0, 0.42);
  border-color: #949494;
}
</style>
