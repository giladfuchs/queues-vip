export type BusinessDetails = {
  details: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };

  otherData: {
    logo?: string;
    links?: { [key: string]: string };
    about?: string;
    notifications?: [string];
    guestPermission: boolean;
  };
};
