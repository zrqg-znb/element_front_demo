// .prettierrc.js
export default {
  // 每行最大字符数，超出部分会被换行
  printWidth: 100,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 在对象或数组最后一个元素后面是否加逗号
  trailingComma: 'all',
  // 在语句末尾是否使用分号
  semi: false,
  // 缩进空格数
  tabWidth: 2,
  // 是否使用tab进行缩进
  useTabs: false,
  // 在对象字面量中是否使用空格
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行
  bracketSameLine: false,
  // 箭头函数，只有一个参数的时候，是否需要括号
  arrowParens: 'avoid',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 不格式化 HTML 中的内容
  htmlWhitespaceSensitivity: 'ignore',
  // Vue文件中的<script>和<style>内的代码是否缩进
  vueIndentScriptAndStyle: false,
}
