import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { DefaultPromoCodeAdapterOptions } from './PromoCodeService';
import { AddPromoCodeValidator, IAddPromoCodeDto } from './dto/IAddPromoCodeDto.dto';
import IEditPromoCode, { EditPromoCodeValidator, IEditPromoCodeDto } from './dto/IEditPromoCodeDto.dto';
class PromoCodeController extends BaseController {

    async getAll(req: Request, res: Response) {

        this.services.promoCode.getAll(DefaultPromoCodeAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.promoCode.getById(id, DefaultPromoCodeAdapterOptions)
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
        const data = req.body as IAddPromoCodeDto;

        if (!AddPromoCodeValidator(data)) {
            return res.status(400).send(AddPromoCodeValidator.errors);
        }

        this.services.promoCode.add({
            code: data.code,
            is_used: data.isUsed ? 1 : 0,
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
        const data = req.body as IEditPromoCodeDto;

        if (!EditPromoCodeValidator(data)) {
            return res.status(400).send(EditPromoCodeValidator.errors);
        }

        this.services.promoCode.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.promoCode.editById(id, {
                    code: data.code,
                    is_used: data.isUsed ? 1 : 0
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

        this.services.promoCode.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.promoCode.deleteById(id)
                    .then(result => {
                        res.send('This promo code has been deleted!');
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

export default PromoCodeController;