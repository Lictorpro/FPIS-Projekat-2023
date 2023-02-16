import EventModel from "./EventModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';

interface IEventAdapterOptions extends IAdapterOptions {

}

const DefaultEventAdapterOptions: IEventAdapterOptions = {

}

class EventService extends BaseService<EventModel, IEventAdapterOptions>{

    tableName(): string {
        return "event";
    }

    protected async adaptToModel(data: any): Promise<EventModel> {
        const event: EventModel = new EventModel();

        event.eventId = +data?.event_id;
        event.name = data?.name;
        event.price = +data?.price;
        event.numberOfSeats = +data?.number_of_seats;
        event.eventDate = data?.event_date;
        event.discountDueDate = data?.discount_due_date;

        return event;
    }
}

export default EventService;
export { DefaultEventAdapterOptions }