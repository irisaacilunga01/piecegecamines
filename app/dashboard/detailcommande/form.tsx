"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { addDetailCommande, upDateDetailCommande } from "@/lib/actions";

const FormSchema = z.object({
  numarticle: z.coerce.number( {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantiteafournir: z.coerce.number( {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantitedemandee: z.coerce.number( {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numrecquisition: z.coerce.number( {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  bo: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),

});

export function Formulaire({
  numarticle=0,
  bo= "",
  quantiteafournir= 0,
  quantitedemandee= 0,
  numrecquisition= 0,

  nomarticles = [
    {
      numarticle: 0,
      nomarticle: "aucun article enregistré"
    },
  ],
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numarticle,
  bo ,
  quantiteafournir,
  quantitedemandee,
  numrecquisition,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (numrecquisition == 0) {
      try {
        await addDetailCommande(data);
        toast({
          title: "Ajouter",
          description: `le détail de la commande du magasin a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du détail de la commande`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateDetailCommande(numrecquisition, data);
        toast({
          title: "Modifier",
          description: `le détail de la commande magasin a été modifier avec succès`,
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
          name="numarticle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pièce</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nomarticles.map((pres, index) => (
                    <SelectItem key={index} value={pres.numarticle?.toString()}>
                      {pres.nomarticle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BO</FormLabel>
              <FormControl>
                <Input placeholder="Bo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantiteafournir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité commandée</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantitedemandee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité demandée</FormLabel>
              <FormControl>
                <Input placeholder="quantitedemandee" {...field} />
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
