import { Component, Renderer2, Input, AfterViewInit, OnInit } from '@angular/core';
import { environment } from '@environment/environment';
import { HeadService } from '@app/services/head.service';
import { BoxComponentsType } from '@app/enums/box-component-enum';
const _ = require('lodash');

declare let Box: any;

export interface BoxComponentInterface {
  folderId: string;
  boxCdnJS: string;
  boxCdnCss: string;
  name: BoxComponentsType;
  options: any
}

@Component({
  selector: 'box-component',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})

export class BoxComponent implements OnInit, AfterViewInit {
  @Input() componentData: BoxComponentInterface = {
    folderId: '',
    boxCdnJS: '',
    boxCdnCss: '',
    name: BoxComponentsType.ContentExplorer,
    options: null
  };
  containerId = '';
  private readonly randomToken = this.generateRandomToken();

  constructor(
    private renderer: Renderer2,
    private headService: HeadService,
  ) { }

  ngOnInit() {
    this.containerId = this.buildContainerId();
  }

  ngAfterViewInit() {
    if (this.componentData.name) {
      this.loadJs(this.componentData.boxCdnJS)
      this.loadCss(this.componentData.boxCdnCss)
    }
  }

  private loadCss(href: string):void {
    if (href === '' || this.headService.isStylesheetLoaded(href)) return
    const styleElement = this.headService.loadStylesheetLink(this.renderer, href);

    styleElement.onerror = () => {
      console.warn(`Could not load ${this.componentData.name} Stylesheet!`);
    }
  }

  private loadJs(src: string):void {
    if (src === '') return
    if (this.headService.isScriptLoaded(src)) {
      const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
      if (typeof Box !== 'undefined' && Box[this.componentData.name]) {
        this.initializeComponent();
        return;
      }

      if (existingScript) {
        existingScript.addEventListener('load', () => this.initializeComponent(), { once: true });
      }
      return
    }
    const scriptElement = this.headService.loadJsScript(this.renderer, src);

    scriptElement.onload = () => {
      this.initializeComponent()
    }

    scriptElement.onerror = () => {
      console.warn(`Could not load ${this.componentData.name} Script!`);
    }
  }

  private initializeComponent(): void { 
    if (!this.containerId || !document.getElementById(this.containerId)) {
      return;
    }

    const boxComponentInstance = new Box[this.componentData.name]();

    let container = `#${this.containerId}`;
    let opts = _.merge({},{container: container},this.componentData.options);
    console.log("Opts:",JSON.stringify(opts));

    boxComponentInstance.show(this.componentData.folderId, environment.BoxDeveloperToken, opts);
  }

  private buildContainerId(): string {
    return `${this.componentData.name.toLowerCase()}-${this.randomToken}`;
  }

  private generateRandomToken(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return Math.random().toString(36).slice(2, 12);
  }
}
