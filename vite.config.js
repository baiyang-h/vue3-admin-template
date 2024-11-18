import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  console.log(process.env.NODE_ENV, mode);
  console.log(env.VITE_API_BASE_URL);

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      // 示例：根据环境变量设置服务器配置
      proxy: {
        '/hhh': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
        // 正则表达式写法：
        // http://localhost:5173/fallback/
        // -> http://jsonplaceholder.typicode.com/
        // '^/fallback/.*': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/fallback/, ''),
        // },
      },
    }
  }
})
