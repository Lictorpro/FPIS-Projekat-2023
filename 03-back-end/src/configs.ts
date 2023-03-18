import IConfig from "./common/IConfig.interface";
import EventRouter from './components/event/EventRouter.router';
import PromoCodeRouter from './components/promo-code/PromoCodeRouter.router';
import UserRouter from './components/user/UserRouter.router';

const DevConfig: IConfig = {
    server: {
        port: 10000,
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "fpis2022",
        charset: "utf8",
        timezone: "+01:00"
    },
    routers: [
        new EventRouter(),
        new PromoCodeRouter(),
        new UserRouter(),

    ]
}

export { DevConfig }