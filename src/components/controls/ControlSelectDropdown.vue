<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--select': true,
      'twpx-form-control--active': active,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <img
      :src="disabled"
      class="twpx-form-control__disabled-icon"
      v-if="false"
    />
    <div class="twpx-form-control__label">{{ control.label }}</div>
    <div
      class="twpx-form-control-select"
      :class="{ 'twpx-form-control-select--dropdown': opened }"
      :data-id="id"
      id="id"
    >
      <input type="hidden" :name="name" :value="value" />
      <div class="twpx-form-control-select__arrow" v-html="arrowIcon"></div>
      <div
        class="twpx-form-control-select__content"
        @click.prevent="openDropdown"
      >
        {{ text }}
      </div>
      <div class="twpx-form-control-select__dropdown">
        <div
          class="twpx-form-control-select__dropdown-item"
          v-for="(option, i) in control.options"
          :key="option.code"
          @click.prevent="clickItem(i)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: Math.floor(Math.random() * 100000),
      optionsArray: [],
      opened: false,
      arrowIcon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
        >
          <g transform="translate(17.589 16) rotate(180)">
            <ellipse
              cx="9"
              cy="8"
              rx="9"
              ry="8"
              transform="translate(-0.411)"
              fill="#fff"
            />
            <path
              d="M3.822,0a.57.57,0,0,0-.386.147L.16,3.157a.473.473,0,0,0,0,.709.581.581,0,0,0,.772,0l2.89-2.655,2.89,2.655a.581.581,0,0,0,.772,0,.473.473,0,0,0,0-.709L4.208.147A.57.57,0,0,0,3.822,0Z"
              transform="translate(4.855 5.23)"
            />
          </g>
        </svg>`,
    };
  },
  props: ['control', 'name', 'customOnChange'],
  emits: ['input'],
  computed: {
    value: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });
      },
    },
    text() {
      let option = this.control.options.find((c) => c.code === this.value);
      if (option) {
        return option.label;
      }
      return '';
    },
    active() {
      return !!this.text.trim();
    },
    invalid() {
      return false; //!this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    createOptionsArray() {
      this.optionsArray = this.control.options;
    },
    clickItem(index) {
      let option = this.control.options[index];
      this.value = option.code;
      this.hideDropdown();
      //onchange
      if (typeof this.customOnChange === 'function') {
        this.customOnChange();
      }
    },
    openDropdown() {
      // if (window.twpxSelectManager) {
      //   Object.values(window.twpxSelectManager.selectObject).forEach(
      //     (select) => {
      //       select.hideDropdown();
      //     }
      //   );
      // }
      this.opened = true;
    },
    hideDropdown() {
      // if (this.selectDiv.classList.contains('twpx-select--dropdown')) {
      //   this.selectDiv.classList.remove('twpx-select--dropdown');
      //   this.selectDiv.classList.add('twpx-select--animate');
      //   setTimeout(() => {
      //     this.selectDiv.classList.remove('twpx-select--animate');
      //   }, 200);
      // }
      this.opened = false;
    },
    divElements() {
      this.content = this.selectDiv.querySelector(
        '.twpx-form-control-select__content'
      );
      this.dropdown = this.selectDiv.querySelector(
        '.twpx-form-control-select__dropdown'
      );
      this.hidden = this.selectDiv.querySelector('input[type="hidden"]');
    },
    divEvents() {
      this.content.addEventListener('click', () => {
        if (
          this.selectDiv.classList.contains(
            'twpx-form-control-select--dropdown'
          )
        ) {
          this.hideDropdown();
        } else {
          this.openDropdown();
        }
      });

      this.dropdown.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('twpx-form-control-select__dropdown-item')
        ) {
          this.clickItem(e.target);
        }
      });
    },
  },
  beforeMount() {
    document.addEventListener('click', (e) => {
      if (
        e.target.className !== 'twpx-form-control-select__dropdown-item' &&
        e.target.className !== 'twpx-form-control-select__content'
      ) {
        this.hideDropdown();
      }
    });
  },
};
</script>

<style>
.twpx-form-control--select {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
  width: 100%;
}
.twpx-form-control--select.twpx-form-control--active .twpx-form-control__label {
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  font-size: 9px;
  color: #2d3142;
}
.twpx-form-control--select .twpx-form-control__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control--select .twpx-form-control__label {
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
  z-index: 110;
}
.twpx-form-control--select.twpx-form-control--invalid
  .twpx-form-control__label {
  color: #ff0000;
}
.twpx-form-control--select.twpx-form-control--disabled
  .twpx-form-control__label {
  color: #2d3142;
  opacity: 0.3;
}
.twpx-form-control--select.twpx-form-control--disabled
  .twpx-form-control-select__content {
  color: #00000055;
  pointer-events: none;
  background-color: #f5f7f855;
  border: 1px solid #f5f7f855 !important;
}
.twpx-form-control--select .twpx-form-control__warning,
.twpx-form-control--select .twpx-form-control__hint {
  font-size: 9pt;
  margin: 5px;
  line-height: 1.1;
}
.twpx-form-control--select .twpx-form-control__warning {
  color: #ff0000;
}

/*Select*/
.twpx-form-control-select {
  position: relative;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
}
.twpx-form-control-select * {
  box-sizing: border-box;
}
.twpx-form-control-select__arrow {
  position: absolute;
  top: calc(50% - 12px);
  right: 13px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control-select__label {
  color: #000;
  position: absolute;
  top: 0;
  left: 14px;
  font-size: 14px;
  cursor: text;
  -webkit-transition: color 0.2s ease-out, -webkit-transform 0.2s ease-out,
    -webkit-font-size 0.2s ease-out;
  transition: color 0.2s ease-out, transform 0.2s ease-out,
    font-size 0.2s ease-out;
  text-align: initial;
  -webkit-transform: translateY(14px);
  transform: translateY(14px);
  pointer-events: none;
  user-select: none;
  z-index: 10;
}
.twpx-form-control-select--selected .twpx-form-control-select__label {
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  font-size: 9px;
  color: #80868e;
}
.twpx-form-control-select__content {
  display: block !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 40px 0 14px !important;
  background-color: #f5f7f8;
  border: 1px solid #f5f7f8 !important;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  position: relative;
  z-index: 9;
}
.twpx-form-control-select:hover .twpx-form-control-select__content,
.twpx-form-control-select.twpx-form-control-select--dropdown
  .twpx-form-control-select__content {
  outline: none;
  border-color: #2d3142 !important;
}
.twpx-form-control-select:hover path {
  -webkit-transition: stroke 0.2s linear;
  transition: stroke 0.2s linear;
}
.twpx-form-control-select:hover ellipse {
  -webkit-transition: fill 0.2s linear;
  transition: fill 0.2s linear;
}
.twpx-form-control-select:hover path {
  stroke: #fff;
}
.twpx-form-control-select:hover ellipse {
  fill: #2d3142;
}
.twpx-form-control-select__dropdown {
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0px 5px 10px #0000000f;
  opacity: 0;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  pointer-events: none;
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  z-index: -1;
}
.twpx-form-control-select__dropdown-item {
  background-color: #fff;
  min-height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 20px;
  color: #2d3142;
  -webkit-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  cursor: pointer;
}
.twpx-form-control-select__dropdown-item:hover {
  background-color: #f5f7f8;
}
.twpx-form-control-select.twpx-form-control-select--animate,
.twpx-form-control-select.twpx-form-control-select--dropdown {
  z-index: 101;
}
.twpx-form-control-select.twpx-form-control-select--dropdown
  .twpx-form-control-select__dropdown {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  z-index: 8;
}
.twpx-form-control-select.twpx-form-control-select--invalid
  .twpx-form-control-select__content {
  background-color: #ffefef;
  outline: 1px solid #e38080;
  color: #ff0000;
}
.twpx-form-control-select.twpx-form-control-select--invalid
  .twpx-form-control-select__label {
  color: #ff0000;
}
.twpx-form-control-select.twpx-form-control-select--disabled {
  pointer-events: none;
}
.twpx-form-control-select.twpx-form-control-select--disabled svg {
  opacity: 0.3;
}
.twpx-form-control-select.twpx-form-control-select--disabled
  .twpx-form-control-select__content {
  outline: 1px solid #c6cdd355;
  color: #80868e55;
}
.twpx-form-control-select.twpx-form-control-select--disabled
  .twpx-form-control-select__label {
  color: #80868e55;
}
.twpx-form-control-select.twpx-form-control-select--disabled.twpx-form-control-select--selected
  .twpx-form-control-select__content {
  outline: 1px solid #c6cdd355;
  color: #000;
  pointer-events: none;
}
.twpx-form-control-select.twpx-form-control-select--disabled.twpx-form-control-select--selected
  .twpx-form-control-select__label {
  color: #80868e;
}
</style>
