import { Component, Inject, OnInit } from '@angular/core';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { BannerModel } from '../../../../models/banner/banner.model';
import { TableComponent } from '../../../shared/common/table/table.component';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BANNER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IBannerService } from '../../../../services/banner/banner-service.interface';
import { ToastrService } from 'ngx-toastr';
import { faPlus, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-list',
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.css',
})
export class BannerListComponent implements OnInit {
  faPlus = faPlus;
  faStar = faStar;
  faTrash = faTrash;

  banners: BannerModel[] = [];

  constructor(
    @Inject(BANNER_SERVICE)
    private readonly bannerService: IBannerService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.bannerService.getAll().subscribe((response) => {
      this.banners = response;
    });
  }

  public detail(id: string): void {
    this.router.navigate(['/admin/banners', id, 'detail']);
  }

  public delete(id: string): void {
    this.bannerService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Xóa slide thành công!');
        this.bannerService.getAll().subscribe((response) => {
          this.banners = response;
        });
      },
      error: () => {
        this.toastr.error('Xóa slide thất bại!');
      },
    });
  }

  formatMinuteToHour(minute: number): string {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${hours}h ${minutes}m`;
  }
}
