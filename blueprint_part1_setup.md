# 🏗️ Blueprint Part 1 — การตั้งค่าโปรเจคใหม่ + Config Files

## Phase 1: สร้างโปรเจค Next.js

```bash
# 1. สร้างโปรเจค
npx -y create-next-app@14 ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 2. ติดตั้ง Dependencies ทั้งหมด
pnpm add next-auth@5.0.0-beta.19 @auth/drizzle-adapter drizzle-orm postgres
pnpm add @hookform/resolvers react-hook-form zod
pnpm add @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-separator @radix-ui/react-switch @radix-ui/react-checkbox @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-alert-dialog @radix-ui/react-collapsible
pnpm add class-variance-authority clsx tailwind-merge tailwindcss-animate
pnpm add lucide-react sharp bcryptjs uuid date-fns lodash dotenv dotenv-expand
pnpm add -D drizzle-kit tsx @types/bcryptjs @types/uuid @types/node @types/react @types/react-dom
pnpm add -D eslint-config-prettier eslint-config-standard eslint-plugin-tailwindcss

# 3. ตั้งค่า shadcn/ui
npx shadcn-ui@latest init
```

---

## Phase 2: โครงสร้างโฟลเดอร์ — สร้างทั้งหมดนี้

```
my-project/
├── app/                          # Next.js App Router
│   ├── globals.css               # Tailwind + CSS Variables (shadcn)
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Splash/Home
│   ├── favicon.ico
│   ├── (auth)/                   # Route Group: ไม่มี sidebar
│   │   ├── layout.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── (operations)/             # Route Group: มี footer
│   │   ├── layout.tsx
│   │   └── [feature]/
│   │       └── page.tsx
│   ├── admin/                    # Admin: มี navbar + sidebar
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [feature]/
│   │       └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── signin/route.ts
│   └── monit/                    # Public monitoring
│       └── page.tsx
│
├── components/                   # React Components
│   ├── ui/                       # shadcn/ui base (auto-generated)
│   ├── shared/                   # Shared components
│   │   └── index.ts
│   ├── auth-component/           # Auth-related
│   │   ├── index.ts
│   │   └── login-form.component.tsx
│   └── [domain]/                 # Domain components
│       ├── index.ts
│       └── [name].component.tsx
│
├── constants/                    # ค่าคงที่
│   ├── index.ts
│   └── [name].constant.ts
│
├── context/                      # React Context
│   ├── index.ts
│   └── [name].context.tsx
│
├── db/                           # Database
│   ├── index.ts                  # Connection
│   ├── migrate.ts                # Migration runner
│   ├── migrations/               # Auto-generated
│   └── schema/
│       ├── index.ts
│       └── [name].schema.ts
│
├── lib/                          # Business Logic
│   ├── actions/                  # Server Actions
│   │   └── [name].actions.ts
│   ├── utils/                    # Utility functions
│   │   ├── index.ts
│   │   └── [name].utils.ts
│   └── validations/              # Zod schemas
│       └── [name].validation.ts
│
├── public/                       # Static files
│   └── assets/images/
│
├── styles/                       # Additional CSS
│   └── main.css                  # Custom utility classes
│
├── types/                        # TypeScript types
│   ├── share.ts
│   └── model/
│       ├── index.ts
│       └── [name].types.ts
│
├── auth.ts                       # NextAuth main config
├── auth.config.ts                # Credentials provider
├── middleware.ts                  # Route protection
├── routes.ts                     # Route definitions
├── env.ts                        # Env validation (Zod)
├── drizzle.config.ts             # Drizzle Kit config
├── next-auth.d.ts                # NextAuth type extension
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json               # shadcn config
├── .eslintrc.json
├── .env.local                    # Environment variables
├── Dockerfile
└── Dockerfile.dev
```

---

## Phase 3: Config Files — โค้ดจริงทุกไฟล์

### 3.1 `tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "types": ["node"],
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.2 `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals", "standard", "plugin:tailwindcss/recommended", "prettier"]
}
```

### 3.3 `components.json` (shadcn)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 3.4 `env.ts` — Validate Environment Variables
```typescript
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import * as z from "zod";
import { ZodError } from "zod";

const EnvSchema = z.object({
  DB_URI: z.string(),
  KIT_DB_URI: z.string(),
  DB_MIGRATING: z.string(),
  DB_SEEDING: z.string(),
  API_URL: z.string(),
  API_KEY: z.string(),
  API_SECRET: z.string(),
  // เพิ่ม env ตามต้องการ
});

export type TEnv = z.infer<typeof EnvSchema>;
expand(config({ path: ".env.local" }));

try {
  EnvSchema.parse(process.env);
} catch (error: any) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => { message += issue.path[0] + "\n"; });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else { console.error(error); }
}

export default EnvSchema.parse(process.env);
```

### 3.5 `routes.ts`
```typescript
export const publicRoutes = ["/", "/auth/error", "/monit"] as string[];
export const authRoutes = ["/login"] as string[];
export const apiAuthPrefix = "/api/demo/v1/auth";
export const DEFAULT_LOGIN_REDIRECT = "/machine";
```

### 3.6 `middleware.ts`
```typescript
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();
  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL("/login", nextUrl));
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
```

### 3.7 `auth.config.ts`
```typescript
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BASED_URL = process.env.BASED_URL || "http://localhost:3000";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        pin: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || typeof credentials.username !== "string" || typeof credentials.pin !== "string") {
          throw new Error("CredentialsSignin");
        }
        const response = await fetch(`${BASED_URL}/api/signin/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: credentials.username, pin: credentials.pin }),
        });
        if (!response.ok) throw new Error("CredentialsSignin");
        const fromLocalAPI = await response.json();
        if (!fromLocalAPI.success || !fromLocalAPI.data) throw new Error("CredentialsSignin");
        return fromLocalAPI.data;
      },
    }),
  ],
} satisfies NextAuthConfig;
```

### 3.8 `auth.ts`
```typescript
import db from "@/db";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getUserbyId } from "@/lib/actions/user.actions";

export const { signIn, signOut, auth, handlers } = NextAuth({
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") { if (!user.id) return false; }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.isManager = token.isManager as boolean;
        const userInfo = await getUserbyId(token.sub);
        if (userInfo) {
          session.user.permissions = userInfo.permissions as unknown as string[];
          session.user.name = userInfo.name;
          session.user.refId = userInfo.refId as string;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      if (Array.isArray(user)) {
        token.sub = user[0]?.id;
        token.isManager = user[0]?.isManager;
      }
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      token.exp = tomorrow.getTime();
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
```

### 3.9 `next-auth.d.ts`
```typescript
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isManager: boolean;
  permissions: string[];
  refId: string;
};

declare module "next-auth" {
  interface Session { user: ExtendedUser; }
}
```

### 3.10 `Dockerfile` + `Dockerfile.dev`
```dockerfile
# Dockerfile (production - multi-stage)
FROM node:20.12.2-alpine as development
RUN apk add --no-cache python3 make g++
WORKDIR /usr/src/app
COPY ./package.json ./pnpm-lock.yaml ./tsconfig.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

FROM node:20.12.2-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/pnpm-lock.yaml ./
COPY --from=development /usr/src/app/.next ./.next
COPY --from=development /usr/src/app/public ./public
RUN npm install -g pnpm && pnpm install --prod
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["pnpm","start"]
```

```dockerfile
# Dockerfile.dev
FROM node:22.17-alpine AS dev
RUN apk add --no-cache python3 make g++
WORKDIR /usr/src/app
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]
```
