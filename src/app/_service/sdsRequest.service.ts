import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdsRequestService {


  //baseUrl = environment.apiUrl;
  baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(private http: HttpClient) { }

// calgary user top health authority to display in text box
calgaryTopHealthAuthority(userOutSideId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/UserTopLocToDisplay/' + userOutSideId);
}

calgaryLevel1Location(locationId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/CalgaryLevel1/' + locationId);
}

calgaryLevel2Location(locationId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/CalgaryLevel2/' + locationId);
}

calgaryLevel3Location(locationId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/CalgaryLevel3/' + locationId);
}

calgaryLevel4Location(locationId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/CalgaryLevel4/' + locationId);
}

calgaryLevel5Location(locationId: any) {
  return this.http.get(this.baseUrl + 'SDSRequest/CalgaryLevel5/' + locationId);
}
}
