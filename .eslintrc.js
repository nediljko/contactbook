module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: ['semistandard', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'arrow-parens': 'off',
    'no-debugger': 'warn',
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'sort-imports': ['error', { ignoreCase: true }],
    // Vue rules
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 5 }],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'EVENTS',
        'CONTENT',
        'GLOBAL',
        'OTHER_ATTR'
      ]
    }],
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        ['template', 'render', 'renderError'],
        ['parent', 'functional', 'delimiters', 'comments'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'methods',
        'watch',
        'LIFECYCLE_HOOKS',
        ['directives', 'filters'],
        'components'
      ]
    }]
  }
};
