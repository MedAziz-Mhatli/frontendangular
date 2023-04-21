
    import { Chapitres } from "./Chapitres";
    import { Enseignant } from "./Enseignant";
  //  import { TypeContenuCours } from "./TypeContenuCours";
    import { TypeCours } from "./TypeCours";

export class Cours {
    id: number;
    public nomCours: string;
   
    public typeCours: TypeCours;
    public chapitre: Chapitres;
    public enseignant: Enseignant;
    public imageCours:string;
  //  public typeContenuCours:TypeContenuCours;

    }


