import IModel from '../../common/IModel.interface';

class PromoCodeModel implements IModel {
    promoCodeId: number;
    code: string;
    isUsed: boolean;
}

export default PromoCodeModel;