import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// About
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './admin/contacts/contacts.component';

// Profile
import { ProfileComponent } from './profile/profile.component';

// Admin Dashboard
import { DashboardComponent } from './admin/dashboard/dashboard.component';

// Admin Category
import { GetCategoryComponent } from './admin/category/get-category/get-category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin/category/update-category/update-category.component';

// Admin Product
import { GetProductComponent } from './admin/product/get-product/get-product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { UpdateProductComponent } from './admin/product/update-product/update-product.component';

// Admin User
import { GetUserComponent } from './admin/user/get-user/get-user.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UpdateUserComponent } from './admin/user/update-user/update-user.component';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  // Cart Route
  { path: 'cart', component: CartComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // About Route
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Profile Route
  { path: 'profile', component: ProfileComponent },

  // Admin Route
  { path: 'admin', component: DashboardComponent },

  // Admin Category Route
  { path: 'admin/category', component: GetCategoryComponent },
  { path: 'admin/category/add', component: AddCategoryComponent },
  { path: 'admin/category/:id', component: UpdateCategoryComponent },

  // Admin Product Route
  { path: 'admin/product', component: GetProductComponent },
  { path: 'admin/product/add', component: AddProductComponent },
  { path: 'admin/product/:id', component: UpdateProductComponent },

  // Admin User Route
  { path: 'admin/user', component: GetUserComponent },
  { path: 'admin/user/add', component: AddUserComponent },
  { path: 'admin/user/:id', component: UpdateUserComponent },

  // Admin Route
  { path: 'admin/contact', component: ContactsComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
