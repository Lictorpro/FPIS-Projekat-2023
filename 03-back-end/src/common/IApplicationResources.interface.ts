import * as mysql2 from 'mysql2/promise';
import EventService from '../components/event/EventService.service';

export interface IServices {
    event: EventService
}

interface IApplicationResources {
    databaseConnection: mysql2.Connection,
    services: IServices
}

export default IApplicationResources;