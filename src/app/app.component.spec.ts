import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;
  let links: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    links = fixture.debugElement.queryAll(By.css('nav > a'));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Ramshad Tour of Heroes'`, () => {
    expect(component.title).toEqual('Ramshad Tour of Heroes');
  });

  it(`should have a nav to 'Dashboard`, () => {
    expect(links[0].nativeElement.getAttribute('href')).toEqual('/dashboard');
  });

  it(`should have nav to '/heroes`, () => {
    expect(links[1].nativeElement.getAttribute('href')).toEqual('/heroes');
  });

});

