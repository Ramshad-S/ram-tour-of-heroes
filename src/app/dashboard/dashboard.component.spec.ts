import { waitForAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let compiled: any;
  let heroService: any;
  let heroServiceStub: Partial<HeroService>;

  heroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return of(HEROES.slice(0, 5));
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DashboardComponent, HeroSearchComponent ],
      providers: [{
        provide: HeroService,
        useValue: heroServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    heroService = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four heroes', () => {
    expect(component.heroes.length).toEqual(4);
  });

  it('should have a title', () => {
    expect(compiled.querySelector('h3').textContent).toEqual(`Top Heroes`);
  });
});

