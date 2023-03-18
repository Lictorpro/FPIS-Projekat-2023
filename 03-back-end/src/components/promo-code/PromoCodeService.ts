import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import PromoCodeModel from './PromoCodeModel';
import IAddPromoCode from './dto/IAddPromoCodeDto.dto';
import IEditPromoCode from './dto/IEditPromoCodeDto.dto';
interface IPromoCodeAdapterOptions extends IAdapterOptions {

}

const DefaultPromoCodeAdapterOptions: IPromoCodeAdapterOptions = {

}

class PromoCodeService extends BaseService<PromoCodeModel, IPromoCodeAdapterOptions>{

    tableName(): string {
        return "promo_code";
    }

    protected async adaptToModel(data: any): Promise<PromoCodeModel> {
        const promoCode: PromoCodeModel = new PromoCodeModel();

        promoCode.promoCodeId = +data?.promo_code_id;
        promoCode.code = data?.code;
        promoCode.isUsed = +data?.is_used === 1;

        return promoCode;
    }

    public async add(data: IAddPromoCode): Promise<PromoCodeModel> {
        return this.baseAdd(data, DefaultPromoCodeAdapterOptions);
    }

    public async editById(promoCodeId: number, data: IEditPromoCode): Promise<PromoCodeModel> {
        return this.baseEditById(promoCodeId, data, DefaultPromoCodeAdapterOptions);
    }

    public async deleteById(promoCodeId: number): Promise<boolean> {
        return this.baseDelete(promoCodeId);
    }
}

export default PromoCodeService;
export { DefaultPromoCodeAdapterOptions }