import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResultaBusca } from './resulta-busca';

describe('ResultaBusca', () => {
  let component: ResultaBusca;
  let fixture: ComponentFixture<ResultaBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultaBusca],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultaBusca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
