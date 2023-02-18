import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IEditEventDto {
    name: string;
    price: number;
    numberOfSeats: number;
    eventDate: Date;
    discountDueDate: Date;
}

interface IEditEvent extends IServiceData {
    name: string,
    price: number,
    number_of_seats: number;
    event_date: Date;
    discount_due_date: Date;
}

const EditEventSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 32
        },
        price: {
            type: "number"
        },
        numberOfSeats: {
            type: "number"
        },
        eventDate: {
        },
        discountDueDate: {
        }
    },
    required: [
        "name",
        "price",
        "numberOfSeats",
        "eventDate",
        "discountDueDate"
    ],
    additionalProperties: false
}

const EditEventValidator = ajv.compile(EditEventSchema);

export default IEditEvent;
export { EditEventValidator, IEditEventDto };