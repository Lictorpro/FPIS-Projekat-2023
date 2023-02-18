import EventService, { DefaultEventAdapterOptions } from './EventService.service';
import { Request, Response } from 'express';
import { AddEventValidator, IAddEventDto } from './dto/IAddEventDto.dto';
import { EditEventValidator, IEditEventDto } from './dto/IEditEventDto.dto';
class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    async getAll(req: Request, res: Response) {

        this.eventService.getAll(DefaultEventAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.eventService.getById(id, DefaultEventAdapterOptions)
            .then(result => {

                if (result === null) {
                    return res.sendStatus(404);
                }

                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddEventDto;

        if (!AddEventValidator(data)) {
            return res.status(400).send(AddEventValidator.errors);
        }

        this.eventService.add({
            name: data.name,
            price: data.price,
            number_of_seats: data.numberOfSeats,
            event_date: data.eventDate,
            discount_due_date: data.discountDueDate
        })
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });

    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;
        const data = req.body as IEditEventDto;

        if (!EditEventValidator(data)) {
            return res.status(400).send(EditEventValidator.errors);
        }

        this.eventService.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.eventService.editById(id, {
                    name: data.name,
                    price: data.price,
                    number_of_seats: data.numberOfSeats,
                    event_date: data.eventDate,
                    discount_due_date: data.discountDueDate
                })
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    })


            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }
}

export default EventController;