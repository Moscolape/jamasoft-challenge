// Interface for the geographic coordinates
interface Geo {
  lat: string;
  lng: string;
}

// Interface for the address
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Interface for the company details
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Interface for the user
export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: Address;
  phone: string;
  website?: string;
  company?: Company;
}
