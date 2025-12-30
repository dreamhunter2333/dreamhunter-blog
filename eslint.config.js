import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            },
            globals: {
                document: 'readonly',
                window: 'readonly',
                location: 'readonly',
                URLSearchParams: 'readonly',
                Sakana: 'readonly'
            }
        }
    },
    {
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-self-closing': ['error', {
                html: { void: 'always', normal: 'never', component: 'always' }
            }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/ban-ts-comment': 'off'
        }
    },
    {
        ignores: ['node_modules/', 'docs/.vitepress/dist/', 'docs/.vitepress/cache/']
    }
)
