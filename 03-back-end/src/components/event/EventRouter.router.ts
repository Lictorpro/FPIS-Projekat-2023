import EventService from './EventService.service';
import EventController from './EventController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class EventRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const eventService: EventService = new EventService(resources.databaseConnection);
        const eventController: EventController = new EventController(eventService);

        application.get("/api/event", eventController.getAll.bind(eventController));
        application.get("/api/event/:id", eventController.getById.bind(eventController));
    }
}

export default EventRouter;