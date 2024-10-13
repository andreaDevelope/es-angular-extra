import { Component } from '@angular/core';
import { iMedia } from '../../module/i-media';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-figther',
  templateUrl: './figther.component.html',
  styleUrl: './figther.component.scss',
})
export class FigtherComponent {
  fighter!: iMedia[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      const fighterName = param['name'];

      fetch('/assets/media.json')
        .then((res) => {
          if (res.ok) {
            return <Promise<iMedia[]>>res.json();
          } else {
            throw new Error('non hai un 200');
          }
        })
        .then((res) => {
          this.fighter = res.filter((f) =>
            f.name === fighterName ? true : false
          );
        })
        .catch((e) => console.log(e));
    });
  }
}
