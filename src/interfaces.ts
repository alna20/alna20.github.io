export interface UserDetails {
    firstName: string;
    lastName: string;
    socialSecurity: string;
    phoneNumber: string;
    email: string;
    address: string;
    zipCode: string;
    city: string;
    [key: string]: any;
}

export interface Payload {
    deliveryDate: { value: string; hasError: boolean };
    pickupDate: { value: string; hasError: boolean };
    firstName: { value: string; hasError: boolean };
    lastName: { value: string; hasError: boolean };
    socialSecurity: { value: string };
    phoneNumber: { value: string };
    email: { value: string; hasError: boolean };
    address: { value: string; hasError: boolean };
    zipCode: { value: string; hasError: boolean };
    city: { value: string; hasError: boolean };
    message: { value: string };
    selectedContainer: { value?: ContainerCard; hasError: boolean; index: number };
    [key: string]: any;
}

export interface ContainerCard {
    emptyingFee: string;
    dailyFee: string;
    shortContainerInfo: string;
    length: string;
    width: string;
    placementFee: string;
    logo: any;
    unsortedWaste: string;
    title: string;
    gardenWaste: string;
    combustibleWaste: string;
    height: string;
    modelPath: string;
}

export interface PayloadQuery extends Payload {
    payload: string;
}
