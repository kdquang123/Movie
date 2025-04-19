import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './shared/layout/customer-layout/customer-layout.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    component: AdminLayoutComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    component: CustomerLayoutComponent,
  },
];
