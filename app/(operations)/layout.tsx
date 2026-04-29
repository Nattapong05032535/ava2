import { Suspense } from "react";

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex max-w-screen-2xl">
      <Suspense>{children}</Suspense>
    </div>
  );
}
