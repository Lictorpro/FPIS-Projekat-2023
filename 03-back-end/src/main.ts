import * as express from "express";
import * as cors from "cors";
import { DevConfig } from "./configs";
import IConfig from "./common/IConfig.interface";
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from 'mysql2/promise';
import EventService from './components/event/EventService.service';
import PromoCodeService from './components/promo-code/PromoCodeService';
import UserService from './components/user/UserService.service';

async function main() {
    const config: IConfig = DevConfig;

    const db = await mysql2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone
    });

    const resources: IApplicationResources = {
        databaseConnection: db,
        services: {
            event: null,
            promoCode: null,
            user: null
        }
    };

    resources.services.event = new EventService(resources);
    resources.services.promoCode = new PromoCodeService(resources);
    resources.services.user = new UserService(resources);

    const application: express.Application = express();

    application.use(cors());
    application.use(express.json());


    for (const router of config.routers) {
        router.setupRoutes(application, resources);
    }

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.listen(config.server.port);
}

process.on("uncaughtException", error => {
    console.log("Error:", error);
})

main();
