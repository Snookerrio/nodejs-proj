

export interface IClinic{

    _id:string;
    name:string;
    services:string[];
    doctors:string[];
}

 export interface IClinicQuery{
    search?:string;
    service?:string;
    order?:"name" | "-name";
     doctor?:string

}