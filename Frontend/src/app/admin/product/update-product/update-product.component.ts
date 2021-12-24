import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Category } from '../../../model/category.model';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private ProductService: ProductService,
    private CategoryService: CategoryService
  ) {}

  id?: any;
  item = {} as Product;
  error?: any;
  categorys?: Category[];
  categoryId?: any;
  languageVal?: any;
  imageFile?: any;
  updateImage: any = false;

  onChange(event: any) {
    this.imageFile = event.target.files[0];
    this.item.image = this.imageFile.name;
    this.updateImage = true;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authUserId')) {
      this.router.navigate(['login']);
    }

    this.id = this.ar.snapshot.paramMap.get('id');
    this.ProductService.getProductById(this.id).subscribe((data) => {
      this.item = data;
      this.languageVal = data.language;

      this.CategoryService.getCategorys().subscribe((data) => {
        this.categorys = data;
      });
    });
  }

  onChangeCategory($event: any) {
    this.CategoryService.getCategoryById(this.categoryId).subscribe((data) => {
      this.item.category = data;
    });
  }

  update(): void {
    this.item.language = this.languageVal;

    this.ProductService.updateProduct(this.id, this.item).subscribe(
      (response) => {
        if (this.updateImage) {
          this.ProductService.upload(this.imageFile).subscribe(
            (data) => {
              this.router.navigate(['admin/product']);
            },
            (errr) => {
              this.error = errr.error;
              console.log(errr.error);
            }
          );
        } else {
          this.router.navigate(['admin/product']);
        }
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    );
  }
}
