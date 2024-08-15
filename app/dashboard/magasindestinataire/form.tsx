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
import {
  addMagasinDestinataire,
  upDateMagasinDestinataire,
} from "@/lib/actions";

const FormSchema = z.object({
  nommagasin: z.string().min(2, {
    message: "quantite doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({ nummagasin = 0, nommagasin = "" }) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nommagasin,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (nummagasin == 0) {
      try {
        await addMagasinDestinataire(data);
        toast({
          title: "Ajouter",
          description: `le magasin ${data.nommagasin} a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du magasin`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateMagasinDestinataire(nummagasin, data);
        toast({
          title: "Modifier",
          description: `le magasin ${data.nommagasin}  a été modifier avec succès`,
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
          name="nommagasin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du magazin destinataire</FormLabel>
              <FormControl>
                <Input placeholder="nom" {...field} />
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
