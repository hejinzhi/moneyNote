import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseService {
    database: SQLiteObject;
    constructor(private sqlite: SQLite, private platform: Platform) {
    }

    init() {
        this.platform.ready().then(async () => {

            if (this.platform.is('cordova')) {
                this.database = await this.sqlite.create({
                    name: 'money.db',
                    location: 'default'
                });
                if (localStorage.getItem('moneyTableAlreadyCreated') === 'true') { }
                else {
                    await this.createMoneyTable();
                    localStorage.setItem('moneyTableAlreadyCreated', 'true');
                }
            }

        });
    }

    createMoneyTable() {
        return this.database.executeSql(`CREATE TABLE IF NOT EXISTS MY_MONEY
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,TYPE VARCHAR2(10),CATEGORY VARCHAR2(20),DATE VARCHAR2(30),AMOUNT NUMBER,REMARK VARCHAR2(150));`, {});
    }

    insertData(type: string, category: string, date: string, amount: number, remark: string) {
        let data = [type, category, date, amount, remark];
        return this.database.executeSql(`INSERT INTO MY_MONEY(TYPE,CATEGORY,DATE,AMOUNT,REMARK) VALUES(?,?,?,?,?)`, data);
    }


    getAllData() {
        return this.database.executeSql(`select * from my_money order by date desc;`, {}).then((data) => {
            let msgs = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    msgs.push({
                        id: data.rows.item(i).ID,
                        type: data.rows.item(i).TYPE,
                        category: data.rows.item(i).CATEGORY,
                        date: data.rows.item(i).DATE,
                        amount: data.rows.item(i).AMOUNT,
                        remark: data.rows.item(i).REMARK
                    });
                }
            }
            return msgs;
        }, (err: any) => {
            console.log(err);
            return [];
        });
    }

    deleteRecord(id: number) {
        return this.database.executeSql(`DELETE FROM MY_MONEY WHERE ID=${id}`, {});
    }

    getAllPayment() {
        return this.database.executeSql(`SELECT CATEGORY,SUM(AMOUNT) AMOUNT FROM MY_MONEY WHERE TYPE='pay' GROUP BY CATEGORY;`, {});
    }



}