import { Component } from '@angular/core';
import { iMedia } from '../../module/i-media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  image: iMedia[] = [];
  video: iMedia[] = [];
  ngOnInit() {
    fetch('/assets/media.json')
      .then((res) => {
        if (res.ok) {
          return <Promise<iMedia[]>>res.json();
        } else {
          throw new Error('stato non 200');
        }
      })
      .then((res) => {
        if (res) {
          console.log(res);
          this.image = res.filter((media) =>
            media.type === 'image' ? true : false
          );
          this.video = res.filter((media) =>
            media.type === 'video' ? true : false
          );
        }
      })
      .catch((e) => console.log(e));
  }
}
