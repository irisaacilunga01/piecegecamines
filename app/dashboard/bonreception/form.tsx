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
import { addBonreception, upDateBonreception } from "@/lib/actions";
import { dateValide } from "@/lib/functions";

const FormSchema = z.object({
  datereception: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numcommande: z.string({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numlivr: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  dateReceptionMarchandise: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantitecommandee: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  quantiterecues: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),

  ps: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  litigeeventuel: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  numarticle: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
  idfour: z.coerce.number({
    message: "le rôle comporter au-mois 2 caractères.",
  }),
});

export function Formulaire({
  id = 0,
  datereception = new Date().toDateString(),
  numcommande = "",
  numlivr = "",
  dateReceptionMarchandise = new Date().toDateString(),
  quantitecommandee = 0,
  quantiterecues = 0,
  ps = "",
  litigeeventuel = "",
  numarticle = 0,
  idfour = 0,
  nomarticles = [
    {
      numarticle: 0,
      nomarticle: "aucun piece",
    },
  ],

  fournisseurs = [
    {
      idfour: 0,
      nomfournisseur: "aucun fournisseur",
    },
  ],
}) {
  const reception = dateValide(datereception);
  const receptionM = dateValide(dateReceptionMarchandise);
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datereception: reception,
      numcommande,
      numlivr,
      dateReceptionMarchandise: receptionM,
      quantitecommandee,
      quantiterecues,
      ps,
      litigeeventuel,
      numarticle,
      idfour,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id == 0) {
      try {
        await addBonreception(data);
        toast({
          title: "Ajouter",
          description: `le Bonreception a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du Bonreception`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateBonreception(id, data);
        toast({
          title: "Modifier",
          description: `le Bonreception a été modifier avec succès`,
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
          name="idfour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fournisseurs</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner un fournisseur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fournisseurs.map((pres, index) => (
                    <SelectItem key={index} value={pres.idfour?.toString()}>
                      {pres.nomfournisseur}
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
          name="dateReceptionMarchandise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date reception marchandise</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datereception"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date reception</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="litigeeventuel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Littige éventuel</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numcommande"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de la commande</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numlivr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>numéro livraison</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PS</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantitecommandee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité commandée</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantiterecues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité récue</FormLabel>
              <FormControl>
                <Input {...field} />
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
