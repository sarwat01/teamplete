import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetpdfService {
  basedUrl: string = `${environment.apiUrl}/v1/invoiceProducts/export?populate=color,unit,productId,invoiceId.toUser|fromUser&page=0&limit=30000&sortBy=productId,color,unit&status=pending`;
  baseUrl: string = `${environment.apiUrl}/v1/city/export?fromPrice=1&toPrice=5000&name=sulaimanyah`;

 
 
  constructor(private httpService: HttpClient) {
  }

  getPdf(fileName: string, fileType: string) {
    return this.httpService.get<any>(`${this.baseUrl}/get/pdf/${fileName}`, { responseType: 'arraybuffer' as 'json' });
  }

  getExcel(fileName: string, fileType: string) {
    return this.httpService.get<any>(`${this.baseUrl}/get/excel/${fileName}`, { responseType: 'arraybuffer' as 'json' });
  }
}