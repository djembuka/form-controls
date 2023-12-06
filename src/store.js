import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      controls: [
        {
          type: 'text',
          id: 'id1',
          label: 'Текстовое поле',
          value: '2',
          required: true,
          disabled: false,
          regexp: '^(0|1|2)$',
          regexp_description: 'Значение поля должно быть 0, или 1, или 2',
          hint_internal: 'Введите 0, 1 или 2',
          hint_external: 'Введите от 0 до 2',
          // dependency: 'id2',
        },
      ],
    };
  },
  getters: {
    controls(state) {
      return state.controls;
    },
  },
  mutations: {
    changeTextControlValue(_, { control, value }) {
      control.value = value;
    },
    validateControl(_, control) {
      control.validateWatcher = !control.validateWatcher;
    },
    focusControl(_, control) {
      control.focusWatcher = !control.focusWatcher;
    },
    disableControl(_, { control, value }) {
      control.disabled = value;
    },
  },
  actions: {
    changeControlValue({ commit }, { control, value }) {
      switch (control.type) {
        case 'text':
          commit('changeTextControlValue', { control, value });
          break;
      }
    },
    validateControl({ commit }, { control }) {
      commit('validateControl', control);
    },
    focusControl({ commit }, { control }) {
      commit('focusControl', control);
    },
    disableControl({ commit }, { control, value }) {
      commit('disableControl', { control, value });
    },
  },
});
