import { ButtonProps } from "../types/ButtonProps";

export function Button({
  icon,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary-300 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
