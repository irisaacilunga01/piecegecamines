import LinkUrl from "@/components/linkUrl";
import { Button } from "@/components/ui/button";
import { SheetContent, Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Puzzle,
  ShoppingCart,
  SquareChartGantt,
  UserCheck,
  Users2,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { Users, verifyToken } from "@/lib/verification";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
  } else {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <LinkUrl />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/piece"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Puzzle className="h-5 w-5" />
                  Pièce
                </Link>
                <Link
                  href="/dashboard/demandeur"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <UserCheck className="h-5 w-5" />
                  Demandeur
                </Link>
                <Link
                  href="/dashboard/commande"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <SquareChartGantt className="h-5 w-5" />
                  Commande
                </Link>
                <Link
                  href="/dashboard/fournisseur"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Fournisseurs
                </Link>
                <Link
                  href="/dashboard/bonreception"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Warehouse className="h-5 w-5" />
                  Stocks
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
