export interface Customer {
  firstName: string;
  lastName: string;
  id: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  contracts?: Contract[];
}

export interface Contract {
  id: string;
  name: string;
  type: ContractType;
  packages?: Package[];
}

export interface Package {
  id: number;
  type: PackageType;
  name: string;
  amount: number;
  used: number;
}

export enum ContractType {
  BASIC,
  PREMIUM,
  VIP,
}

export enum PackageType {
  SMALL,
  MEDIUM,
  LARGE,
}
