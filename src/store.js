import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      controls: [
        {
          property: 'heading',
          id: 'idH0',
          label: 'Datepicker -  https://vue3datepicker.com/installation/',
        },
        {
          property: 'date',
          type: 'single',
          id: 'id45',
          label: 'Календарь',
          name: 'DATE',
          required: true,
          value: '28.02.2024',
          hint_external:
            'Подсказка для checkbox может быть неожиданно очень длинной.',
          dependency: 'id6',
        },
        {
          property: 'date',
          type: 'range',
          id: 'id45',
          label: 'Календарь',
          name: 'DATE',
          required: true,
          value: ['20.02.2024', '28.02.2024'],
          hint_external:
            'Подсказка для checkbox может быть неожиданно очень длинной.',
          dependency: 'id6',
        },
        {
          property: 'file',
          id: 'id0',
          name: 'FILE',
          label: 'Картинка превью',
          value: '',
          required: true,
          disabled: false,
          accept: ['pdf', 'exe', 'jpg'],
          image: true,
          maxsize: 10000000,
          hint_external: 'Загрузите картинку превью',
          dependency: 'id6',
        },
        {
          property: 'text',
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
          // dependency: 'id6',
        },
        {
          property: 'textarea',
          type: 'formatted',
          id: 'id2',
          name: 'TEXT_FORMATTED',
          label: 'Textarea с форматированием',
          value:
            'Lorem ipsum dolor sit <b>amet</b> consectetur adipisicing elit. <a href="">Ab blanditiis</a> molestias <i>velit eaque</i>, ut dolorum dolore aperiam dolorem? Obcaecati <span style="color: pink;">facere magni</span>, eligendi deleniti corrupti totam, temporibus magnam vero reprehenderit veritatis illo ab impedit quibusdam aliquid! Inventore illum, deserunt sunt qui repellat natus soluta? Itaque magnam odit facilis, nemo similique, molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          required: true,
          disabled: false,
          hint_external: 'Подробно опишите задание',
          // dependency: 'id6',
        },
        {
          property: 'textarea',
          type: 'plain',
          id: 'id3',
          name: 'TEXT',
          label: 'Textarea',
          value:
            'Lorem ipsum dolor sit <b>amet</b> consectetur adipisicing elit. <a href="">Ab blanditiis</a> molestias <i>velit eaque</i>, ut dolorum dolore aperiam dolorem? Obcaecati <span style="color: pink;">facere magni</span>, eligendi deleniti corrupti totam, temporibus magnam vero reprehenderit veritatis illo ab impedit quibusdam aliquid! Inventore illum, deserunt sunt qui repellat natus soluta? Itaque magnam odit facilis, nemo similique, molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          required: true,
          disabled: false,
          hint_external: 'Подробно опишите задание',
          // dependency: 'id6',
        },
        {
          property: 'heading',
          id: 'idH0',
          label: 'Пункты для выбора',
        },
        {
          property: 'multiselect',
          id: 'id4',
          name: 'POINTS',
          options: [
            {
              label: 'Машиностроение',
              code: '23423423423',
            },
            {
              label: 'Сельское хозяйство',
              code: '324234324',
            },
            {
              label: 'Пункт 2',
              code: '324234325',
            },
            {
              label: 'Пункт 2',
              code: '324234326',
            },
            {
              label: 'Пункт 2',
              code: '324234327',
            },
            {
              label: 'Длинный пункт меню',
              code: '324234328',
            },
            {
              label: 'Сельское хозяйство',
              code: '324234329',
            },
            {
              label: 'Длинный пункт меню',
              code: '3242343210',
            },
            {
              label: 'Пункт 2',
              code: '3242343211',
            },
            {
              label: 'Пункт 2',
              code: '3242343212',
            },
          ],
          value: [],
          required: false,
          disabled: false,
          hint_external: 'Выберите несколько пунктов из списка',
          // dependency: 'id6',
        },
        {
          property: 'select',
          type: 'radio',
          id: 'id5',
          name: 'ACTIVITY_TYPES',
          label: 'Radio кнопки',
          options: [
            {
              label:
                'molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
              code: '23423423423',
            },
            {
              label: 'Сельское хозяйство',
              code: '324234324',
            },
            {
              label:
                'Очень длинный пункт меню, который можно добавить к радио кнопке с переносом строки',
              code: '324234325',
            },
          ],
          value: '23423423423',
          hint_external:
            'Введите подсказку для этого блока, которая может быть очень длинная, но мы не будем ее выводить всегда, иногда подсказки не будет совсем.',
          //   dependency: 'id6',
        },
        {
          property: 'checkbox',
          type: 'switch',
          id: 'id11',
          name: 'SWITCH',
          required: false,
          label:
            'labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          value: 'on',
          checked: true,
          disabled: false,
          hint_external: '',
        },
        {
          property: 'checkbox',
          type: 'switch',
          id: 'id11',
          name: 'SWITCH',
          required: false,
          label:
            'molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          value: 'on',
          checked: true,
          disabled: false,
          hint_external: '',
        },
        {
          property: 'checkbox',
          type: 'switch',
          id: 'id11',
          name: 'SWITCH',
          required: false,
          label: '',
          value: 'on',
          checked: true,
          disabled: false,
          hint_external: '',
        },
        {
          property: 'checkbox',
          type: 'switch',
          id: 'id11',
          name: 'SWITCH',
          required: false,
          label:
            'Eligendi amet aliquid quis maiores dolore eum minus illo sapiente',
          value: 'on',
          checked: true,
          disabled: false,
          hint_external:
            'Подсказка для checkbox может быть неожиданно очень длинной.',
        },
        {
          property: 'checkbox',
          type: 'checkbox',
          id: 'id6',
          name: 'DEPENDENCY_CHECKBOX',
          required: false,
          label:
            'molestias est atque velit sit unde aliquam quis, quod dolore! Eligendi amet aliquid quis maiores dolore eum minus illo sapiente, reprehenderit optio id non repudiandae voluptas, nisi officiis necessitatibus itaque soluta at voluptate odit quasi porro. Corrupti laudantium cupiditate labore voluptate dolores magnam ea non sunt sint facere velit, harum illum?',
          value: 'on',
          checked: false,
          disabled: false,
          hint_external:
            'Подсказка для checkbox может быть неожиданно очень длинной.',
        },
        {
          property: 'checkbox',
          type: 'checkbox',
          id: 'id7',
          name: 'SIMPLE_CHECKBOX',
          required: true,
          label: 'Простой зависимый checkbox',
          value: 'some',
          checked: false,
          disabled: false,
          hint_external: 'Или короткой',
          dependency: 'id6',
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
    changeFileValue(_, { control, value }) {
      control.value = value;
    },
    changeTextControlValue(_, { control, value }) {
      control.value = value;
    },
    changeMultiselectValue(_, { control, value, checked }) {
      if (value === undefined || checked === undefined) return;
      if (checked === false) {
        const index = control.value.indexOf(value);
        if (index >= 0) {
          control.value.splice(index, 1);
        }
      } else {
        control.value.push(value);
      }
    },
    changeCheckboxValue(_, { control, checked }) {
      control.checked = checked;
    },
    changeSelectRadioValue(_, { control, value }) {
      control.value = value;
    },
    changeDateValue(_, { control, value }) {
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
    changeControlValue({ commit }, { control, value, checked }) {
      switch (control.property) {
        case 'text':
        case 'textarea':
          commit('changeTextControlValue', { control, value });
          break;
        case 'multiselect':
          commit('changeMultiselectValue', { control, value, checked });
          break;
        case 'checkbox':
          commit('changeCheckboxValue', { control, checked });
          break;
        case 'select':
          commit(
            `changeSelect${control.type
              .substring(0, 1)
              .toUpperCase()}${control.type.substring(1).toLowerCase()}Value`,
            { control, value }
          );
          break;
        case 'file':
          commit('changeFileValue', { control, value });
          break;
        case 'date':
          commit('changeDateValue', { control, value });
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
