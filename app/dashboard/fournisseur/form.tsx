"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { addFournisseur, upDateFournisseur } from "@/lib/actions";

const FormSchema = z.object({
  nomfournisseur: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  email: z.string().min(2, {
    message: "quantite doit contenir aumoins 2 caractères.",
  }),
  tel: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  num: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  avenue: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  commune: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  ville: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  province: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  pays: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
});
export function Formulaire({
  idfour = 0,
  nomfournisseur = "",
  email = "",
  tel = "",
  num = "",
  avenue = "",
  commune = "",
  ville = "",
  province = "",
  pays = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nomfournisseur,
      email,
      tel,
      num,
      avenue,
      commune,
      ville,
      province,
      pays,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (idfour == 0) {
      try {
        await addFournisseur(data);
        toast({
          title: "Ajouter",
          description: `le fournisseur ${data.nomfournisseur} a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de la pièce`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateFournisseur(idfour, data);
        toast({
          title: "Modifier",
          description: `le fournisseur ${data.nomfournisseur}  a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifier",
          description: `Erreur lors de la modification`,
          className: "bg-red-700 text-white",
        });
      }
    }
    handleHidden();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="nomfournisseur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom fournisseur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Num adresse</FormLabel>
              <FormControl>
                <Input placeholder="num" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avénue</FormLabel>
              <FormControl>
                <Input placeholder="Avénue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commune"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commune</FormLabel>
              <FormControl>
                <Input placeholder="Commune" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ville"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="Pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
