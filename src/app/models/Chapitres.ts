import { Cours } from "./Cours";
import { Matieres } from "./Matieres";

export class Chapitres {
   
    constructor( id?: any,
    public nomChapitre?: string,
    public descriptionChapitre?: string,
    public matiereChapitre?: Matieres,
    public cours?: Cours,
     public periode?: string,
    public imageChapitre?: string,
   ){}
    }