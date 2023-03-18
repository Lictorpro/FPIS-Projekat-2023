import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import PromoCodeController from './PromoCodeController.controller';

class PromoCodeRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const promoCodeController: PromoCodeController = new PromoCodeController(resources.services);

        application.get("/api/promoCode", promoCodeController.getAll.bind(promoCodeController));
        application.get("/api/promoCode/:id", promoCodeController.getById.bind(promoCodeController));
        application.post("/api/promoCode", promoCodeController.add.bind(promoCodeController));
        application.put("/api/promoCode/:id", promoCodeController.edit.bind(promoCodeController));
        application.delete("/api/promoCode/:id", promoCodeController.delete.bind(promoCodeController));
    }
}

export default PromoCodeRouter;