"use client";

import {
  Home,
  LayoutDashboard,
  Puzzle,
  ShoppingCart,
  SquareChartGantt,
  Store,
  User,
  UserCheck,
  UserCog,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { toast } from "./ui/use-toast";

function LinkUrl() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <LayoutDashboard className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Rck tv</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard" ? "bg-muted text-primary" : null
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/piece"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/piece"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Puzzle className="h-5 w-5" />
                <span className="sr-only">Pièce</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Pièces</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/demandeur"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/demandeur"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <UserCheck className="h-5 w-5" />
                <span className="sr-only">Demandeur</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Demandeurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/magasindestinataire"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/magasindestinataire"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Store className="h-5 w-5" />
                <span className="sr-only">magasins</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">magasins</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/commande"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/commande"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <SquareChartGantt className="h-5 w-5" />

                <span className="sr-only">commandes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">commandes</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/fournisseur"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/fournisseur"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">fournisseur</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">fournisseurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/bonreception"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/bonreception"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Warehouse className="h-5 w-5" />
                <span className="sr-only">Stock</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Stocks</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/users"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <UserCog className="h-5 w-5" />
                <span className="sr-only">Utilisateurs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Utilisateurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7 bg-blue-700 cursor-pointer" asChild>
              <User className="p-1" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Votre compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response = await fetch("/api/auth/logout");

                if (response.ok) {
                  // Redirige l'utilisateur après une connexion réussie
                  toast({
                    title: "Déconnexion réussie",
                    description: "Vous êtes maintenant déconnecté.",
                    className: "bg-green-700",
                  });
                  window.location.href = "/login";
                } else {
                  toast({
                    title: "Échec de l'authentification",
                    description: "Erreur de deconnexion.",
                    className: "bg-red-700",
                  });
                }
              }}
            >
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default LinkUrl;
