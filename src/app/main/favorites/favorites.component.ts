import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  @ViewChild('searchGamesFavoritesInput', { static: true })
  searchGamesInput: ElementRef | any;
  gamesFavorites: any;
  gamesData: any;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.db.list('favorites').valueChanges().subscribe((data) => {
      console.log(data)
      this.gamesFavorites = data;
      this.gamesData = data;
    })

    fromEvent(this.searchGamesInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.gamesFavorites = this.gamesData.filter((item: any) => {
          if (this.removeAccents((item.data.name || '')).toLowerCase().indexOf(this.removeAccents((text || '')).toLowerCase()) > -1) {
            return item;
          }
        });
      });
  }

  removeAccents(str: any) {
    if ('function' === typeof str.normalize) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else {
      const accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
      const accentsOut = 'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
      const value = str.split('');
      value.forEach((letter: any, index: any) => {
        const i = accents.indexOf(letter);
        if (i !== -1) {
          value[index] = accentsOut[i];
        }
      });
      return value.join('');
    }
  }


  onFormatNameBigger(name: string) {
    if (name.length > 20) {
      return name.substring(0, 15) + "...";
    } else {
      return name;
    }
  }

  onFormatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.getDate() + "/" + (dateFormat.getMonth() + 1) + "/" + dateFormat.getFullYear();
  }

  goToDescriptionGame(id: number) {
    this.router.navigate(['/description/' + id], { relativeTo: this.route });
  }


}


