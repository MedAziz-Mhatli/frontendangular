import { Categorie } from "./categorie";

export class Produit {
  idProduit!: number;
//  imageProduit !: string;
  nomProduit!: string;
  prixActuel!: number;
  prixRreduction!: number;
  quantite!: number;
  idCategorie!: Categorie;
 // idVendeur!: number;
 categorie!: Categorie;

  }