import { ReactNode } from "react";
import { PlansBar } from "./PlansMenu";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div
        className="relative mx-auto min-h-screen w-full max-w-[440px] overflow-hidden pb-40"
        style={{ backgroundImage: "var(--gradient-glow)" }}
      >
        <PlansBar />
        {children}
      </div>
    </div>
  );
}
