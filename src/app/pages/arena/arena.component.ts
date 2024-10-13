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
  myDeck2: iMedia[] = [];
  isDisable: boolean = true;

  numRnd: number = Math.floor(Math.random() * this.myDeck2.length + 1);

  myDeck: string[] = [];
  compDeck: iMedia[] = [];

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
          this.myDeck = this.myDeck.filter((name) => name !== '');

          console.log('myDeck:', this.myDeck);

          res.forEach((card) => {
            if (this.myDeck.includes(card.name)) {
              this.myDeck2.push(card);
            } else {
              this.compDeck.push(card);
            }
          });

          this.compDeck = this.compDeck.splice(0, 3);
          console.log('avversari:', this.compDeck);
        })
        .catch((error) => {
          console.error('Errore nel fetch:', error);
        });
    });
  }
}
