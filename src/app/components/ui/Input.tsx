"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { forwardRef, useState } from "react";
import { InputProps } from "../types/InputProps";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      placeholder = "",
      id,
      icon,
      type,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col">
        <div className="mt-1">
          {label ? (
            <label
              htmlFor={id}
              className="text-[11px] font-semibold leading-2.75 tracking-[0.66px] text-primary-150 uppercase"
            >
              {label}
            </label>
          ) : null}
        </div>
        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-primary-150 [&>svg]:size-5">
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={id}
            className={`border border-primary-250 bg-neutral-550 py-3 h-12 rounded-md placeholder:text-[14px] placeholder:text-primary-150 w-full ${icon ? "pl-11" : "pl-3"} ${isPassword ? "pr-11" : "pr-3"} ${className}`}
            placeholder={placeholder}
            {...props}
            type={inputType}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-3 flex items-center text-primary-150 cursor-pointer"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <IconEyeOff className="size-5" />
              ) : (
                <IconEye className="size-5" />
              )}
            </button>
          ) : null}
        </div>
        {error ? (
          <span className="mt-1 text-[12px] text-tertiary">{error}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
