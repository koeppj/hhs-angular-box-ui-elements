import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentExplorerComponent } from '@app/pages/content-explorer/content-explorer.component'
import { ContentUploaderComponent } from '@app/pages/content-uploader/content-uploader.component';
import { ContentPreviewComponent } from './pages/content-preview/content-preview.component';
import { SideBySidePreviewComponent } from './pages/side-by-side-preview/side-by-side-preview.component';

const routes: Routes = [
  { path: 'content-explorer', component: ContentExplorerComponent },
  { path: 'content-uploader', component: ContentUploaderComponent },
  { path: 'content-preview', component: ContentPreviewComponent  },
  { path: 'side-by-side-preview', component: SideBySidePreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
