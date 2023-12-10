<template>
  <label class="slr2-page-settings__radio">
    <input class="with-gap" name="group1" type="radio" :checked="checked" />
    <span>{{ label || '' }}</span>
  </label>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['label', 'checked'],
};
</script>

<style scoped>
[type='radio']:not(:checked),
[type='radio']:checked {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

[type='radio']:not(:checked) + span,
[type='radio']:checked + span {
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  display: block;
  height: 20px;
  font-size: 1rem;
  -webkit-transition: 0.28s ease;
  transition: 0.28s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[type='radio'] + span:before,
[type='radio'] + span:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  z-index: 0;
  -webkit-transition: 0.28s ease;
  transition: 0.28s ease;
}

[type='radio']:not(:checked) + span:before,
[type='radio']:not(:checked) + span:after,
[type='radio']:checked + span:before,
[type='radio']:checked + span:after,
[type='radio'].with-gap:checked + span:before,
[type='radio'].with-gap:checked + span:after {
  border-radius: 50%;
}

[type='radio']:not(:checked) + span:before,
[type='radio']:not(:checked) + span:after {
  border: 2px solid transparent;
}

[type='radio']:not(:checked) + span:after {
  -webkit-transform: scale(0);
  transform: scale(0);
}

[type='radio']:checked + span:before {
  border: 2px solid transparent;
}

[type='radio']:checked + span:after,
[type='radio'].with-gap:checked + span:before,
[type='radio'].with-gap:checked + span:after {
  border: 2px solid var(--slr2-buttons);
}

[type='radio']:checked + span:after,
[type='radio'].with-gap:checked + span:after {
  background-color: var(--slr2-buttons);
}

[type='radio']:checked + span:after {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

[type='radio'].with-gap:checked + span:after {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}

[type='radio'].with-gap:disabled:checked + span:before {
  border: 2px solid rgba(0, 0, 0, 0.42);
}

[type='radio'].with-gap:disabled:checked + span:after {
  border: none;
  background-color: rgba(0, 0, 0, 0.42);
}

[type='radio']:disabled:not(:checked) + span:before,
[type='radio']:disabled:checked + span:before {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.42);
}

[type='radio']:disabled + span {
  color: rgba(0, 0, 0, 0.42);
}

[type='radio']:disabled:not(:checked) + span:before {
  border-color: rgba(0, 0, 0, 0.42);
}

[type='radio']:disabled:checked + span:after {
  background-color: rgba(0, 0, 0, 0.42);
  border-color: #949494;
}
</style>
