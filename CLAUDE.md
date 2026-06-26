# CLAUDE.md

## 项目概述

待办事项应用，基于 Next.js 16 App Router + Supabase + Vercel。

## 常用命令

```bash
npm run dev      # 本地开发
npm run build    # 生产构建
npm run lint     # ESLint 检查
```

## 架构说明

- `app/components/TodoApp.tsx`：客户端组件，负责待办事项的增删改查 UI 和状态管理。
- `lib/supabase.ts`：使用 `@supabase/supabase-js` 创建的浏览器客户端。
- Supabase `todos` 表：包含 `id`, `title`, `completed`, `created_at`, `updated_at`。
- RLS 策略：当前为公开演示模式，允许匿名用户进行完整的 CRUD 操作。

## 环境变量

开发/生产都需要：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 数据库变更

如需修改表结构：

1. 更新 `database.sql`。
2. 在 Supabase SQL Editor 中执行新的 SQL（或使用 Management API `/database/query`）。
3. 提交代码并推送到 `main`，Vercel 会自动重新部署。

## 部署信息

- Vercel 项目：`cypggs-projects/todo-app`
- 生产域名：https://todo-jvw0of68g-cypggs-projects.vercel.app
- GitHub 仓库：https://github.com/cypggs/todo-app
