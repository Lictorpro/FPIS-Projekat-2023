import IModel from '../../common/IModel.interface';

class EventModel implements IModel {
    eventId: number;
    name: string;
    price: number;
    numberOfSeats: number;
    eventDate: Date;
    discountDueDate: Date;
}

export default EventModel;