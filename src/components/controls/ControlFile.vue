<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--file': true,
      'twpx-form-control--active': active,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
  >
    <img
      :src="disabled"
      class="twpx-form-control__file__disabled-icon"
      v-if="false"
    />
    <span
      class="twpx-form-control__file__clear"
      @click.prevent="clearInputFile"
      v-if="isClearable"
    ></span>
    <div
      class="twpx-form-control__file"
      :class="{
        filled: isFilled,
        clearable: isClearable,
      }"
      ref="controlFile"
    >
      <span class="twpx-form-control__file__label">{{ control.label }}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.383"
        height="24"
        viewBox="0 0 17.383 24"
        v-html="icon"
      ></svg>

      <input
        type="file"
        :name="control.name"
        :id="control.id"
        @change="uploadFile($refs.inputFile.files)"
        ref="inputFile"
      />
      <label
        :for="control.id"
        class="active"
        v-html="label"
        ref="dropzone"
      ></label>
    </div>
    <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      files: [],
      default: '<a href="">Выберите файл</a>&nbsp;или перетащите в поле',
      hint: this.control.hint_external,
      icon: `<g transform="translate(-4.461)">
          <g transform="translate(4.461)">
            <g>
              <path d="M21.844,6.573v15.88A1.547,1.547,0,0,1,20.3,24H6.008a1.546,1.546,0,0,1-1.547-1.547V1.547A1.546,1.546,0,0,1,6.008,0H15.27Z" transform="translate(-4.461)" class="a"/>
            </g>
            <path d="M20.036,8.289l5.677,2.339v-2.2l-3.218-.951Z" transform="translate(-8.33 -1.858)" class="b"/>
            <path d="M25.416,6.573H20.389a1.546,1.546,0,0,1-1.547-1.547V0Z" transform="translate(-8.033)" class="c"/>
          </g>
          <path d="M18.117,19.012l-2.85-2.85a.555.555,0,0,0-.785,0l-2.85,2.85a.555.555,0,0,0,.785.784l1.9-1.9v5.024a.555.555,0,1,0,1.109,0V17.894l1.9,1.9a.555.555,0,0,0,.785-.784Z" transform="translate(-1.741 -3.974)" class="d"/>
        </g>`,
    };
  },
  props: ['control'],
  emits: ['input'],
  computed: {
    disabled() {
      return this.control.disabled;
    },
    invalid() {
      return !!this.invalidString;
    },
    isClearable() {
      return !!this.filename;
    },
    isFilled() {
      return !!this.filename;
    },
    invalidString() {
      if (this.files[0] && this.files[0].size && this.files[0].name) {
        if (this.files[0].size >= this.control.maxsize) {
          //this.files = [];
          return `Размер файла превышает ${this.formatSize(
            this.control.maxsize
          )}`;
        }

        const filename = this.files[0].name;
        const lastIndex = filename.lastIndexOf('.');
        const regExp = new RegExp(this.control.accept.join('|'));

        if (!regExp.test(filename.substring(lastIndex + 1).toLowerCase())) {
          return `Прикладывайте файлы ${this.control.accept
            .map((w) => w.toUpperCase())
            .join(', ')}.`;
        }
      }
      return '';
    },
    label() {
      if (this.invalid) {
        return this.invalidString;
      }
      if (this.files[0] && this.files[0].name) {
        return this.files[0].name;
      }
      if (this.control.value) {
        return this.control.value;
      }
      return this.default;
    },
    filename() {
      return this.control.value;
    },
    clearWatcher() {
      return this.control.clearWatcher;
    },
  },
  watch: {
    clearWatcher() {
      this.clearInputFile();
    },
  },
  methods: {
    uploadFile(files) {
      this.files = files;
      if (!this.invalidString) {
        this.$emit('input', { value: files[0].name, file: files[0] });
      }
    },
    clearInputFile() {
      this.files = [];
      this.$refs.inputFile.value = '';
      this.$emit('input', { value: '' });
    },
    cancelEvent(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    getCoords(elem) {
      let box = elem.getBoundingClientRect();

      return {
        top: box.top + scrollY,
        left: box.left + scrollX,
      };
    },
    formatSize(length) {
      var i = 0,
        type = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];
      while ((length / 1000) | 0 && i < type.length - 1) {
        length /= 1000;
        i++;
      }
      return parseInt(length) + ' ' + type[i];
    },
  },
  mounted() {
    //drag&drop file
    const dropZone = this.$refs.dropzone;
    const controlFile = this.$refs.controlFile;
    if (!dropZone) {
      return;
    }
    dropZone.addEventListener('drag', this.cancelEvent);
    dropZone.addEventListener('dragstart', this.cancelEvent);
    dropZone.addEventListener('dragend', this.cancelEvent);
    dropZone.addEventListener('dragover', this.cancelEvent);
    dropZone.addEventListener('dragenter', this.cancelEvent);
    dropZone.addEventListener('dragleave', this.cancelEvent);
    dropZone.addEventListener('drop', this.cancelEvent);

    dropZone.addEventListener('dragover', () => {
      controlFile.classList.add('dragover');
    });
    dropZone.addEventListener('dragenter', () => {
      controlFile.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', (e) => {
      let dx = e.pageX - this.getCoords(dropZone).left;
      let dy = e.pageY - this.getCoords(dropZone).top;
      if (
        dx < 0 ||
        dx > dropZone.clientWidth ||
        dy < 0 ||
        dy > dropZone.clientHeight
      ) {
        controlFile.classList.remove('dragover');
      }
    });

    dropZone.addEventListener('drop', (e) => {
      controlFile.classList.remove('dragover');
      this.uploadFile(e.dataTransfer.files);
    });
  },
};
</script>

<style>
.twpx-form-control--file {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
}
.twpx-form-control__file__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
  display: none;
}
.twpx-form-control__file label span {
  color: #ea4420;
}

/*File*/
.twpx-form-control__file {
  position: relative;
  margin-bottom: 0;
}
.twpx-form-control__file.deleting {
  pointer-events: none;
}
.twpx-form-control__file svg {
  position: absolute;
  top: 12px;
  left: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control__file.deleting svg {
  display: none;
}
.twpx-form-control__file input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -1;
}
.twpx-form-control__file label {
  display: block;
  background-color: #f5f7f8;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  padding: 0 20px 0 46px;
  border-radius: 3px;
  border: 1px solid #f5f7f8;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}
.twpx-form-control__file.clearable label {
  padding-right: 40px;
}
.twpx-form-control__file label a {
  pointer-events: none;
  -webkit-transition: none;
  transition: none;
  color: #0a16aa;
  text-decoration: none;
}
.twpx-form-control__file label:hover {
  border-color: #2d3142;
}
.twpx-form-control__file .a,
.twpx-form-control__file .b,
.twpx-form-control__file .c,
.twpx-form-control__file .d {
  -webkit-transition: fill 0.3s ease;
  transition: fill 0.3s ease;
}
.twpx-form-control__file .a {
  fill: #7293a0;
}
.twpx-form-control__file .b {
  fill: #3f6676;
}
.twpx-form-control__file .c {
  fill: #bbd1d9;
}
.twpx-form-control__file .d {
  fill: #fff;
}
.twpx-form-control__file:active .a,
.twpx-form-control__file.dragover .a,
.twpx-form-control__file.filled .a {
  fill: #fff;
}
.twpx-form-control__file:active .b,
.twpx-form-control__file.dragover .b,
.twpx-form-control__file.filled .b {
  fill: #a7bde8;
}
.twpx-form-control__file:active .c,
.twpx-form-control__file.dragover .c,
.twpx-form-control__file.filled .c {
  fill: #d0e0ff;
}
.twpx-form-control__file:active .d,
.twpx-form-control__file.dragover .d,
.twpx-form-control__file.filled .d {
  fill: #7293a1;
}
.twpx-form-control__file:active label,
.twpx-form-control__file.dragover label,
.twpx-form-control__file.filled label {
  background-color: #7293a1;
  color: #fff;
}
.twpx-form-control__file:active label a,
.twpx-form-control__file.dragover label a,
.twpx-form-control__file.filled label a,
.twpx-form-control__file:active .twpx-form-control__file__label,
.twpx-form-control__file.dragover .twpx-form-control__file__label,
.twpx-form-control__file.filled .twpx-form-control__file__label {
  color: #fff;
}
/*invalid*/
.twpx-form-control--file.twpx-form-control--invalid .a,
.twpx-form-control--file.twpx-form-control__file--invalid:active .a {
  fill: #ff0000;
}
.twpx-form-control--file.twpx-form-control--invalid .b,
.twpx-form-control--file.twpx-form-control__file--invalid:active .b {
  fill: #b10101;
}
.twpx-form-control--file.twpx-form-control--invalid .c,
.twpx-form-control--file.twpx-form-control__file--invalid:active .c {
  fill: #fcc;
}
.twpx-form-control--file.twpx-form-control--invalid .d,
.twpx-form-control--file.twpx-form-control__file--invalid:active .d {
  fill: #fff;
}
/*.twpx-form-control--invalid .a,
.twpx-form-control--invalid .b,
.twpx-form-control--invalid:active .a,
.twpx-form-control--invalid:active .b {
  stroke: #ff0000;
}*/
.twpx-form-control--file.twpx-form-control--invalid label,
.twpx-form-control--file.twpx-form-control--ivalid:active label {
  background-color: #ffeaea;
  color: #ff0000;
  border-color: #e38080;
}
.twpx-form-control--file.twpx-form-control--invalid:hover label,
.twpx-form-control--file.twpx-form-control--invalid:hover:active label {
  border-color: #ff0000;
}
.twpx-form-control--file.twpx-form-control--invalid label a,
.twpx-form-control--file.twpx-form-control--invalid:active label a {
  color: #ff0000;
}
.twpx-form-control--file.twpx-form-control--disabled .twpx-form-control__file {
  pointer-events: none;
}
.twpx-form-control--file.twpx-form-control--disabled
  .twpx-form-control__file
  label,
.twpx-form-control--file.twpx-form-control--disabled:active
  .twpx-form-control__file
  label {
  color: #00000055;
  pointer-events: none;
  background-color: #f5f7f855;
  border: 1px solid #f5f7f855 !important;
}
.twpx-form-control--file.twpx-form-control--disabled label a,
.twpx-form-control--file.twpx-form-control--disabled:active label a {
  color: #0a16aa55;
}
.twpx-form-control--file.twpx-form-control--disabled svg {
  opacity: 0.3;
}

.twpx-form-control__file__label {
  position: absolute;
  top: 5px;
  left: 46px;
  font-size: 9px;
  color: #2d3142;
  pointer-events: none;
  line-height: 1.1;
  z-index: 10;
}
.twpx-form-control--file.twpx-form-control--invalid
  .twpx-form-control__file__label {
  color: #ff0000;
}
.twpx-form-control--file.twpx-form-control--disabled
  .twpx-form-control__file__label {
  color: #2d3142;
  opacity: 0.3;
}
.twpx-form-control__file__clear {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: opacity 0.5s ease;
  z-index: 10;
}

.twpx-form-control__file__clear:hover {
  opacity: 0.7;
}

.twpx-form-control__file__clear:before {
  content: '';
  display: block;
  height: 20px;
  border-left: 2px solid #fff;
  transform: rotate(45deg);
  position: absolute;
  top: -2px;
  left: 7px;
  z-index: 10;
}
.twpx-form-control__file__clear:after {
  content: '';
  display: block;
  height: 20px;
  border-left: 2px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  top: -2px;
  left: 7px;
  z-index: 10;
}

.twpx-form-control__file__clear.btn--load-circle {
  position: absolute;
}
.twpx-form-control__file__clear.btn--load-circle:after {
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  right: calc(50% - 10px);
  left: auto;
}
.twpx-form-control__file__clear.btn--load-circle:before {
  display: none;
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
