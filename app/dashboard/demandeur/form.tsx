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
import { addDemandeur, upDateDemandeur } from "@/lib/actions";

const FormSchema = z.object({
  nomdemandeur: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  numfonction: z.string().min(2, {
    message: "quantite doit contenir aumoins 2 caractères.",
  }),
  numtel: z.string().min(2, {
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
});
export function Formulaire({
  nummatricule = 0,
  nomdemandeur = "",
  numfonction = "",
  numtel = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nomdemandeur,
      numfonction,
      numtel,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (nummatricule == 0) {
      try {
        await addDemandeur(data);
        toast({
          title: "Ajouter",
          description: `le demandeur ${data.nomdemandeur} a été ajouter avec succès`,
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
        await upDateDemandeur(nummatricule, data);
        toast({
          title: "Modifier",
          description: `le demandeur ${data.nomdemandeur}  a été modifier avec succès`,
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
          name="nomdemandeur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom demandeur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numfonction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Num fonction</FormLabel>
              <FormControl>
                <Input placeholder="numfonction" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numtel"
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
        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
