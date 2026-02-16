import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'seller-home',
    canActivate: [AuthGuardGuard],
    component: SellerHomeComponent,
  },

  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
{
  component:CartPageComponent,
  path:'cart-page'
},
{
  component:CheckOutComponent,
  path:'check-out'
},
  {
    component: AddproductComponent,
    path: 'addproduct',
    canActivate: [AuthGuardGuard],
  },

  // {
  //   path: 'list',
  //   component: ListComponent,
  // },

  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path:'product-detail/:productId',
    component:ProductDetailsComponent,
  },
  {
    path:'userAuth',
    component:UserAuthComponent
  },
  {
    path:'my-order',
    component:MyOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
