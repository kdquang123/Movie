import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faStar,
  faTicketAlt,
  faPlay,
  faChevronLeft,
  faChevronRight,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BANNER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IBannerService } from '../../../../services/banner/banner-service.interface';
import { BannerModel } from '../../../../models/banner/banner.model';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  public faStar: IconDefinition = faStar;
  public faTicketAlt: IconDefinition = faTicketAlt;
  public faPlay: IconDefinition = faPlay;
  public faChevronLeft: IconDefinition = faChevronLeft;
  public faChevronRight: IconDefinition = faChevronRight;
  public faNewspaper: IconDefinition = faNewspaper;

  @ViewChild('carouselInner') carouselInner!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;

  banners: BannerModel[] = [];
  totalItems = this.banners.length;

  constructor(
    @Inject(BANNER_SERVICE) private readonly bannerService: IBannerService
  ) {}

  public ngOnInit(): void {
    this.bannerService.getAll().subscribe((response) => {
      this.banners = response;
      this.totalItems = this.banners.length;
    });
  }

  currentIndex = 0;
  autoSlide: any;

  ngAfterViewInit(): void {
    this.updateCarousel();
    this.autoSlide = setInterval(() => this.nextSlide(), 5000);

    this.carousel.nativeElement.addEventListener('mouseenter', () =>
      clearInterval(this.autoSlide)
    );
    this.carousel.nativeElement.addEventListener('mouseleave', () => {
      this.autoSlide = setInterval(() => this.nextSlide(), 5000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlide);
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.carouselInner.nativeElement.style.transform = `translateX(${offset}%)`;
  }

  goToSlide(index: number) {
    this.currentIndex = (index + this.totalItems) % this.totalItems;
    this.updateCarousel();
    this.resetAutoSlide();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlide);
    this.autoSlide = setInterval(() => this.nextSlide(), 5000);
  }

  formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }
}
