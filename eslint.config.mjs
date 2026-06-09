import nextConfig from "eslint-config-next"
import { globalIgnores } from "eslint/config"

const eslintConfig = [
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]

export default eslintConfig
