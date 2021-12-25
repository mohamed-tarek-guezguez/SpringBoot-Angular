import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { GetCategoryComponent } from './admin/category/get-category/get-category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin/category/update-category/update-category.component';
import { GetUserComponent } from './admin/user/get-user/get-user.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UpdateUserComponent } from './admin/user/update-user/update-user.component';
import { UpdateProductComponent } from './admin/product/update-product/update-product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { GetProductComponent } from './admin/product/get-product/get-product.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { CartComponent } from './cart/cart.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    DashboardComponent,
    GetCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    GetUserComponent,
    AddUserComponent,
    UpdateUserComponent,
    UpdateProductComponent,
    AddProductComponent,
    GetProductComponent,
    ProfileComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    ContactsComponent,
    CartComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
