<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--date': true,
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
    <div class="twpx-form-control__calendar-icon" v-html="calendarIcon"></div>
    <div class="twpx-form-control__label">{{ control.label }}</div>
    <VueDatePicker
      v-model="date"
      @range-start="onRangeStart"
      @range-end="onRangeEnd"
      locale="ru"
      range
      multi-calendars
      ref="controlDateRange"
      :format="'dd.MM.yyyy'"
    >
      <template #action-buttons></template>
      <template #action-preview></template>
      <template #time-picker></template
    ></VueDatePicker>
    <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker },
  data() {
    return {
      start: '',
      hint: this.control.hint_external,
      calendarIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="15.9" height="17.499" viewBox="0 0 15.9 17.499">
        <g transform="translate(0.75 0.75)">
            <path d="M0,0V2.4" transform="translate(4)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path d="M0,0V2.4" transform="translate(10.4)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path d="M0,0H13.6" transform="translate(0.4 5.672)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path d="M14.4,4v6.8c0,2.4-1.2,4-4,4H4c-2.8,0-4-1.6-4-4V4C0,1.6,1.2,0,4,0h6.4C13.2,0,14.4,1.6,14.4,4Z" transform="translate(0 1.199)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path d="M.495.5H.5" transform="translate(9.662 8.859)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path d="M.495.5H.5" transform="translate(9.662 11.26)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path d="M.495.5H.5" transform="translate(6.701 8.859)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path d="M.495.5H.5" transform="translate(6.701 11.26)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path d="M.495.5H.5" transform="translate(3.74 8.859)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path d="M.495.5H.5" transform="translate(3.74 11.26)" fill="none" stroke="#2d3142" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </g>
      </svg>`,
    };
  },
  props: ['control'],
  emits: ['input'],
  computed: {
    date: {
      get() {
        let date = [];
        if (
          this.control.value &&
          typeof this.control.value === 'object' &&
          this.control.value.length
        ) {
          this.control.value.forEach((d) => {
            if (typeof d === 'string') {
              const valueArray = d.split('.');
              if (valueArray.length && valueArray.length === 3) {
                date.push(`${valueArray[1]}/${valueArray[0]}/${valueArray[2]}`);
              }
            }
          });
        }

        return date;
      },
      set(value) {
        this.$emit('input', { value });
      },
    },
    active() {
      let result = false;
      if (this.control.value && typeof this.control.value === 'object') {
        result = !!this.control.value.length;
      }
      return result;
    },
    invalid() {
      return false;
    },
    disabled() {
      return this.control.disabled;
    },
  },
  methods: {
    onRangeStart(start) {
      this.start = start;
    },
    onRangeEnd(end) {
      this.date = [this.formatDate(this.start), this.formatDate(end)];
      this.$refs.controlDateRange.closeMenu();
    },
    formatDate(date) {
      const d = new Date(date);
      let day = String(d.getDate());
      let month = String(d.getMonth() + 1);

      day = day.length === 1 ? `0${day}` : day;
      month = month.length === 1 ? `0${month}` : month;

      return `${day}.${month}.${d.getFullYear()}`;
    },
  },
};
</script>

<style>
.twpx-form-control--date {
  position: relative;
  margin-bottom: var(--slr2-gap-middle);
  width: 100%;
}
.twpx-form-control--date .twpx-form-control__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control--date .twpx-form-control__calendar-icon {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control--date .twpx-form-control__label {
  position: absolute;
  top: 0;
  left: 40px;
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
  z-index: 100;
}
.twpx-form-control--date.twpx-form-control--active .twpx-form-control__label {
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  font-size: 9px;
  color: #2d3142;
}
.twpx-form-control--date.twpx-form-control--invalid .twpx-form-control__label {
  color: #ff0000;
}
.twpx-form-control--date.twpx-form-control--disabled .twpx-form-control__label {
  color: #2d3142;
  opacity: 0.3;
}
.twpx-form-control--date .dp__input {
  display: block !important;
  width: 100%;
  margin: 0 !important;
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
  padding-left: 40px;
}
.twpx-form-control--date .dp__input:focus,
.twpx-form-control--date .dp__input:hover {
  outline: none;
  border-color: #2d3142 !important;
}
.twpx-form-control--date.twpx-form-control--invalid
  .twpx-form-control
  .dp__input {
  background-color: #fff5f5;
  border-color: #e38080 !important;
  outline: none;
  color: #ff0000;
}
.twpx-form-control--date.twpx-form-control--disabled
  .twpx-form-control
  .dp__input {
  color: #00000055;
  pointer-events: none;
  background-color: #f5f7f855;
  border: 1px solid #f5f7f855 !important;
}
.twpx-form-control--date .twpx-form-control__warning,
.twpx-form-control--date .twpx-form-control__hint {
  font-size: 9pt;
  margin: 5px;
  line-height: 1.1;
}
.twpx-form-control--date .twpx-form-control__warning {
  color: #ff0000;
}

/*Datepicker*/
:root {
  /*General*/
  --dp-font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei',
    sans-serif;
  --dp-border-radius: 3px; /*Configurable border-radius*/
  --dp-cell-border-radius: 0px; /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: 32px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 32px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 32px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 14px; /*Icon sizing in buttons*/
  --dp-cell-size: 32px; /*Width and height of calendar cell*/
  --dp-cell-padding: 5px; /*Padding in the cell*/
  --dp-common-padding: 12px; /*Common padding used*/
  --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
  --dp-menu-min-width: 245px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 0px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 0px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 10px 10px; /*Menu padding*/

  /*Font sizes*/
  --dp-font-size: 0.875rem; /*Default font-size*/
  --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: 0.1s; /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(
    0.4,
    0,
    1,
    1
  ); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out; /*Timing on slide animations*/
}
.twpx-form-control--date .dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #73879c;
  --dp-hover-color: #dbedfb;
  --dp-hover-text-color: #73879c;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1284e7;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #dbedfb;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #dbedfb);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #73879c);
  --dp-range-between-border-color: var(--dp-hover-color, #dbedfb);
}

.twpx-form-control--date .dp__input {
  height: 48px;
  color: #2d3142;
}
.twpx-form-control--date .dp__menu {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}
.twpx-form-control--date .dp__cell_inner {
  font-size: 12px;
}
.twpx-form-control--date .dp__cell_inner:hover {
  background: #f3f9fe;
}
.twpx-form-control--date .dp__cell_inner.dp__range_start:hover,
.twpx-form-control--date .dp__cell_inner.dp__range_end:hover {
  background: var(--dp-primary-color);
}
.twpx-form-control--date .dp__calendar_header {
  font-weight: normal;
}
.twpx-form-control--date .dp__today {
  border-color: transparent;
}
.twpx-form-control--date .dp__calendar_item .dp__today {
  color: #2a90e9;
}
.twpx-form-control--date .dp__calendar_item .dp__today.dp__range_start,
.twpx-form-control--date .dp__calendar_item .dp__today.dp__range_end {
  color: var(--dp-primary-text-color);
}
.twpx-form-control--date .dp__calendar_header_item {
  text-transform: capitalize;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.twpx-form-control--date .dp__calendar_header_separator,
.twpx-form-control--date .dp__action_row {
  display: none;
}

.twpx-form-control--date .dp__clear_icon {
  width: 26px;
  height: 26px;
  top: 50%;
}
.twpx-form-control--date .dp__clear_icon:hover {
  opacity: 0.7;
}
</style>
