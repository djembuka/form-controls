import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      controls: [
        {
          type: 'text',
          id: 'id1',
          name: 'NAME',
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
        {
          type: 'textarea-format',
          id: 'id2',
          name: 'TEXT_FORMATTED',
          label: 'Textarea с форматированием',
          value:
            'Lorem ipsum dolor sit <b>amet</b> consectetur adipisicing elit. <a href="">Ab blanditiis</a> molestias <i>velit eaque</i>, ut dolorum dolore aperiam dolorem? Obcaecati <span style="color: pink;">facere magni</span>, eligendi deleniti corrupti totam, temporibus magnam vero reprehenderit veritatis illo ab impedit quibusdam aliquid! Inventore illum, deserunt sunt qui repellat natus soluta? Itaque magnam odit facilis, nemo similique, molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          required: true,
          disabled: false,
          hint_external: 'Подробно опишите задание',
          // dependency: 'id2',
        },
        {
          type: 'textarea',
          id: 'id3',
          name: 'TEXT',
          label: 'Textarea',
          value:
            'Lorem ipsum dolor sit consectetur adipisicing elit. molestias, ut dolorum dolore aperiam dolorem? Obcaecati, eligendi deleniti corrupti totam, temporibus magnam vero reprehenderit veritatis illo ab impedit quibusdam aliquid! Inventore illum, deserunt sunt qui repellat natus soluta? Itaque magnam odit facilis, nemo similique, molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          required: true,
          disabled: false,
          hint_external: 'Подробно опишите задание',
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
        case 'textarea':
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
