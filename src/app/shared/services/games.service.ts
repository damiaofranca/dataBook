import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private angularFirestore: AngularFirestore) { }

  getGames(game: string) {
    return this.http.get(environment.api + "/games",
    {
      params:{
        key: environment.apiKey,
        search: game,
      }
    }
    );
  }

  getDescription(id: string) {
    return this.http.get(environment.api + "/games/" + id,
    {
      params:{
        key: environment.apiKey,
      }
    }
    );
  }

  saveFavorite(isFavorite: { isFavorite: boolean }, key: string) {
    return this.db.object(`favorites/${key}`).set(isFavorite);
  }

  removeFavorite(key: string) {
    return this.db.object(`favorites/${key}`).remove();
  }
  
  verifyFavorite(key: string) {
    return this.db.object('favorites/' + key).valueChanges()
  }


  getFavorites() {
      this.db.list('favorites').valueChanges().toPromise().then((data) => {
       console.log(data);
     })
  }
}
