import EventModel from "./EventModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddEvent from './dto/IAddEventDto.dto';
import IEditEvent from './dto/IEditEventDto.dto';

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

    public async add(data: IAddEvent): Promise<EventModel> {
        return this.baseAdd(data, DefaultEventAdapterOptions);
    }

    public async editById(eventId: number, data: IEditEvent): Promise<EventModel> {
        return this.baseEditById(eventId, data, DefaultEventAdapterOptions);
    }
}

export default EventService;
export { DefaultEventAdapterOptions }