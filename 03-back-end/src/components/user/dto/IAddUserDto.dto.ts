import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

interface IAddUserDto {
    forename: string,
    surname: string,
    company: string,
    primaryAddress: string,
    secondaryAddress: string,
    postalCode: number,
    city: string,
    country: string,
    email: string,
    accessToken: string,
    promoCodeId: number
}

interface IAddUser extends IServiceData {
    forename: string,
    surname: string,
    company: string,
    primary_address: string,
    secondary_address: string,
    postal_code: number,
    city: string,
    country: string,
    email: string,
    access_token: string,
    promo_code_id: number
}

const AddUserSchema = {
    type: "object",
    properties: {
        forename: {
            type: "string",
            minLength: 2,
            maxLength: 32
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 32
        },
        company: {
            type: "string",
            minLength: 2,
            maxLength: 32
        },
        primaryAddress: {
            type: "string",
            minLength: 4,
            maxLength: 32
        },
        secondaryAddress: {
            type: "string",
            minLength: 4,
            maxLength: 32
        },
        postalCode: {
            type: "number"
        },
        city: {
            type: "string",
            minLength: 2,
            maxLength: 32
        },
        country: {
            type: "string",
            minLength: 2,
            maxLength: 32
        },
        email: {
            type: "string",
            pattern: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
        },
        accessToken: {
            type: "string",
            minLength: 4,
            maxLength: 32
        },
        promoCodeId: {
            type: "number"
        },

    },
    required: [
        "forename",
        "surname",
        "primaryAddress",
        "postalCode",
        "city",
        "country",
        "email"
    ],
    additionalProperties: false
}

const AddUserValidator = ajv.compile(AddUserSchema);

export default IAddUser;
export { AddUserValidator, IAddUserDto };