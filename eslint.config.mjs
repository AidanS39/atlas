import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import next from "eslint-config-next";

const config = [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    ...next,

    {
        languageOptions: {
            globals: globals.browser,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            indent: "off",
            quotes: "off",
            semi: "off",
            "max-len": "off",
            curly: "off",
            "no-console": ["warn", { allow: ["error"] }],
            "prefer-const": "error",
            "no-var": "error",
            eqeqeq: ["error", "always"],
            "react/react-in-jsx-scope": "off",
        },
    },
];

export default config;
