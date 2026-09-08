import { IconLogout } from "@tabler/icons-react";
import { logout } from "../../lib/actions";

export function LogoutButton() {
  return (
    <form action={logout} className="border-t border-border p-2">
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 text-[14px] leading-5 text-muted-foreground transition-colors hover:bg-neutral-800/40 hover:text-foreground"
      >
        <IconLogout className="size-5" />
        Logout
      </button>
    </form>
  );
}
