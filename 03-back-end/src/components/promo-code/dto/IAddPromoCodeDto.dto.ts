import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IAddPromoCodeDto {
    code: string,
    isUsed: boolean
}

interface IAddPromoCode extends IServiceData {
    code: string,
    is_used: number
}

const AddPromoCodeSchema = {
    type: "object",
    properties: {
        code: {
            type: "string",
            minLength: 4,
            maxLength: 32
        },
        isUsed: {
            type: "boolean"
        }
    },
    required: [
        "code"
    ],
    additionalProperties: false
}

const AddPromoCodeValidator = ajv.compile(AddPromoCodeSchema);

export default IAddPromoCode;
export { AddPromoCodeValidator, IAddPromoCodeDto };