import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import UserModel from './UserModel.model';
import IAddUser from './dto/IAddUserDto.dto';
import IEditUser from './dto/IEditUserDto.dto';
interface IUserAdapterOptions extends IAdapterOptions {

}

const DefaultUserAdapterOptions: IUserAdapterOptions = {

}

class UserService extends BaseService<UserModel, IUserAdapterOptions>{

    tableName(): string {
        return "user";
    }

    protected async adaptToModel(data: any): Promise<UserModel> {
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

        return user;
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