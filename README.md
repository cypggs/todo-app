# 待办事项应用

一个使用 **Next.js** + **Supabase** + **Vercel** 构建的简约待办事项应用。

## 线上地址

- **生产环境**：https://todo-jvw0of68g-cypggs-projects.vercel.app
- **Vercel 仪表盘**：https://vercel.com/cypggs-projects/todo-app
- **GitHub 仓库**：https://github.com/cypggs/todo-app

## 功能

- ✅ 添加待办事项
- ✅ 标记完成 / 取消完成
- ✅ 删除待办事项
- ✅ 数据实时持久化到 Supabase
- ✅ 响应式界面，支持深色模式

## 技术栈

- [Next.js 16](https://nextjs.org/)（App Router）
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，并填入你的 Supabase 项目信息：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 数据库初始化

在 Supabase 项目的 SQL Editor 中执行 `database.sql`（位于仓库根目录），创建 `todos` 表、RLS 策略和触发器。

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可使用。

## 部署

本项目已配置自动部署：每次推送代码到 GitHub 的 `main` 分支，Vercel 会自动重新构建并部署。

## 环境变量

| 变量名 | 说明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名（anon）密钥 |

## 项目结构

```
todo-app/
├── app/
│   ├── components/
│   │   └── TodoApp.tsx      # 待办事项交互组件
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase.ts          # Supabase 客户端
├── database.sql             # Supabase 数据库初始化脚本
├── next.config.ts
├── package.json
└── README.md
```

## 许可证

MIT
