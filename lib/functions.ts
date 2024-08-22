export function dateValide(dateentree: string) {
  // Convertir cette chaîne en un objet Date
  const dateObject = new Date(dateentree);

  // Extraire l'année, le mois et le jour en tenant compte du format requis
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Formater la date comme 'yyyy-MM-dd'
  const formattedDate = `${year}-${month}-${day}`;

  // Utiliser `formattedDate` comme valeur pour votre champ d'entrée de type date

  return formattedDate;
}
