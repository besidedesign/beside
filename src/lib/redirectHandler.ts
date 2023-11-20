import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sendForm = urlParams.get("sendForm");

    if (sendForm !== "true") {
      router.push("/");
    }
  }, [router]);

  return null;
}
