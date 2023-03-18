import * as mysql2 from 'mysql2/promise';
import EventService from '../components/event/EventService.service';
import PromoCodeService from '../components/promo-code/PromoCodeService';

export interface IServices {
    event: EventService,
    promoCode: PromoCodeService
}

interface IApplicationResources {
    databaseConnection: mysql2.Connection,
    services: IServices
}

export default IApplicationResources;