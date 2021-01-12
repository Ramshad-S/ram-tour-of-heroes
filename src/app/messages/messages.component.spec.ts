import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: MessageService;
  let compiled: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  afterEach(() => {
    messageService.messages = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', waitForAsync( () => {
    messageService.messages.push('HeroService: fetched heroes');
    fixture.detectChanges();
    fixture.whenStable().then(() => { 

    expect(compiled.querySelector('h2').textContent).toEqual('Messages');
    })
  }));

  it('should have a message', waitForAsync( () => {
    messageService.messages.push('HeroService: fetched heroes');
    fixture.detectChanges();
    fixture.whenStable().then(() => { 
    fixture.detectChanges();
    expect(compiled.querySelector('.msg').textContent)
      .toEqual('HeroService: fetched heroes');
    })
  }));
});