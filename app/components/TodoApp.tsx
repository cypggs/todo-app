"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
    setLoading(false);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const { data, error } = await supabase
      .from("todos")
      .insert({ title: newTitle.trim() })
      .select()
      .single();
    if (error) {
      console.error("Error adding todo:", error);
      return;
    }
    setTodos((prev) => [data, ...prev]);
    setNewTitle("");
  }

  async function toggleTodo(todo: Todo) {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);
    if (error) {
      console.error("Error updating todo:", error);
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    );
  }

  async function deleteTodo(id: string) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
      return;
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
        待办事项
      </h1>

      <form onSubmit={addTodo} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="添加新任务..."
          className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2 text-foreground placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-white/10 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2 font-medium text-background transition hover:opacity-90"
        >
          添加
        </button>
      </form>

      {loading ? (
        <p className="text-center text-zinc-500">加载中...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-zinc-500">暂无任务，添加一个吧！</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="h-5 w-5 cursor-pointer accent-foreground"
                />
                <span
                  className={`text-foreground ${
                    todo.completed ? "text-zinc-400 line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-sm text-red-500 transition hover:text-red-600"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
