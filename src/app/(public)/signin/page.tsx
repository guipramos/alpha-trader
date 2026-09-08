"use client";

import {
  IconKey,
  IconLockPassword,
  IconLogin2,
  IconShieldCheck,
} from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo } from "../../components/Logo";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { login } from "../../lib/actions";
import { LoginInput, loginSchema } from "../../schemas/login-schema";
import { useState } from "react";

export default function Signin() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    const result = await login(data);

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-102 rounded-lg border border-elevated bg-neutral-650 p-8">
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          <Logo />
          <h1 className="text-[32px] leading-9.5 font-bold tracking-[-0.8px]">
            Alpha Trader
          </h1>
          <span className="block text-[14px] leading-5.5 font-normal text-primary-150">
            Pro Trader Login
          </span>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            id="email"
            label="E-mail"
            placeholder="Digite seu melhor e-mail"
            icon={<IconKey />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            placeholder="Digite sua senha"
            type="password"
            icon={<IconLockPassword />}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              id="trust-device"
              label="Lembrar-me"
              {...register("rememberMe")}
            />
            <a
              href="#"
              className="text-[13px] text-primary-150 hover:text-foreground"
            >
              Esqueci a senha?
            </a>
          </div>

          <Button
            type="submit"
            icon={<IconLogin2 className="size-5" />}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>

        {error ? (
          <p className="mt-3 text-[12px] text-tertiary">{error}</p>
        ) : null}

        <div className="mt-6 flex flex-col items-center gap-4">
          <hr className="w-full border-elevated" />

          <Badge icon={<IconShieldCheck className="size-3.5" />}>
            Security Status: Encrypted
          </Badge>
        </div>
      </div>
    </div>
  );
}
