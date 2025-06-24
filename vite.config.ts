import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

const minimizeObfuscatorConfig = {
    autoExcludeNodeModules: true,
    threadPool: { enable: true, size: 4 },

    stringArray: true,
    stringArrayEncoding: ['base64', 'rc4'],
    stringArrayThreshold: 1,
    splitStrings: true,
    splitStringsChunkLength: 3,
    transformObjectKeys: true,
    unicodeEscapeSequence: true,

    numbersToExpressions: true,

    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            nodePolyfills(),
            tsconfigPaths(),
            ...(mode === 'mainnet' ? [vitePluginBundleObfuscator(minimizeObfuscatorConfig)] : [])
        ],
        server: {
            host: true, // open the app in browser on its own, no manual intervention
            port: parseInt(env.VITE_PORT) || 3000
        },
        build: {
            outDir: 'build',
            sourcemap: false
        }
    };
});
