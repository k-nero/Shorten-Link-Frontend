module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"brace-style": [
			1,
			"allman",
			{ "allowSingleLine": true }
		],
		"indent": [
			1,
			"tab"
		],
		"linebreak-style": [
			1,
			"windows"
		],
		"quotes": [
			1,
			"double"
		],
		"semi": [
			1,
			"always"
		],
		"no-unused-vars": [
			1,
			{ "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
		],
		"arrow-parens": [
			1,
			"always"
		],
		"template-curly-spacing": [
			"error",
			"always"
		],
		"no-await-in-loop": 0,
		"no-unreachable-loop": 0,
		"valid-typeof": 0,
		"no-template-curly-in-string": 0,
		"arrow-body-style": ["error", "always"],
		camelcase: ["warn", { properties: "always" }],
		curly: ["warn", "all"],
		"func-names": ["warn", "always"],
		"func-style": ["warn", "declaration", { allowArrowFunctions: true }],
		"no-empty": ["warn", { allowEmptyCatch: true }],

	}
};
