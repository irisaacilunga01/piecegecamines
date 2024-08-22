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
import { addCommandeMagazin, upDateCommandeMagazin } from "@/lib/actions";
import { dateValide } from "@/lib/functions";

const FormSchema = z.object({
  dateemission: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  datelivraison: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  typedemande: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  justification: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  observation: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numcompteadebite: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantiteexpedie: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  nummagasin: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
});

export function Formulaire({
  numrecquisition = 0,
  dateemission = new Date().toDateString(),
  datelivraison = new Date().toDateString(),
  typedemande = "",
  quantiteexpedie = 0,
  justification = "",
  observation = "",
  numcompteadebite = "",
  nummagasin = 0,

  nommagasins = [
    {
      nummagasin: 0,
      nommagasin: "aucune piece",
    },
  ],
}) {
  const emission = dateValide(dateemission);
  const livraison = dateValide(datelivraison);

  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateemission: emission,
      datelivraison: livraison,
      typedemande,
      quantiteexpedie,
      justification,
      observation,
      numcompteadebite,
      nummagasin,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (numrecquisition == 0) {
      try {
        await addCommandeMagazin(data);
        toast({
          title: "Ajouter",
          description: `la commande magasin a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de la commande`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateCommandeMagazin(numrecquisition, data);
        toast({
          title: "Modifier",
          description: `la commande magasin a été modifier avec succès`,
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
          name="nummagasin"
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
                  {nommagasins.map((pres, index) => (
                    <SelectItem key={index} value={pres.nummagasin?.toString()}>
                      {pres.nommagasin}
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
          name="dateemission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Emission</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datelivraison"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date livraison</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justification</FormLabel>
              <FormControl>
                <Input placeholder="Justification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>observation</FormLabel>
              <FormControl>
                <Input placeholder="observation" {...field} />
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
