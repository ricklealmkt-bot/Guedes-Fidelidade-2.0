
/**
 * Common types and constants for Guedes Fidelidade application.
 */

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER'
}

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
  favoriteTeam: string;
  services: Service[];
  stamps: number;
  totalServicesCount: number;
  referralSource?: string;
  phone?: string;
}

export const SERVICE_TYPES = [
  "Lavagem Simples",
  "Geral Completa",
  "Polimento",
  "Martelinho de Ouro",
  "Higienização Interna",
  "Cristalização"
];
