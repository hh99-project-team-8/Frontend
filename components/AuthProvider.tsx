"use client";

import React from "react";
import { signIn } from "next-auth/react";

type AuthProviderProps = {};

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProvider: React.FC<AuthProviderProps> = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-7 py-3.5 bg-neutral-950 text-white text-[13px] rounded-full font-semibold transition hover:bg-neutral-600 duration-300 hidden lg:flex"
    >
      Log in
    </button>
  );
};

export default AuthProvider;
