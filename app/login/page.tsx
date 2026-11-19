import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, tokenSah } from "@/lib/sesi";
import FormMasuk from "@/components/FormMasuk";

export const metadata: Metadata = { title: "Masuk Admin • EventKu" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ dari?: string }> }) {
  const { dari } = await searchParams;

  // Sudah masuk? Tidak perlu melihat formulir lagi, langsung mental ke /admin
  if (await tokenSah((await cookies()).get(NAMA_COOKIE)?.value)) redirect("/admin");

  return <FormMasuk dari={typeof dari === "string" ? dari : "/admin"} />;
}