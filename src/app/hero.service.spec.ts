import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Hero } from './hero';
import { HeroService } from './hero.service';

describe('HeroesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;
  let expectedHeroes: Hero[];
  expectedHeroes = [
    { id: 1, name: 'Batman' },
    { id: 2, name: 'Superman' },
   ] as Hero[];
   let mockHero =expectedHeroes[0];
   let mockId = mockHero.id;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HeroService ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getHeroes', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
     
    });

    it('should return expected heroes', () => {
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHeroes);
    });


    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      heroService.getHeroes().subscribe(
        heroes => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected heroes (called multiple times)', () => {
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe();
      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      const requests = httpTestingController.match(heroService.heroesUrl);
      expect(requests.length).toEqual(3, 'calls to getHeroes()');
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedHeroes);
    });
  });

  describe('getHero', () => {
    it('should return a single mock hero', () => {
      heroService.getHero(mockHero.id).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockHero);
    });
  })

  describe('addHero', () => {

    it('should add a single Hero', () => {
      heroService.addHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockHero);
    });
  });

  describe('updateHero', () => {
    const makeUrl = (id: number) => `${heroService.heroesUrl}/?id=${id}`;

    it('should update a hero and return it', () => {

      const updateHero: Hero = { id: 1, name: 'Batman' };

      heroService.updateHero(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the hero'),
        fail
      );
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = 'Deliberate 404';
      const updateHero: Hero = { id: 1, name: 'A' };
      heroService.updateHero(updateHero).subscribe(
        heroes => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('deleteHero', () => {

    it('should delete hero', () => {
      heroService.deleteHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockHero);
    });
  });

  describe('searchHero', () => {
    it('should find heroes matching the search criteria', () => {
      const searchTerm = 'n'
      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([expectedHeroes[1], expectedHeroes[2]]),
        fail
      );
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([expectedHeroes[1], expectedHeroes[2]]);
    });
  })
  });