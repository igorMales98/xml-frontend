export class RegistrationRequest {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  address: string;
  phone: string;

  constructor(username: string, password: string, firstName: string, lastName: string, email: string, city: string, country: string,
              address: string, phone: string) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.city = city;
    this.country = country;
    this.address = address;
    this.phone = phone;
  }

}
