# 🏗️ Blueprint Part 2 — วิธีเขียนโค้ดทุกส่วน

## Phase 4: Database Layer (`db/`)

### 4.1 `db/index.ts` — Connection
```typescript
import * as schema from "@/db/schema";
import env from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const connection = postgres(env.DB_URI, {
  max: 10, idle_timeout: 30, connect_timeout: 10,
});

export const db = drizzle(connection, { schema, logger: true });
export type Database = typeof db;
export default db;
```

### 4.2 `db/schema/auth.schema.ts` — ตัวอย่าง Schema
```typescript
import { boolean, timestamp, pgTable, text, primaryKey, integer, varchar, json } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("app_user", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4().replaceAll("-", "")),
  name: text("name"),
  username: varchar("username", { length: 50 }).notNull(),
  pin: varchar("pin").notNull(),
  refId: text("ref_id"),
  isManager: boolean("isManager").notNull(),
  email: text("email"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  permissions: json("permission").default([]),
});

// accounts, sessions, verificationTokens, authenticators tables...
// (NextAuth standard tables — ดูจาก Drizzle Adapter docs)
```

### 4.3 `db/schema/index.ts` — Barrel export
```typescript
export * from "./auth.schema";
export * from "./transaction.schema";
// เพิ่ม schema ใหม่ที่นี่
```

### 4.4 `drizzle.config.ts`
```typescript
import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: env.KIT_DB_URI },
  verbose: true,
  strict: true,
});
```

### 4.5 `db/migrate.ts`
```typescript
import { connection, db } from "@/db";
import config from "@/drizzle.config";
import env from "@/env";
import { migrate } from "drizzle-orm/postgres-js/migrator";

if (!env.DB_MIGRATING === true) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

const StartMigation = async () => {
  try { await migrate(db, { migrationsFolder: config.out! }); }
  catch (error) {}
  finally { await connection.end(); }
};
StartMigation();
```

### DB Scripts ใน `package.json`
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "tsx db/migrate.ts",
    "db:drop": "drizzle-kit drop"
  }
}
```

---

## Phase 5: CSS (`styles/` + `globals.css`)

### 5.1 `styles/main.css` — Custom Utility Classes
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .flex-center { @apply flex justify-center items-center; }
  .flex-between { @apply flex justify-between items-center; }
  .flex-start { @apply flex justify-start items-center; }
  .screen-size { @apply h-screen w-screen; }
  .no-focus { @apply focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important; }
  .custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; border-radius: 2px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 50px; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
}
```

### 5.2 `app/globals.css` — ใช้ CSS Variables ของ shadcn + import main.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("../styles/main.css");

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... shadcn CSS variables ตามปกติ */
    --radius: 0.5rem;
  }
  .dark { /* dark mode variables */ }
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

---

## Phase 6: Utils (`lib/utils/`)

### 6.1 `lib/utils/shad-cn.utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 6.2 `lib/utils/index.ts`
```typescript
export * from "./shad-cn.utils";
export * from "./format-number.utils";
// เพิ่ม utils ใหม่ที่นี่
```

---

## Phase 7: App — Layouts + Pages

### 7.1 Root Layout
```tsx
// app/layout.tsx (Server Component)
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MachineContextProvider } from "@/context";
import { SidebarContextProvider } from "@/context/sidebar.context";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen overflow-hidden`}>
        <SessionProvider>
          <SidebarContextProvider>
            <MachineContextProvider>
              <TooltipProvider>
                <Toaster />
                {children}
              </TooltipProvider>
            </MachineContextProvider>
          </SidebarContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

### 7.2 Route Group Layouts — 3 แบบ

```tsx
// app/(auth)/layout.tsx — ไม่มี sidebar (สำหรับ login)
"use client";
import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="screen-size flex-center">
      <Suspense>{children}</Suspense>
    </div>
  );
}
```

```tsx
// app/(operations)/layout.tsx — มี footer
import { FooterMachine } from "@/components/minipos/footer";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex max-w-screen-2xl">
      <Suspense>{children}</Suspense>
      <FooterMachine />
    </div>
  );
}
```

```tsx
// app/admin/layout.tsx — มี NavBar + SideBar + Permission check
"use client";
import { NavBar, SideBar } from "@/components/backoffice/nav-side";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && !session.user.permissions.includes("BACK_OFFICE")) {
      redirect("/operation");
    }
  }, [session]);

  return (
    <>
      <NavBar />
      <div className="flex flex-1 bg-gray-100">
        <SideBar menuItems={menuItems} />
        <div className="flex-1"><Suspense>{children}</Suspense></div>
      </div>
    </>
  );
}
```

### 7.3 Page Patterns — 4 แบบ

**แบบ 1: Server Component (หน้าง่ายๆ import component)**
```tsx
// app/(auth)/login/page.tsx — ไม่มี "use client"
import { LogInForm } from "@/components/auth-component";

const LoginPage = async () => (
  <div className="flex-center">
    <LogInForm />
  </div>
);
export default LoginPage;
```

**แบบ 2: Client + ดึงข้อมูลจาก Server Action**
```tsx
// app/(operations)/machine/page.tsx
"use client";
import { getMachineSelectionList } from "@/lib/actions/machine.actions";
import { MachineSelect } from "@/components/machine";

function MachinePage() {
  const [machines, setMachines] = useState([]);
  useEffect(() => {
    getMachineSelectionList().then(setMachines);  // เรียก Server Action
  }, []);
  return machines.map((m) => <MachineSelect key={m.id} machine={m} />);
}
export default MachinePage;
```

**แบบ 3: Client + Session permission**
```tsx
"use client";
import { useSession } from "next-auth/react";

function OperationPage() {
  const { data: session } = useSession();
  const hasPermission = session?.user.permissions.includes("BACK_OFFICE");
  return <Link href={hasPermission ? "/admin" : "#"}>Admin</Link>;
}
```

**แบบ 4: Client + Constants menu rendering**
```tsx
"use client";
import { ADMIN_HOME_MENUS } from "@/constants/admin-manu";

function AdminHomePage() {
  const { data: session } = useSession();
  return ADMIN_HOME_MENUS
    .filter((item) => session?.user.permissions?.includes(item.permission))
    .map((item) => <button onClick={() => router.push(item.route)}>{item.th}</button>);
}
```

---

## Phase 8: Components

### กฎการตั้งชื่อ
- ไฟล์: `[name].component.tsx` (kebab-case)
- Export: **named export** (ไม่ใช้ default)
- ทุกโฟลเดอร์ต้องมี `index.ts` สำหรับ barrel export

### ตัวอย่าง Component พื้นฐาน
```tsx
// components/machine/machine-select.component.tsx
"use client";
import { IMachineData } from "@/types/model";
import { useMachineContext } from "@/context";

interface IMachineSelectProps {
  machine: IMachineData;           // ← ประกาศ Props interface
}

export const MachineSelect = ({ machine }: IMachineSelectProps) => {
  const { setMachineUsedState } = useMachineContext();
  const router = useRouter();

  const handleSelect = () => {
    setMachineUsedState(machine);
    router.push("/operation");
  };

  return <div onClick={handleSelect}>{machine.name}</div>;
};
```

### ตัวอย่าง Form Component (React Hook Form + Zod + shadcn)
```tsx
// components/auth-component/login-form.component.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/lib/validations/auth.validation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";

export const LogInForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { username: "", pin: "" },
  });

  const handleSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    startTransition(async () => {
      const validated = LoginFormSchema.safeParse(values);
      if (!validated.success) return;
      await signIn("credentials", { ...validated.data, redirectTo: DEFAULT_LOGIN_REDIRECT });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField control={form.control} name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        {/* pin field เหมือนกัน */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
```

### Barrel Export
```tsx
// components/auth-component/index.ts
export * from "./login-form.component";

// components/machine/index.ts
export * from "./machine-select.component";
export * from "./machine-inv-disp.component";
```

---

## Phase 9: Context

### Pattern การสร้าง Context
```tsx
// context/machine.context.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

// 1. Interface
interface IMachineCJContext {
  machineUsed: IMachineData | undefined;
  setMachineUsedState: (mc: IMachineData | undefined) => void;
}

// 2. Create Context
const MachineCJContext = createContext<IMachineCJContext | undefined>(undefined);

// 3. Provider — persist to localStorage
export function MachineContextProvider({ children }: { children: React.ReactNode }) {
  const [machineUsed, setMachineUsed] = useState<IMachineData | undefined>();

  const setMachineUsedState = (mc: IMachineData | undefined) => {
    setMachineUsed(mc);
    if (mc) localStorage.setItem("machineUsed", JSON.stringify(mc));
    else localStorage.removeItem("machineUsed");
  };

  useEffect(() => {
    const saved = localStorage.getItem("machineUsed");
    if (saved) setMachineUsed(JSON.parse(saved));
  }, []);

  return (
    <MachineCJContext.Provider value={{ machineUsed, setMachineUsedState }}>
      {children}
    </MachineCJContext.Provider>
  );
}

// 4. Custom Hook
export function useMachineContext() {
  const context = useContext(MachineCJContext);
  if (!context) throw new Error("must be within MachineContextProvider");
  return context;
}
```

### Barrel Export
```tsx
// context/index.ts
export * from "./machine.context";
export * from "./sidebar.context";
```

---

## Phase 10: Server Actions (`lib/actions/`)

### แบบ 1: ดึงข้อมูลจาก External API
```typescript
// lib/actions/machine.actions.ts
"use server";
import env from "@/env";

export async function getMachineSelectionList(): Promise<IMachineData[]> {
  const res = await fetch(`${env.API_URL}/api/machine`, {
    headers: { apikey: env.API_KEY, apisecret: env.API_SECRET },
  });
  const { data } = await res.json();
  return data || [];
}
```

### แบบ 2: Auth-only actions
```typescript
// lib/actions/auth.actions.ts
"use server";
import { auth, signOut } from "@/auth";

export async function logoutAction() { await signOut(); }
export async function sessionAction() { return await auth(); }
export async function checkPermissions(role: string) {
  const session = await auth();
  return session?.user?.permissions.includes(role);
}
```

### แบบ 3: Validate + Auth + DB + External API
```typescript
// lib/actions/deposit.actions.ts
"use server";
import { auth } from "@/auth";
import db from "@/db";
import { transaction, users } from "@/db/schema";
import { CreateDepositSchema } from "../validations/deposit.validation";

export async function postDeposit(machineId: string, remarks: string) {
  // 1. Validate
  const validData = CreateDepositSchema.safeParse({ machineId, remarks });
  if (!validData.success) return { success: false, error: "Invalid data." };

  // 2. Auth
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized." };

  // 3. DB + API
  return await db.transaction(async (tx) => {
    const [requester] = await tx.select().from(users).where(eq(users.id, session.user.id || ""));
    const [newTrans] = await tx.insert(transaction).values({...}).returning();

    const res = await fetch(`${env.API_URL}/api/pos/deposit`, {
      method: "POST",
      headers: { apikey: env.API_KEY, apisecret: env.API_SECRET },
      body: JSON.stringify({ reqId: newTrans.id, ...validData.data }),
    });
    const { success, data } = await res.json();
    return { success, id: newTrans.id };
  });
}
```

---

## Phase 11: Validations (`lib/validations/`)

```typescript
// lib/validations/auth.validation.ts
import * as z from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  pin: z.string().min(1, { message: "Password is required" }),
});
```

**ใช้ 2 ที่:**
1. **Form** → `zodResolver(LoginFormSchema)` ใน React Hook Form
2. **Server Action** → `LoginFormSchema.safeParse(data)` ก่อน process

---

## Phase 12: Types + Constants

### Types — `types/model/[name].types.ts`
```typescript
// types/model/machine.types.ts
export interface IMachineData { id: string; name: string; status: string; }

// types/model/index.ts
export * from "./machine.types";
```

### Constants — `constants/[name].constant.ts`
```typescript
// constants/pos.constant.ts
export const DEFAULT_POS = "POS001";

// constants/index.ts
export * from "./pos.constant";
```

---

## 📋 Naming Conventions Checklist

| ส่วน | Pattern ชื่อไฟล์ | Export แบบ |
|---|---|---|
| Component | `[name].component.tsx` | `export const X = ()` (named) |
| Server Action | `[name].actions.ts` | `export async function X()` |
| Validation | `[name].validation.ts` | `export const XSchema = z.object()` |
| Context | `[name].context.tsx` | `export function XProvider()` + `export function useX()` |
| DB Schema | `[name].schema.ts` | `export const tableName = pgTable()` |
| Type | `[name].types.ts` / `[name].type.ts` / `[name].d.ts` | `export interface IX` / `export type TX` |
| Constants | `[name].constant.ts` | `export const X_Y` |
| Utils | `[name].utils.ts` | `export function x()` |
| Barrel Export | `index.ts` | `export * from "./xxx"` (ทุกโฟลเดอร์) |
| Page | `page.tsx` | `export default` |
| Layout | `layout.tsx` | `export default` |

### Import Rules
```tsx
// ✅ ใช้ @/ alias + import จาก folder
import { MachineSelect } from "@/components/machine";
import { useMachineContext } from "@/context";
import db from "@/db";
import env from "@/env";

// ❌ ห้ามใช้ relative path ข้ามโฟลเดอร์
import { MachineSelect } from "../../components/machine/machine-select.component";
```
