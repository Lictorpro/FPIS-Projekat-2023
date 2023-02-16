import EventService, { DefaultEventAdapterOptions } from './EventService.service';
import { Request, Response } from 'express';
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
}

export default EventController;