import { ActivatedRoute } from '@angular/router';
import { iMedia } from './../../module/i-media';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private route: ActivatedRoute) {}

  deck: iMedia[] = [];
  myDeck: iMedia[] = [];
  param: string = '';
  open: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((param) => {
      const name = param['name'];
      fetch('/assets/media.json')
        .then((res) => {
          if (res.ok) {
            return <Promise<iMedia[]>>res.json();
          } else {
            throw new Error('non ha un 200');
          }
        })
        .then((res) => {
          this.deck = res.filter((img) =>
            img.type === 'image' ? true : false
          );
          const shuffle = (array: iMedia[]) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };

          this.myDeck = shuffle(this.deck);

          this.myDeck = this.myDeck.splice(0, 3);
          console.log(this.myDeck);
          this.myDeck.forEach((card) => {
            this.param += '-' + card.name;
          });
        });
    });
  }

  openPack() {
    this.open = !this.open;
  }
}
