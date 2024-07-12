import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {

  }

  async generateExcel(itme:any,total:number,bulkNumber:number,titlle:string) {
      // Excel Title, Header, Data
    const title = `TotalPrice :${total *1000} `;
    const header = ['code', 'color', 'size', 'price', 'QTY', 'total','status','invoiceNumber' ,'first_track_number', 'secound_track_number', 'createdAt', 'updateAt'];
    const data = itme;
    

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');


// Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Calibri (Body)', family: 4, size: 20, bold: true };
    worksheet.addRow([]);
   
    /*  const subTitleRow = worksheet.addRow([`Date :${Date.now()}`]);
 */
    worksheet.mergeCells('A1:D2');


// Blank Row
    worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
    cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00FFFF' },
    bgColor: { argb: 'FF0000FF' }
    
  };
  headerRow.font={ name: 'Calibri (Body)', family: 4, size: 14, bold: true };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});

// Add Data and Conditional Formatting
    data.forEach(d => {
  const row = worksheet.addRow(d);
  row.font={ name: 'Calibri (Body)', family: 2, size: 13 };
  const qty = row.getCell(8);
  let color = 'FF99FF99';
  /* if (+qty.value < 5) {
    color = 'FF9999';
  } */

  qty.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color }
    
  };
  qty.font={underline:true,size: 13}  
}

);
    worksheet.getColumn(6).width = 18;
    worksheet.getColumn(7).width = 18;
    worksheet.getColumn(8).width = 18;
    worksheet.getColumn(9).width = 30;
    worksheet.getColumn(10).width = 30;
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(12).width = 30;
    worksheet.addRow([]);


// Footer Row
    const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 fs.saveAs(blob, `${titlle}-${bulkNumber}.xlsx`); 
});

  }
}   