import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  public HOST: String = 'http://localhost:9093/';

  constructor(private httpClient: HttpClient) {
  }

  public getVilles() {
    return this.httpClient.get(this.HOST + 'villes');
  }

  public getCinemas(v: any) {
    let url = v._links.cinemas.href.replace('{?projection}', '');
    return this.httpClient.get(url);
  }

  public getSalles(c: any) {
    return this.httpClient.get(c._links.salles.href);
  }

  public getProjections(salle: any) {
    let url = salle._links.projections.href.replace('{?projection}', '');
    return this.httpClient.get(url + '?projection=projectionsProj');
  }

  public getTicketsPlaces(p: any) {
    let url = p._links.tickets.href.replace('{?projection}', '');
    return this.httpClient.get(url + '?projection=ticketsProj');
  }

  public payerTickets(dataForm) {
    return this.httpClient.post(this.HOST + 'payerTickets', dataForm);
  }
}
