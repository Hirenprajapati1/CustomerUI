import { DatePipe } from '@angular/common';

export class InvoiceData{

    //invoiceid:number;
    invoiceNo:string;
    customerNo:string;
    invoiceDate:Date;
    invoiceDate2:Date;
    invoiceDate1:string;
    invoiceAmount:any;
     paymentDueDate:Date;
     CreatedBy:string;
     modifyBy:string;
   
}

// {"invoiceid":2,
// "invoiceNo":"I00002",
// "customerNo":"C00001",
// "customerName":"Kamal Enterprise",
// "invoiceDate":"2019-01-19T00:00:00",
// "invoiceAmount":9200,
// "paymentDueDate":"2019-02-18T00:00:00"},