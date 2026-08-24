import { BadgeProps } from "../types/BadgeProps";

export function Badge({
  icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary-250 bg-neutral-650 px-3 py-1 text-[11px] font-medium text-primary ${className}`}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
