import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'

const minimizeObfuscatorConfig = {
    autoExcludeNodeModules: true,
    // autoExcludeNodeModules: { enable: true, manualChunks: ['vue'] }
    threadPool: true,
    // threadPool: { enable: true, size: 4 }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    const isProd = env.ENV === 'production'

    return {
        plugins: [react(), nodePolyfills(), tsconfigPaths(), vitePluginBundleObfuscator(minimizeObfuscatorConfig)],
        server: {
            host: true, // open the app in browser on its own, no manual intervention
            port: parseInt(env.VITE_PORT) || 3000,
        },
        build: {
            outDir: 'build',
            sourcemap: false,
        },
    }
})
