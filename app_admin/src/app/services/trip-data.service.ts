import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Trip } from "../models/trip";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";

@Injectable()
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]> {
    console.log("Inside TripDataService#getTrips");
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`)
      .toPromise()
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log("Inside TripDataService#getdTrip");
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .toPromise()
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#addTrip");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
    return this.http
      .post<Trip>(this.tripUrl, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#updateTrip");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Error occurred:", error);
    return Promise.reject("Something went wrong. Please try again later.");
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .toPromise()
      .catch(this.handleError);
  }
}
