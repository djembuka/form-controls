<template>
  <div class="twpx-form-control-heading">{{ control.label }}</div>
</template>

<script>
export default {
  props: ['control'],
};
</script>

<style>
.twpx-form-control-heading {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
