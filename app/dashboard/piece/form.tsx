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
import { addPiece, upDatePiece } from "@/lib/actions";

const FormSchema = z.object({
  nomarticle: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  quantite: z.coerce.number({
    message: "quantite doit contenir aumoins 2 caractères.",
  }),
  quantitealerte: z.coerce.number({
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  poids: z.coerce.number({
    message: "quantitealerte doit contenir aumoins 2 caractères.",
  }),
  specification: z.string().min(2, {
    message: "la specification doit contenir aumoins 2 caractères.",
  }),
  uc: z.string().min(2, {
    message: "l'uc doit contenir aumoins 2 caractères.",
  }),
  butler: z.string({
    message: "le butler doit contenir aumoins 2 caractères.",
  }),
  etagere: z.string({
    message: "l'etagere doit contenir aumoins 2 caractères.",
  }),
  trave: z.string({
    message: "l'etagere doit contenir aumoins 2 caractères.",
  }),
  rayon: z.string({
    message: "l'etagere doit contenir aumoins 2 caractères.",
  }),
  imageurl: z.string({
    message: "l'etagere doit contenir aumoins 2 caractères.",
  }),
});
export function Formulaire({
  numarticle = 0,
  nomarticle = "",
  quantite = 0,
  specification = "",
  uc = "",
  quantitealerte = 0,
  butler = "",
  etagere = "",
  trave = "",
  rayon = "",
  poids = 0,
  imageurl = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nomarticle,
      quantite,
      specification,
      uc,
      quantitealerte,
      butler,
      etagere,
      trave,
      rayon,
      poids,
      imageurl,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    console.log({ data });

    if (numarticle == 0) {
      try {
        await addPiece(data);
        toast({
          title: "Ajouter",
          description: `la pièce ${data.nomarticle} a été ajouter avec succès`,
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
        await upDatePiece(numarticle, data);
        toast({
          title: "Modifier",
          description: `la pièce ${data.nomarticle}  a été modifier avec succès`,
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
          name="nomarticle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spécification</FormLabel>
              <FormControl>
                <Input placeholder="spécification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input placeholder="Quantité" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantitealerte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité alerte</FormLabel>
              <FormControl>
                <Input placeholder="Quantité alerte" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids</FormLabel>
              <FormControl>
                <Input placeholder="Poids" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="butler"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Butler</FormLabel>
              <FormControl>
                <Input placeholder="butler" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="etagere"
          render={({ field }) => (
            <FormItem>
              <FormLabel>étagère</FormLabel>
              <FormControl>
                <Input placeholder="étagère" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trave"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travé</FormLabel>
              <FormControl>
                <Input placeholder="Travé" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rayon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rayon</FormLabel>
              <FormControl>
                <Input placeholder="Rayon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UC</FormLabel>
              <FormControl>
                <Input placeholder="uc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="coler l'URL vers l'image" {...field} />
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
