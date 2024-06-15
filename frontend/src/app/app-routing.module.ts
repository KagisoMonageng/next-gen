import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';

const routes: Routes = [
  // Paths go in here
  {path:'test',component:CommentsSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
