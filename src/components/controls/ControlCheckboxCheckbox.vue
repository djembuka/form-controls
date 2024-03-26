<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--checkbox': true,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <div>
      <label class="twpx-form-controls__checkbox">
        <input
          type="checkbox"
          class="filled-in"
          :id="controlId"
          :name="controlName"
          :value="control.value"
          v-model="checked"
        />
        <span>{{ control.label }}</span>
      </label>
    </div>
    <div class="twpx-form-control-hint" v-if="hint" v-html="hint"></div>
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
      hint: this.control.hint_external,
    };
  },
  props: ['control', 'id', 'name'],
  emits: ['input'],
  computed: {
    checked: {
      get() {
        return this.control.checked;
      },
      set(checked) {
        this.$emit('input', { checked });
      },
    },
    invalid() {
      return this.blured && !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    validate() {
      if (
        !this.control.required ||
        (this.control.required && this.control.checked)
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.twpx-form-control--checkbox {
  position: relative;
  margin-bottom: 16px;
}
.twpx-form-control--checkbox .twpx-form-control-hint {
  color: #2d3142;
  font-size: 9px;
  margin: 8px 0 0 14px;
  line-height: 1.2;
}

/*Checkbox*/
.twpx-form-control--checkbox .twpx-form-controls__checkbox {
  display: block;
  margin-bottom: var(--slr2-gap-middle);
}
.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']:not(:checked),
.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']:checked {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']
  + span {
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  line-height: var(--slr2-font-size-sm);
  font-size: var(--slr2-font-size-sm);
  -webkit-user-select: none;
  user-select: none;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']
  + span:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  z-index: 0;
  border: 2px solid #5a5a5a;
  border-radius: 1px;
  margin-top: 3px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']:not(:checked):disabled
  + span:before {
  border: none;
  background-color: rgba(0, 0, 0, 0.42);
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox']:checked
  + span:before {
  top: -4px;
  left: -5px;
  width: 12px;
  height: 22px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid #26a69a;
  border-bottom: 2px solid #26a69a;
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.twpx-form-control--checkbox.twpx-form-controls__checkbox
  [type='checkbox']:checked:disabled
  + span:before {
  border-right: 2px solid rgba(0, 0, 0, 0.42);
  border-bottom: 2px solid rgba(0, 0, 0, 0.42);
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in
  + span:before {
  z-index: 11;
}
.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in
  + span:after {
  border-radius: 8px;
  height: 24px;
  width: 24px;
  z-index: 10;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in
  + span:before,
.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in
  + span:after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0;
  -webkit-transition: background-color 0.25s, width 0.2s 0.1s, height 0.2s 0.1s,
    top 0.2s 0.1s, left 0.2s 0.1s;
  transition: background-color 0.25s, width 0.2s 0.1s, height 0.2s 0.1s,
    top 0.2s 0.1s, left 0.2s 0.1s;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:not(:checked)
  + span:before {
  top: 12px;
  left: 8px;
  width: 0;
  height: 0;
  border: 3px solid transparent;
  -webkit-transform: rotateZ(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:not(:checked)
  + span:after {
  background-color: transparent;
  background-color: #f5f7f8;
}
.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:not(:checked):hover
  + span:after {
  background-color: #d7dee1;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:checked
  + span:before {
  top: 2px;
  left: 4px;
  width: 5px;
  height: 8px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  -webkit-transform: rotateZ(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:checked
  + span:after {
  background-color: #2d3142;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:disabled:not(:checked)
  + span:before {
  background-color: transparent;
  border: 2px solid transparent;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:disabled:not(:checked)
  + span:after {
  border-color: transparent;
  background-color: #949494;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:disabled:checked
  + span:before {
  background-color: transparent;
}

.twpx-form-control--checkbox
  .twpx-form-controls__checkbox
  [type='checkbox'].filled-in:disabled:checked
  + span:after {
  background-color: #949494;
  border-color: #949494;
}
</style>
