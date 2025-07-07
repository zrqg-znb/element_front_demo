# 瑞卿demo - Element Plus 管理系统

这是一个基于 Vue 3 和 Element Plus 的后台管理系统模板，具有现代化的UI设计和丰富的功能组件。

## 功能特点

- 📱 响应式布局，支持多种设备
- 🎨 基于 Element Plus 的UI组件
- 🚀 Vue 3 组合式 API
- 📦 Vite 构建工具
- 🔐 权限管理
- 📋 多页签功能
- 📊 丰富的图表组件

## 开发环境

- Node.js >= 22

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/zrqg-znb/element_front_demo.git
cd element-ui-demo
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:5173

## 构建部署

构建生产环境版本：
```bash
npm run build
```

预览构建结果：
```bash
npm run preview
```

## 目录结构

```
├── src/
│   ├── api/          # API 接口
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── layout/       # 布局组件
│   ├── router/       # 路由配置
│   ├── store/        # 状态管理
│   ├── views/        # 页面组件
│   ├── App.vue       # 根组件
│   └── main.js       # 入口文件
├── public/           # 公共资源
└── vite.config.js    # Vite 配置
```

## 开发指南

1. API 接口调用示例：
```javascript
import { getUserList } from '@/api/user'

// 获取用户列表
const users = await getUserList({ page: 1, limit: 10 })
```

2. 新增路由页面：
- 在 `src/views` 下创建页面组件
- 在 `src/router/index.js` 中添加路由配置
- 在 `src/layout/Layout.vue` 的侧边栏中添加菜单项

## 注意事项

1. 开发时请确保后端服务已启动，默认后端接口地址为：`http://localhost:3000`
2. 如需修改接口地址，请在 `vite.config.js` 中更新 proxy 配置
3. 生产环境部署时，需要配置正确的 API 地址

## 技术支持

如有问题，请提交 Issue 或联系技术支持。
