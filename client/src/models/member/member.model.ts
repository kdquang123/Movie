export class MemberModel {
  id!: string;
  fullName!: string;
  dateOfBirth!: Date;
  gender?: boolean;
  address?: string;
  email!: string;
  phoneNumber?: string;
  isActive!: boolean;
}