import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  //baseUrl = environment.apiUrl;
  baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(
  private http: HttpClient,
) {}

contactUsForm(model: any) {
  return this.http.post(this.baseUrl + 'contactus/ContactUs/', model);
}
}
