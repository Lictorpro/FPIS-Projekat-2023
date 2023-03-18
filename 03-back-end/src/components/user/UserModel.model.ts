import IModel from '../../common/IModel.interface';

class UserModel implements IModel {
    userId: number;
    forename: string;
    surname: string;
    company: string;
    primaryAddress: string;
    secondaryAddress: string;
    postalCode: number;
    city: string;
    country: string;
    email: string;
    accessToken: string;
    promoCodeId: number;
}

export default UserModel;