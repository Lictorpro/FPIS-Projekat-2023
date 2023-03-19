import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { DefaultUserAdapterOptions } from './UserService.service';
import { AddUserValidator, IAddUserDto } from './dto/IAddUserDto.dto';
import { EditUserValidator, IEditUserDto } from './dto/IEditUserDto.dto';
class UserController extends BaseController {

    async getAll(req: Request, res: Response) {

        this.services.user.getAll({ loadEvents: true, loadPromoCode: true })
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.user.getById(id, { loadEvents: true, loadPromoCode: true })
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
        const data = req.body as IAddUserDto;

        if (!AddUserValidator(data)) {
            return res.status(400).send(AddUserValidator.errors);
        }

        this.services.user.add({
            forename: data.forename,
            surname: data.surname,
            company: data.company,
            primary_address: data.primaryAddress,
            secondary_address: data.secondaryAddress,
            postal_code: data.postalCode,
            city: data.city,
            country: data.country,
            email: data.email,
            access_token: data.accessToken,
            promo_code_id: data.promoCodeId
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
        const data = req.body as IEditUserDto;

        if (!EditUserValidator(data)) {
            return res.status(400).send(EditUserValidator.errors);
        }

        this.services.user.getById(id, {
            loadEvents: false,
            loadPromoCode: false
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.user.editById(id, {
                    forename: data.forename,
                    surname: data.surname,
                    company: data.company,
                    primary_address: data.primaryAddress,
                    secondary_address: data.secondaryAddress,
                    postal_code: data.postalCode,
                    city: data.city,
                    country: data.country,
                    email: data.email,
                    access_token: data.accessToken,
                    promo_code_id: data.promoCodeId
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

    async delete(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.user.getById(id, {
            loadEvents: false,
            loadPromoCode: false
        })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.user.deleteById(id)
                    .then(result => {
                        res.send('This user has been deleted!');
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

export default UserController;