import { Component, Inject } from '@angular/core';
import { TableComponent } from '../../../shared/common/table/table.component';
import { MasterDataComponent } from '../../master-data/master-data.component';
import { MemberModel } from '../../../../models/member/member.model';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MEMBER_SERVICE } from '../../../../constants/injection/injection.constant';
import { IMemberService } from '../../../../services/member/member-service.interface';
import { ToastrService } from 'ngx-toastr';
import { TableColumn } from '../../../shared/common/table/table-column.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [TableComponent, RouterLink, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent extends MasterDataComponent<MemberModel> {
  constructor(
    @Inject(MEMBER_SERVICE)
    private readonly memberService: IMemberService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super();
  }
  public override columns: TableColumn[] = [
    { name: 'Họ tên', value: 'fullName' },
    { name: 'Email', value: 'email' },
    {
      name: 'Ngày sinh',
      value: 'dateOfBirth',
      formatter: this.formatDate.bind(this),
    },
    {
      name: 'Giới tính',
      value: 'gender',
      formatter: (e: MemberModel) =>
        e.gender === true ? 'Nam' : e.gender === false ? 'Nữ' : 'Khác',
    },
    {
      name: 'Trạng thái',
      value: 'isActive',
      formatter: (m: MemberModel) =>
        m.isActive ? 'Hoạt động' : 'Ngừng hoạt động',
      style: (m: MemberModel) =>
        m.isActive
          ? 'text-white text-center rounded-full bg-green-500 inline px-2 py-1'
          : 'text-white text-center rounded-full bg-red-500 inline px-2 py-1',
    },
  ];

  override ngOnInit(): void {
    this.createForm();
    this.searchData();
  }

  protected override searchData(): void {
    this.memberService.searchMember(this.filter).subscribe((res) => {
      this.data = res;
    });
  }

  protected override createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
      status: new FormControl(''),
    });
  }

  delete(id: string): void {
    this.memberService.deleteMember(id).subscribe({
      next: () => {
        this.toastr.success('Xóa thành viên thành công!', 'Thông báo');
        this.searchData();
      },
      error: () => {
        this.toastr.error('Xóa thành viên thất bại!', 'Thông báo');
      },
    });
  }

  detail(id: string): void {
    this.router.navigate(['/admin/members', id, 'detail']);
  }

  private formatDate(member: MemberModel, column: TableColumn): string {
    const dateValue = member[column.value as keyof MemberModel];
    if (dateValue) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const date = new Date(dateValue as string);
      return formatter.format(date);
    }
    return 'Invalid Date';
  }
}
