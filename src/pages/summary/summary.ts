import { ReportyPage } from './../report/report';
import { AlertController, NavController } from 'ionic-angular';
import { DatabaseService } from './../../shared/service/database.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'page-summary',
    templateUrl: 'summary.html'
})
export class SummaryPage implements OnInit {
    data: any[] = [];
    surplusAmount: number = 0;
    constructor(
        private databaseService: DatabaseService,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) { }

    async ngOnInit() {


        // this.data = [{
        //     id: 1,
        //     type: '收入',
        //     category: '工资',
        //     date: '2017/09/17',
        //     amount: 1000,
        //     remark: '工资'
        // },
        // {
        //     id: 2,
        //     type: '支出',
        //     category: '交通',
        //     date: '2017/09/17',
        //     amount: 100,
        //     remark: '邮费邮费'
        // }]
        // console.log(this.data);
        this.data = await this.databaseService.getAllData();
        this.surplusAmount = this.getSurplusAmount();
    }

    getSurplusAmount() {
        let income: number = 0;
        let pay: number = 0;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].type === 'pay') {
                pay += this.data[i].amount;
            } else {
                income += this.data[i].amount;
            }
        }
        return income - pay;
    }

    report() {
        this.navCtrl.push(ReportyPage);
    }

    async deleteRecord(id: number) {
        let res = await this.databaseService.deleteRecord(id);
        if (res.rowsAffected >= 1) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id === id) {
                    this.data.splice(i, 1);
                    break;
                }
            }
            this.showPrompt('OK', '删除成功！')
        }
    }

    showPrompt(title: string, message: string) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        prompt.present();
    }
}