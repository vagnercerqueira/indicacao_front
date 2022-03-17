import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'amigo', redirectTo: 'amigo/index', pathMatch: 'full' },
  { path: 'amigo/index', component: IndexComponent },
  { path: 'amigo/create', component: CreateComponent },
  { path: 'amigo/edit/:idAmigo', component: EditComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmigoRoutingModule { }


