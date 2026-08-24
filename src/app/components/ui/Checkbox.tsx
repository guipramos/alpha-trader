import { CheckboxProps } from "../types/CheckboxProps";

export function Checkbox({
  label,
  id,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 select-none"
    >
      <input
        id={id}
        type="checkbox"
        className={`size-4 shrink-0 cursor-pointer rounded-[2px] border border-primary-250 bg-neutral-550 accent-primary ${className}`}
        {...props}
      />
      {label ? (
        <span className="text-[13px] leading-5 text-primary-150">{label}</span>
      ) : null}
    </label>
  );
}
