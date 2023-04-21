import { TypeFichierMatiere } from "./TypeFichierMatiere";

export class FichierMatiere {
    id: number;
    public nomFichierMatiere: string;
    public descriptionFichier: string;
    public formatFichier: string;
    public lienFichier: boolean;
     public typeFichier: TypeFichierMatiere;
    
    }