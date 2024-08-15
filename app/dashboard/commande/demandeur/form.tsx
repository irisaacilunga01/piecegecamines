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
import { addCommande, upDateCommande } from "@/lib/actions";

const FormSchema = z.object({
  datedemande: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numcompte: z.string({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  destination: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  motif: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  fichiermanle: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantiteservie: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  dateservie: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  nummatricule: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numarticle: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
});

export function Formulaire({
  numbon = 0,
  datedemande = new Date().toDateString(),
  numcompte = "",
  destination = "",
  motif = "",
  fichiermanle = "",
  quantiteservie = 0,
  dateservie = new Date().toDateString(),
  nummatricule = 0,
  numarticle = 0,

  nomarticles = [
    {
      numarticle: 0,
      nomarticle: "aucun piece",
    },
  ],
  nomdemandeurs = [
    {
      nummatricule: 0,
      nomdemandeur: "aucun demandeur",
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
      datedemande,
      numcompte,
      destination,
      motif,
      fichiermanle,
      quantiteservie,
      dateservie,
      nummatricule,
      numarticle,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    alert({ data });

    handleHidden();
    if (numbon == 0) {
      try {
        await addCommande(data);
        toast({
          title: "Ajouter",
          description: `la commande a été ajouter avec succès`,
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
        await upDateCommande(numbon, data);
        toast({
          title: "Modifier",
          description: `la commande a été modifier avec succès`,
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
          name="nummatricule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demandeur</FormLabel>
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
                  {nomdemandeurs.map((pres, index) => (
                    <SelectItem
                      key={index}
                      value={pres.nummatricule?.toString()}
                    >
                      {pres.nomdemandeur}
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
          name="motif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif</FormLabel>
              <FormControl>
                <Input placeholder="motif" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input placeholder="Destination" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numcompte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro compte</FormLabel>
              <FormControl>
                <Input placeholder="Numéro compte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantiteservie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité servie</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fichiermanle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>fichiermanle</FormLabel>
              <FormControl>
                <Input placeholder="fichiermanle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datedemande"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date demande</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateservie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date servie</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
