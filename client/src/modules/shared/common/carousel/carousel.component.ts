import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  faStar,
  faTicketAlt,
  faPlay,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  public faStar: IconDefinition = faStar;
  public faTicketAlt: IconDefinition = faTicketAlt;
  public faPlay: IconDefinition = faPlay;
  public faChevronLeft: IconDefinition = faChevronLeft;
  public faChevronRight: IconDefinition = faChevronRight;

  @ViewChild('carouselInner') carouselInner!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;

  banners= [
    {
      title: 'JOHN WICK: CHAPTER 4',
      image:
        'https://thefutureoftheforce.com/wp-content/uploads/2023/02/John-Wick-Chapter-4-Header.jpg',
      rating: 9.0,
      duration: '2h 49m',
      genre: 'Hành động',
      description:
        'John Wick đối mặt với kẻ thù mới với những liên minh quyền lực trên toàn cầu.',
    },
    {
      title: 'THE BATMAN',
      image:
        'https://www.pixel4k.com/wp-content/uploads/2023/02/the-batman-movie-poster-chn-4k_1675638279.jpg',
      rating: 9.2,
      duration: '2h 56m',
      genre: 'Hành động',
      description: 'Batman đối đầu với những bí ẩn đen tối của Gotham.',
    },
    {
      title: 'DOCTOR STRANGE 2',
      image:
        'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/05/10-biggest-spoilers-doctor-strange-multiverse-of-madness.jpg',
      rating: 8.5,
      duration: '2h 6m',
      genre: 'Siêu anh hùng',
      description: 'Bước vào đa vũ trụ với Doctor Strange.',
    },
  ];

  currentIndex = 0;
  autoSlide: any;
  totalItems = this.banners.length;

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
}
