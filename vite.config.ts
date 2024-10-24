import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [preact(), tsconfigPaths(), EnvironmentPlugin(['API_KEY'])],
})
