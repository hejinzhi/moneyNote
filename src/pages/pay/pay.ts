import { DatabaseService } from './../../shared/service/database.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage implements OnInit {

  type: string;
  date: string;
  category: string;
  title: string;
  amount: number;
  remark: string;
  private fb: FormBuilder = new FormBuilder();
  formModel: FormGroup;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private datebaseService: DatabaseService,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.date = this.getToday();
    this.type = this.navParams.get('type');
    if (this.type === "income") {
      this.title = '收入';
      this.category = "工资";
    } else if (this.type === 'pay') {
      this.title = "支出";
      this.category = "食物";
    }

    this.formModel = this.fb.group({
      date: [this.getToday(), Validators.required],
      type: [this.type, Validators.required],
      category: [this.category, Validators.required],
      amount: ['', Validators.required],
      remark: ['']
    });
  }

  getToday() {
    let newDate = new Date();
    let month = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1);
    let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    return newDate.getFullYear() + '-' + month + '-' + day;
  }

  async save() {
    await this.datebaseService.insertData(this.type, this.category, this.date, this.amount, this.remark);
    // let data = await this.datebaseService.getAllData();
    // console.log(data);
    this.showPrompt('确定', '保存成功！');

  }



  showPrompt(title: string, message: string) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    prompt.present();
  }



}
