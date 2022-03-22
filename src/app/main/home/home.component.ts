import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchGamesInput', { static: true })
  searchGamesInput: ElementRef | any;
  games: any;
  constructor(
    private gameService: GamesService,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getGamesInit();
    fromEvent(this.searchGamesInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.gameService.getGames(text).toPromise().then((data : any) => {
          this.games = data.results;
          console.log(this.games);
        })
      });
  }


  getGamesInit(){
    this.gameService.getGames('').toPromise().then((data : any) => {
      this.games = data.results;
      console.log(this.games);
    })
  }


   onFormatNameBigger(name : string) {
    if (name.length > 20) {
      return name.substring(0, 15) + "...";
    } else {
      return name;
    }
  }

  onFormatDate(date : string) {
    let dateFormat = new Date(date);
    return dateFormat.getDate() + "/" + (dateFormat.getMonth() + 1) + "/" + dateFormat.getFullYear();
  }

  goToDescriptionGame(id : number){
    this.router.navigate(['/description/' + id],{ relativeTo: this.route });
  }
}
