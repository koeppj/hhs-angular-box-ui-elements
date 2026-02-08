import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { environment } from '@environment/environment';

@Component({
  selector: 'side-by-side-preview',
  templateUrl: './side-by-side-preview.component.html',
  styleUrls: ['./side-by-side-preview.component.scss']
})
export class SideBySidePreviewComponent {
  leftContentPreview = {
    folderId: environment.BoxPreviewFileID,
    // Get CDN links from https://developer.box.com/guides/embed/ui-elements/installation/#manual-installation
    boxCdnJS: 'https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.js',
    boxCdnCss: 'https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.css',
    name: BoxComponentsType.ContentPreview,
    options: { canDownload: true, hasHeader: true }
  };

  rightContentPreview = {
    folderId: environment.BoxPreviewFileID2,
    // Get CDN links from https://developer.box.com/guides/embed/ui-elements/installation/#manual-installation
    boxCdnJS: 'https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.js',
    boxCdnCss: 'https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.css',
    name: BoxComponentsType.ContentPreview,
    options: { canDownload: true, hasHeader: true }
  };
}
