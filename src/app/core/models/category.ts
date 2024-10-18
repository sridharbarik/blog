import { CollectionReference, DocumentData } from "firebase/firestore";

export interface Category {
    value(data: CollectionReference<DocumentData>, value: any): unknown;
    category:string,
    id:string
}
