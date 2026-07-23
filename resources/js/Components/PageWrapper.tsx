import { usePage } from "@inertiajs/react";
import { Toaster } from "./ui/sonner";
import { SharedData } from "@/types";
import { toast } from "sonner";

export function PageWrapper({ children } : { children: React.ReactNode }) {
  const { flash } = usePage<SharedData>().props;
  if (flash.success) toast.success(flash.success);
  if (flash.warning) toast.warning(flash.warning);
  if (flash.info) toast.info(flash.info);
  return (
    <>
      <div className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">{children}</div>
      <Toaster position="top-center" richColors />
    </>
  );
}
