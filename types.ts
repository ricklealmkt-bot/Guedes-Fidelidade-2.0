
export interface Service {
  id: string;
  type: string;
  price: number;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  vehicleModel: string;
  plate: string;
  birthDate: string;
  referralSource: string;
  phone: string;
  favoriteTeam: string;
  services: Service[];
  stamps: number; // Current active stamps (0-10)
  totalServicesCount: number; // Total history
}

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER'
}

export const SERVICE_TYPES = [
  "Lavagem Simples",
  "Geral Completa",
  "Polimento",
  "Martelinho de Ouro",
  "Higienização Interna",
  "Cristalização"
];
