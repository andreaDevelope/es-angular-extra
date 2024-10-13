import { Component } from '@angular/core';
import { iMedia } from '../../module/i-media';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
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
        console.log(res);
        if (res) {
          this.image = res.filter((media) =>
            media.type === 'image' ? true : false
          );
          this.video = res.filter((media) =>
            media.type === 'video' ? true : false
          );
        }
        console.log(this.video);
      })
      .catch((e) => console.log(e));
  }
}
