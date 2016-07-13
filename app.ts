// your code goes here

import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";

class Review {
    artistName: string;
    albumName: string;
    albumScore: number;
    albumArt: string;

    constructor(artistName: string, albumName: string, albumScore: number, albumArt:string){
        this.artistName = artistName;
        this.albumName = albumName;
        this.albumScore = albumScore || 0;
        this.albumArt = albumArt;
    }

    scoreUp(){
        let num:any = this.albumScore;
        num += 0.1;
        num = parseFloat(num.toFixed(2));
        if(num < 10){
            this.albumScore = num;
        } else if(num === 10){
            this.albumScore = 10;
        }
    }

    scoreDown(){
        let num:any = this.albumScore;
        num -= 0.1;
        num = parseFloat(num.toFixed(2));
        if(num > 0){
            this.albumScore = num;
        } else if(num === 0){
            this.albumScore = 0;
        }
    }

}

@Component({
    selector: 'review',
    host: {
        class: 'review'
    },
    inputs: ['review'],
    template:`
      <figure>
        <img src="{{ review.albumArt }}" />
      </figure>
      <div class="review__information">
        <h2>{{ review.artistName }}</h2>
        <h3>{{ review.albumName }}</h3>
        <div class="review__score">
          <p>{{ review.albumScore }}</p>
          <div class="review__change">
            <a href (click)="scoreUp()">+</a>
            <a href (click)="scoreDown()">-</a>
          </div>
        </div>
      </div>
    `
})
class ReviewComponent{

    review: Review;

    scoreUp():boolean{
        this.review.scoreUp();
        return false;
    }

    scoreDown():boolean{
        this.review.scoreDown();
        return false;
    }
}

@Component({
    selector: 'review-app',
    directives: [ReviewComponent],
    template:`
    <main class="app__wrapper">
      <article class="app__inner">
        <review *ngFor="let review of reviewsSorted()"
                [review]="review"></review>
        <form>
            <div>
                <label for="artistName">Artist:</label>
                <input name="artistName" #artistName/>
            </div>
            <div>
                <label for="albumName">Album:</label>
                <input name="albumName" #albumName/>
            </div>
            <div>
                <label for="albumScore">Score:</label>
                <input name="albumScore" type="number" #albumScore/>
            </div>
            <div>
                <label for="albumArt">Image:</label>
                <input name="albumArt" #albumArt/>
            </div>
            <button (click)="addReview(artistName, albumName, albumScore, albumArt)">Submit Review
            </button>
        </form>
      </article>
    </main>

    `
})
class ReviewApp{
    reviews: Review[];

    constructor(){
        this.reviews = [
            new Review("Chance the Rapper", "Coloring Book", 9.2, "http://static1.squarespace.com/static/5105d89ee4b0869f6416d903/t/5734fa9fc2ea51b32cf55a6e/1463089833112/"),
        ]
    }

    addReview(artistName:HTMLInputElement, albumName:HTMLInputElement, albumScore:HTMLInputElement, albumArt:HTMLInputElement){
        this.reviews.push(new Review(artistName.value, albumName.value, parseFloat(albumScore.value), albumArt.value));
        artistName.value = '';
        albumName.value = '';
        albumScore.value = '';
        albumArt.value = '';
    }

    reviewsSorted():Review[]{        
        return this.reviews.sort((a:Review, b:Review) => b.albumScore - a.albumScore);
    }

}

bootstrap(ReviewApp);
