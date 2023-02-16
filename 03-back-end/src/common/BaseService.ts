import IModel from './IModel.interface';
import * as mysql2 from "mysql2/promise";
import IAdapterOptions from './IAdapterOptions.interface';

abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions>{
    private _db: mysql2.Connection;

    constructor(db: mysql2.Connection) {
        this._db = db;
    }

    protected get db(): mysql2.Connection {
        return this._db;
    }

    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: IAdapterOptions): Promise<ReturnModel>;

    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        return new Promise<ReturnModel[]>((resolve, reject) => {
            const tableName = this.tableName();

            const sql: string = `SELECT * FROM \`${tableName}\`;`;
            this.db.execute(sql)
                .then(async ([rows]) => {

                    if (rows === undefined) {
                        return resolve([]);
                    }
                    const items: ReturnModel[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));
                    }
                    resolve(items);
                }).catch(error => {
                    console.log(reject(error));
                });
        })
    }

    public getById(id: number, options: AdapterOptions): Promise<ReturnModel | null> {
        const tableName = this.tableName();

        return new Promise<ReturnModel>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id = ?;`;
                this.db.execute(sql, [id])
                    .then(async ([rows]) => {

                        if (rows === undefined) {
                            return resolve(null);
                        }

                        if (Array.isArray(rows) && rows.length === 0) {
                            return resolve(null);
                        }

                        resolve(await this.adaptToModel(rows[0], options));
                    }).catch(error => {
                        console.log(reject(error));
                    });
            })
    }

    public async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]> {

        const tableName = this.tableName();

        return new Promise<ReturnModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${fieldName} = ?;`;
                this.db.execute(sql, [value])
                    .then(async ([rows]) => {

                        if (rows === undefined) {
                            return resolve([]);
                        }

                        const items: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]) {
                            items.push(await this.adaptToModel(row, options))
                        }

                        resolve(items);
                    }).catch(error => {
                        console.log(reject(error));
                    });
            }
        )
    }
}

export default BaseService;