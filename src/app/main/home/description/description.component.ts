import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  descriptionGame: any;
  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) { }
  isFavoriteGame: { isFavorite: boolean; data: any } = {
    isFavorite: false,
    data: null,
  };

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.gameService
        .getDescription(params.id)
        .toPromise()
        .then((data: any) => {
          this.descriptionGame = data;
          console.log(this.descriptionGame);
          this.isFavoriteGame.data = {
            id: data.id,
            name: data.name,
            description: data.description,
            image: data.background_image,
            released: data.released,
          };
        });

      this.gameService.verifyFavorite(params.id).subscribe((data: any) => {
        this.isFavoriteGame.isFavorite = data.isFavorite;
        console.log(data);
      });
    });
  }

  onFormatDescriptionBigger(description: string) {
    if (description.length > 1281) {
      return description.substring(0, 1276) + '...';
    } else {
      return description;
    }
  }

  favoriteGame() {
    if (this.isFavoriteGame.isFavorite === false) {
      this.isFavoriteGame.isFavorite = true;
      this.gameService
        .saveFavorite(this.isFavoriteGame, this.descriptionGame.id)
        .then((data: any) => { });
    } else {
      this.isFavoriteGame.isFavorite = false;
      this.gameService
        .removeFavorite(this.descriptionGame.id)
        .then((data: any) => { });
    }
  }

  get verifyIfIsFavorite() {
    return this.isFavoriteGame.isFavorite === true
      ? '../../../../assets/icons/star-outline-on.svg'
      : '../../../../assets/icons/star-outline.svg';
  }
}
