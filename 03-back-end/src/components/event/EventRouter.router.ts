import EventService from './EventService.service';
import EventController from './EventController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class EventRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const eventController: EventController = new EventController(resources.services);

        application.get("/api/event", eventController.getAll.bind(eventController));
        application.get("/api/event/:id", eventController.getById.bind(eventController));
        application.post("/api/event", eventController.add.bind(eventController));
        application.put("/api/event/:id", eventController.edit.bind(eventController));
        application.delete("/api/event/:id", eventController.delete.bind(eventController));
    }
}

export default EventRouter;