<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--color': true,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <div
      v-for="(color, i) in colors"
      class="twpx-form-control__color"
      :class="{ 'twpx-form-control--active': i === active }"
      :style="`background-color: ${color}`"
      :key="color"
      @click="chooseColor(i)"
      v-html="checkIcon"
    ></div>
    <div class="twpx-form-control__picker">
      <div class="twpx-form-control__picker-icon" v-html="pickerIcon"></div>
      <color-picker
        v-model:pureColor="color"
        format="hex"
        shape="circle"
        picker-type="chrome"
        :disableHistory="true"
        :disableAlpha="true"
      />
    </div>
  </div>
</template>

<script>
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

export default {
  data() {
    return {
      colors: [
        '#cc3333',
        '#cc3399',
        '#cc33cc',
        '#6633cc',
        '#3333cc',
        '#3366cc',
        '#3399cc',
        '#339999',
        '#339966',
        '#669933',
      ],
      pickerIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="17.606" height="15.702" viewBox="0 0 17.606 15.702">
        <g transform="translate(-1.059 -2.058)">
          <path d="M1.477,10.225l2.735,2.735c1.92,1.92,2.576,1.889,4.473,0l4.4-4.4c1.533-1.533,1.92-2.553,0-4.473L10.352,1.349C8.3-.7,7.412-.184,5.879,1.349l-4.4,4.4C-.412,7.648-.57,8.178,1.477,10.225Z" transform="translate(1.902 2.623)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
          <path  d="M.843.51l-.522.861C-.414,2.6.155,3.6,1.586,3.6s2-1,1.265-2.229L2.329.51A.8.8,0,0,0,.843.51Z" transform="translate(14.73 13.31)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
          <path  d="M0,.924a26.333,26.333,0,0,1,13.435-.1l.4.1" transform="translate(1.979 9.3)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </g>
      </svg>
      `,
      checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="14.266" height="14.266" viewBox="0 0 14.266 14.266">
        <path d="M-23356.238-20909.82l.512,5.949,9.488.051" transform="translate(31302.359 -1721.332) rotate(-45)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>
      `,
    };
  },
  props: ['control'],
  emits: ['input'],
  computed: {
    active() {
      return this.colors.findIndex(
        (c) => c.toUpperCase() === this.control.value.toUpperCase()
      );
    },
    color: {
      get() {
        return this.control.value;
      },
      set(value) {
        this.active = null;
        this.$emit('input', { value });
      },
    },
  },
  methods: {
    chooseColor(index) {
      this.active = index;
      this.$emit('input', { value: this.colors[index] });
    },
  },
  components: {
    ColorPicker,
  },
  beforeMount() {
    if (this.control.secondary) {
      this.colors.unshift(this.control.secondary);
    }
    if (this.control.primary) {
      this.colors.unshift(this.control.primary);
    }
  },
};
</script>

<style>
.twpx-form-control--color {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.twpx-form-control__color {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 8px 8px 0;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.twpx-form-control__color svg {
  display: none;
  transform: translateY(-2px);
}
.twpx-form-control__color.twpx-form-control--active svg {
  display: block;
}
.twpx-form-control__color:hover {
  opacity: 0.7;
}
.twpx-form-control__picker {
  position: relative;
  margin-bottom: 8px;
}
.twpx-form-control__picker-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control--color .vc-color-wrap {
  margin-right: 0;
}
.twpx-form-control--color .vc-color-wrap.round {
  width: 32px !important;
  height: 32px !important;
  border: none !important;
  box-shadow: none !important;
}
.twpx-form-control--color .vc-input-toggle {
  display: none;
}
.twpx-form-control--color
  .vc-chrome-colorPicker-body
  .chrome-controls
  .chrome-sliders {
  margin-left: 0 !important;
}
</style>
