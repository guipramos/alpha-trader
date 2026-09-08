import { IconButtonProps } from "../types/IconButtonProps";

export function IconButton({
  children,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
