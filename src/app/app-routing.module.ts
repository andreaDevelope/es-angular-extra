import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoComponent } from './pages/video/video.component';
import { FigtherComponent } from './pages/figther/figther.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ArenaComponent } from './pages/arena/arena.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'video', component: VideoComponent },
  { path: 'fighter/:name', component: FigtherComponent },
  { path: 'arena/:name', component: ArenaComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
