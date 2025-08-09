import { Plugin } from 'vite'
import { execSync } from 'node:child_process'

/**
 * Vite 插件：在构建前运行 Prettier 格式化代码
 */
export function vitePrettier(): Plugin {
  return {
    name: 'vite-plugin-prettier',
    buildStart() {
      try {
        // 在构建开始前运行 Prettier 格式化代码
        console.log('\n[vite-plugin-prettier] 正在格式化代码...')
        execSync('npx prettier --write .', { stdio: 'inherit' })
        console.log('[vite-plugin-prettier] 代码格式化完成\n')
      } catch (error) {
        console.error('[vite-plugin-prettier] 代码格式化失败:', error)
      }
    },
  }
}
