import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iMedia } from '../../module/i-media';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
})
export class ArenaComponent {
  constructor(private route: ActivatedRoute) {}

  myDeck: string[] = [];
  myDeck2: iMedia[] = [];

  ngOnInit() {
    this.route.params.subscribe((param) => {
      const name: string = param['name'];
      fetch('/assets/media.json')
        .then((res) => {
          if (res.ok) {
            return <Promise<iMedia[]>>res.json();
          } else {
            throw new Error('non ha un 200');
          }
        })
        .then((res) => {
          this.myDeck = name.split('-');
          this.myDeck = this.myDeck.filter((name) =>
            name !== '' ? true : false
          );
          console.log(this.myDeck);
          this.myDeck2 = res.filter((card) => {
            this.myDeck.forEach((name) => {
              if (card.name === name) {
                this.myDeck2.push(card);
              }
            });
          });
        });
    });
    console.log(this.myDeck2);
  }
}
