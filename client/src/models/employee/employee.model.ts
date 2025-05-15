export class EmployeeModel {
  id!: string;
  fullName!: string;
  dateOfBirth!: Date;
  gender?: boolean;
  address?: string;
  email!: string;
  phoneNumber?: string;
  isActive!: boolean;
}
