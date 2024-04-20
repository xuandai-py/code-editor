"use client";

import ReduxProvider from "@/reduxTLK/store/ReduxProvider";
import LoginForm from "./LoginForm";

export default function ClientLoginFormWrapper() {
  return (
    <ReduxProvider>
      <LoginForm />
    </ReduxProvider>
  );
}