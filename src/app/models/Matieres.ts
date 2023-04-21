import { FichierMatiere } from "./FichierMatiere";
import { Chapitres } from "./Chapitres";
import { Niveau } from "./Niveau";
import { SectionNiveau } from "./SectionNiveau";
export class Matieres {
    constructor( id?: any,
    public nomMatiere?: string,
    public descriptionMatiere?: string,
    public sectionNiveau?: SectionNiveau,
    public etatMatiere?: boolean,
     public imageMatiere?: string,
    public fichierMatieres?: FichierMatiere,
    public chapitres?: Chapitres
    ){}
    }