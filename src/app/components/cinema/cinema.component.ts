import {Component, OnInit} from '@angular/core';
import {CinemaService} from '../../services/cinema.service';
import {TicketFormModel} from '../../models/TicketForm.model';
import {AuthService} from "../../services/auth.service";
import {UtilService} from "../../services/util.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
})
export class CinemaComponent implements OnInit {
  constructor(public cinemaService: CinemaService,
              private authService: AuthService,
              private utilService:UtilService,
              private modalService: NgbModal) {
  }

  public villes;
  public cinemas;
  public salles;
  public currentVille;
  public currentCinema;
  public currentProjection;
  public selectedTicked;
  public isTiketOpen=false;
  public isLoading=false;
  public nomClient:string;
  public closeResult: string;

  ngOnInit(): void {
    this.chargerVilles();
    if (this.authService.username){
      this.nomClient = this.authService.username;
    }
  }

  chargerVilles() {
    this.cinemaService.getVilles().subscribe(
      (data) => {
        this.villes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onGetCinema(v) {
    this.salles = undefined;
    this.currentVille = v;
    this.cinemaService.getCinemas(v).subscribe(
      (data) => {
        this.cinemas = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onGetSalles(c) {
    this.isLoading=true;
    this.salles = undefined;
    this.currentCinema = c;
    this.cinemaService.getSalles(c).subscribe(
      (data) => {
        this.salles = data;
        this.salles._embedded.salles.forEach((salle) => {
          this.cinemaService.getProjections(salle).subscribe(
            (data) => {
              salle.projections = data;
            },
            (err) => {
              console.log(err);
            }
          );
        });
        this.isLoading=false
      },
      (err) => {
        console.log(err);
      }
    );

  }

  onGetTicketsPlaces(p) {
    if (this.currentProjection==p)this.isTiketOpen = !this.isTiketOpen

    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p).subscribe(
      (data) => {
        this.currentProjection.tickets = data;
        this.selectedTicked = [];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectTickets(t) {
    if (!t.selected) {
      t.selected = true;
      this.selectedTicked.push(t);
    } else {
      t.selected = false;
      this.selectedTicked.splice(this.selectedTicked.indexOf(t), 1);
    }
  }

  getTicketState(t) {
    let str = 'btn ';
    if (t.estReserver) {
      str += 'btn-info';
    } else if (t.selected) {
      str += 'btn-success';
    } else {
      str += 'btn-warning';
    }
    return str;
  }

  onPayTickets(dataForm: TicketFormModel) {
    if (this.authService.isLogged) {
      let tickets = [];
      this.selectedTicked.forEach((ticket) => {
        tickets.push(ticket.id);
      });
      dataForm.tickets = tickets;
      this.cinemaService.payerTickets(dataForm).subscribe(
        (data) => {
          this.showSuccess("votre paiement est bien effectué")
          this.onGetTicketsPlaces(this.currentProjection);
        },
        (err) => {
          this.showError("veuillez réessayer à nouveau");
        }
      );
    } else {
      this.showInfo("Veuillez s'authentifier tout d'abord...");
    }
  }

  showSuccess(msg:string){
    this.utilService.showSuccess(msg,"Félicitation !")
  }
  showError(err:string){
    this.utilService.showError(err,"Erreur!")
  }
  showInfo(info:string){
    this.utilService.showInfo(info,"Info!")
  }

}
