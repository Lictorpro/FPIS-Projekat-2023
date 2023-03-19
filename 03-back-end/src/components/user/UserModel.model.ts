import IModel from '../../common/IModel.interface';
import PromoCodeModel from '../promo-code/PromoCodeModel';
import EventModel from '../event/EventModel.model';

export interface IUserEvent {
    event: EventModel,
    createdAt: Date,
    discount: number
}

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

    promoCode?: PromoCodeModel = null;
    events?: IUserEvent[] = [];
}

export default UserModel;