import { Injectable, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  public HOST: String = 'http://localhost:9093/';

  constructor(private httpClient: HttpClient) {}

  public getVilles() {
    return this.httpClient.get(this.HOST + '/villes');
  }

  public getCinemas(v: any) {
    return this.httpClient.get(v._links.cinemas.href);
  }

  public getSalles(c: any) {
    return this.httpClient.get(c._links.salles.href);
  }

  public getProjections(salle: any) {
    let url = salle._links.projections.href.replace('{?projection}', '');
    return this.httpClient.get(url + '?projection=p1');
  }

  public getTicketsPlaces(p: any) {
    let url = p._links.tickets.href.replace('{?projection}', '');
    return this.httpClient.get(url + '?projection=ticketsproj');
  }
  public payerTickets(dataForm) {
    return this.httpClient.post(this.HOST + 'payerTickets', dataForm);
  }
}
