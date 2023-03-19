import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import UserModel from './UserModel.model';
import IAddUser from './dto/IAddUserDto.dto';
import IEditUser from './dto/IEditUserDto.dto';
interface IUserAdapterOptions extends IAdapterOptions {
    loadPromoCode: boolean,
    loadEvents: boolean
}

const DefaultUserAdapterOptions: IUserAdapterOptions = {
    loadPromoCode: false,
    loadEvents: false
}

class UserService extends BaseService<UserModel, IUserAdapterOptions>{

    tableName(): string {
        return "user";
    }

    protected async adaptToModel(data: any, options: IUserAdapterOptions): Promise<UserModel> {
        return new Promise(async (resolve) => {

            const user: UserModel = new UserModel();

            user.userId = +data?.user_id;
            user.forename = data?.forename;
            user.surname = data?.surname;
            user.company = data?.company;
            user.primaryAddress = data?.primary_address;
            user.secondaryAddress = data?.secondary_address;
            user.postalCode = +data?.postal_code;
            user.city = data?.city;
            user.country = data?.country;
            user.email = data?.email;
            user.accessToken = data?.access_token;
            user.promoCodeId = +data?.promo_code_id;

            if (options.loadPromoCode) {
                user.promoCode = await this.services.promoCode.getById(user.promoCodeId, {

                })
            }

            if (options.loadEvents) {
                user.events = await this.services.event.getAllByUserId(user.userId, {});
            }

            resolve(user);
        })

    }

    public async add(data: IAddUser): Promise<UserModel> {
        return this.baseAdd(data, DefaultUserAdapterOptions);
    }

    public async editById(userId: number, data: IEditUser): Promise<UserModel> {
        return this.baseEditById(userId, data, DefaultUserAdapterOptions);
    }

    public async deleteById(userId: number): Promise<boolean> {
        return this.baseDelete(userId);
    }
}

export default UserService;
export { DefaultUserAdapterOptions }