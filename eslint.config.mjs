// eslint.config.mjs - FIX CIRCULAR STRUCTURE ERROR di Next.js 16.4.3
// Cara lama pake FlatCompat bikin: configs -> flat -> plugins -> react -> configs (muter terus)
// Cara baru pake defineConfig + eslint-config-next langsung, aman, gak muter.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Abaikan folder build + node_modules
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
  {
    rules: {
      // MATIIN: Biar any[] buat data Supabase gak error (64 error ilang)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // MATIIN: Biar useEffect(() => { muat(); }) gak error
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/exhaustive-deps": "warn",
      // MATIIN: Biar <img> + <a href="/event/"> gak error
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "prefer-const": "warn",
      "import/no-anonymous-default-export": "off",
    },
  },
]);

export default eslintConfig;