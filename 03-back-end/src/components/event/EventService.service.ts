import EventModel from "./EventModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddEvent from './dto/IAddEventDto.dto';
import IEditEvent from './dto/IEditEventDto.dto';
import { IUserEvent } from '../user/UserModel.model';

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

    public async deleteById(eventId: number): Promise<boolean> {
        return this.baseDelete(eventId);
    }

    public async getAllByUserId(userId: number, options: IEventAdapterOptions): Promise<IUserEvent[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<{
                event_user_id: number,
                event_id: number,
                user_id: number,
                created_at: Date,
                discount: number
            }>("event_user", "user_id", userId)
                .then(async result => {
                    if (result.length === 0) {
                        return resolve([]);
                    }

                    const users: IUserEvent[] = await Promise.all(result.map(async row => {
                        return {
                            event: {
                                eventId: row.event_id,
                                name: await (await this.getById(row.event_id, {})).name,
                                price: await (await this.getById(row.event_id, {})).price,
                                numberOfSeats: await (await this.getById(row.event_id, {})).numberOfSeats,
                                eventDate: await (await this.getById(row.event_id, {})).eventDate,
                                discountDueDate: await (await this.getById(row.event_id, {})).discountDueDate,
                            },
                            createdAt: row.created_at,
                            discount: row.discount
                        }
                    }));

                    resolve(users);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    public async getAllByEventId(eventId: number, options: IEventAdapterOptions): Promise<IUserEvent[]> {
        return new Promise((resolve, reject) => {
            this.getAllFromTableByFieldNameAndValue<{
                event_user_id: number,
                event_id: number,
                user_id: number,
                created_at: Date,
                discount: number
            }>("event_user", "event_id", eventId)
                .then(async result => {
                    if (result.length === 0) {
                        return resolve([]);
                    }

                    const users: IUserEvent[] = await Promise.all(result.map(async row => {
                        return {
                            event: {
                                eventId: row.event_id,
                                name: await (await this.getById(row.event_id, {})).name,
                                price: await (await this.getById(row.event_id, {})).price,
                                numberOfSeats: await (await this.getById(row.event_id, {})).numberOfSeats,
                                eventDate: await (await this.getById(row.event_id, {})).eventDate,
                                discountDueDate: await (await this.getById(row.event_id, {})).discountDueDate,
                            },
                            createdAt: row.created_at,
                            discount: row.discount
                        }
                    }));

                    resolve(users);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export default EventService;
export { DefaultEventAdapterOptions }