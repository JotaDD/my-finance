export class User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  hashedPassword: string;
  hashedRefreshToken: string;
  isActive: boolean;
}
