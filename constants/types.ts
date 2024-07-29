import hosts from  './hosts.json'
import categories from  './categories.json'

export interface CategoriesType {
    _id: string;
    category_code: string;
    image: string;
    name: string;
    type_service: "hospitality" | "real_estate" | "transport" | "adventure" | "cultural";
    status: "active";
    added_date: string; // This should ideally be a Date type, but it's provided as string in the data
  }


  // export type HostType =  typeof hosts[0]

  export type CategoryType =  typeof categories[0]


  // 
  export interface HostType  {
    _id: string; 
    name: string;
    About: string;
    address: string;
    latitude: number; 
    longitude: number; 
    price: number; 
    category: string;
    amenities: string[]; 
    userId: string; 
    images: string[]; 
    beds: number; 
    status: boolean;
    __v: number;
  }
  