export class Agent {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone: number;
    businessSocialNumber: number;
  
    constructor(firstName: string, lastName: string, username: string, password: string, email: string,
                address: string, city: string, country: string, phone: number, businessSocialNumber: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.businessSocialNumber = businessSocialNumber;
    }
  
}
  