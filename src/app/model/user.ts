export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  advertisementsPosted: number;
  enabled: boolean;
  canPostAdvertisement: boolean;
  canRent: boolean;
  canSendMessage: boolean;
  canCreatePricelist: boolean;
  type: string;

  constructor(firstName: string, lastName: string, email: string, country: string, city: string, address: string, phone: string, enabled: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
    this.city = city;
    this.address = address;
    this.phone = phone;
    this.enabled = enabled;
  }


}
