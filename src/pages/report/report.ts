import { DatabaseService } from './../../shared/service/database.service';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})
export class ReportyPage implements OnInit {
    constructor(
        private databaseService: DatabaseService
    ) { }

    reportData: any[] = [];

    async ngOnInit() {
        this.reportData = [];
        let data = await this.databaseService.getAllPayment();
        if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
                console.log(data.rows.item(i));
                this.reportData.push(data.rows.item(i));
            }
        }

        let myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: '支出明细',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.getLegend()
            },
            series: [
                {
                    name: '支出类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.getData(),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }

    getLegend() {
        let temp: string[] = [];
        this.reportData.forEach((value, index) => {
            temp.push(value.CATEGORY);
        });
        return temp;
    }

    getData() {
        let temp: { value: string, name: string }[] = [];
        this.reportData.forEach((value, index) => {
            temp.push({
                value: value.AMOUNT,
                name: value.CATEGORY
            });
        });
        return temp;
    }
}