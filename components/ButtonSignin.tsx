/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  return (
    <Link href="/get-started" className={`btn ${extraStyle ? extraStyle : ""}`}>
      {text}
    </Link>
  );
};

export default ButtonSignin;
