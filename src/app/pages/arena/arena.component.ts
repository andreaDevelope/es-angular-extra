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
  myDeck3: iMedia[] = [];

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
          this.myDeck3 = structuredClone(this.myDeck2);

          this.compDeck = this.compDeck.splice(0, 3);
          console.log('avversari:', this.compDeck);
        })
        .catch((error) => {
          console.error('Errore nel fetch:', error);
        });
    });
  }

  normalAttack() {
    this.myDeck2[this.numRnd].stamina = 10;
    this.compDeck[this.numRnd].vita -= this.myDeck2[this.numRnd].attacco_base;
    this.myDeck2[this.numRnd].stamina -=
      this.myDeck2[this.numRnd].consumo_stamina_attacco_base;
    this.isDisableToggle();
    if (this.compDeck[this.numRnd].vita < 1) {
      this.compDeck[this.numRnd].vita = 0;
      this.compDeck[this.numRnd].stamina = 0;

      this.compDeck[this.numRnd].path =
        'https://t3.ftcdn.net/jpg/01/15/89/20/240_F_115892005_HMEE0k02qxE2PMgSoEuulFNokLEvP7kW.jpg';
      this.compDeck[this.numRnd].attacco_base = 0;
      this.compDeck[this.numRnd].attacco_speciale = 0;
      this.isDisableToggle();
    }
    if (this.compDeck[this.numRnd].vita < 1) {
      if (this.myDeck2[this.numRnd].stamina < 1) {
        this.myDeck2[this.numRnd].stamina = 0;
      }
    } else {
      if (this.myDeck2[this.numRnd].stamina < 1) {
        this.myDeck2[this.numRnd].stamina = 0;
        this.myDeck2[this.numRnd].attacco_base = 0;
        this.myDeck2[this.numRnd].attacco_speciale = 0;
        this.myDeck2[this.numRnd].stamina = 50;
        this.myDeck2[this.numRnd].stamina -=
          this.myDeck2[this.numRnd].consumo_stamina_attacco_base;
      }
      if (this.myDeck2[this.numRnd].stamina > 1) {
        this.myDeck2[this.numRnd].attacco_base =
          this.myDeck3[this.numRnd].attacco_base;
        this.myDeck2[this.numRnd].attacco_speciale =
          this.myDeck3[this.numRnd].attacco_speciale;
        console.log(this.myDeck3[this.numRnd].attacco_speciale);
      }
    }
  }

  specialAttack() {
    this.compDeck[this.numRnd].vita -=
      this.myDeck2[this.numRnd].attacco_speciale;
    this.myDeck2[this.numRnd].stamina -=
      this.myDeck2[this.numRnd].consumo_stamina_attacco_speciale;
    if (this.compDeck[this.numRnd].vita < 1) {
      this.compDeck[this.numRnd].vita = 0;
      this.compDeck[this.numRnd].stamina = 0;

      this.compDeck[this.numRnd].path =
        'https://t3.ftcdn.net/jpg/01/15/89/20/240_F_115892005_HMEE0k02qxE2PMgSoEuulFNokLEvP7kW.jpg';
      this.compDeck[this.numRnd].attacco_speciale = 0;
      this.compDeck[this.numRnd].attacco_base = 0;
      this.isDisableToggle();
    }
    this.isDisableToggle();
  }

  compNormalAttack() {
    this.myDeck2[this.numRnd].vita -= this.compDeck[this.numRnd].attacco_base;
    this.compDeck[this.numRnd].stamina -=
      this.compDeck[this.numRnd].consumo_stamina_attacco_base;
    this.isDisableToggle();
    if (this.myDeck2[this.numRnd].vita < 1) {
      this.myDeck2[this.numRnd].vita = 0;
      this.myDeck2[this.numRnd].stamina = 0;

      this.myDeck2[this.numRnd].path =
        'https://t3.ftcdn.net/jpg/01/15/89/20/240_F_115892005_HMEE0k02qxE2PMgSoEuulFNokLEvP7kW.jpg';
      this.myDeck2[this.numRnd].attacco_base = 0;
      this.myDeck2[this.numRnd].attacco_speciale = 0;
      this.isDisableToggle();
    }
  }

  compSpecialAttack() {
    this.myDeck2[this.numRnd].vita -=
      this.compDeck[this.numRnd].attacco_speciale;
    this.compDeck[this.numRnd].stamina -=
      this.compDeck[this.numRnd].consumo_stamina_attacco_speciale;
    if (this.myDeck2[this.numRnd].vita < 1) {
      this.myDeck2[this.numRnd].vita = 0;
      this.myDeck2[this.numRnd].stamina = 0;

      this.myDeck2[this.numRnd].path =
        'https://t3.ftcdn.net/jpg/01/15/89/20/240_F_115892005_HMEE0k02qxE2PMgSoEuulFNokLEvP7kW.jpg';
      this.myDeck2[this.numRnd].attacco_speciale = 0;
      this.myDeck2[this.numRnd].attacco_base = 0;
      this.isDisableToggle();
    }

    this.isDisableToggle();
  }

  isDisableToggle() {
    this.isDisable = !this.isDisable;
  }
}
