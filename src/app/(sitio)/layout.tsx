import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsappFab } from "@/components/whatsapp-fab";

export default function SitioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
