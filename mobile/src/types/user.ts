export type Info = {
  id: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  sex?: number;
  email?: string;
  phone?: string;
  Roles: Role[];
  isDismissed: boolean;
};
export type Role = {
  id: string;
  name: string;
};
