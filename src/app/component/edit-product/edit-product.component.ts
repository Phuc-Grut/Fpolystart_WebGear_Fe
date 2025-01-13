import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SubCategory } from 'src/app/Interface/ISubCategory'
import { SubCategoryService } from 'src/app/service/subCategory.service'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Input() product: any;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  baseUrl: string = 'https://lacdau.com';

  subCategories: SubCategory[] = []
  selectedSubCategoryIds: number[] = []

  constructor(private subCategoryService: SubCategoryService) {}

  ngOnInit(): void {
    this.subCategoryService.getAllSubCategories().subscribe(
      (data: SubCategory[]) => {
        this.subCategories = data;

        if (this.product && this.product.subCategories) {
          this.selectedSubCategoryIds = this.product.subCategories.map(
            (sc: any) => sc.subCategoryID
          );
        }
      },
      (error) => {
        console.error('Lỗi khi tải SubCategory:', error);
      }
    );
  }  

  onCategoryChange(event: any) {
    console.log('Danh mục được chọn:', this.product.categoryID);
  }

  previewImage(event: any) {
    const image = document.getElementById('productImage') as HTMLImageElement;
    const defaultIcon = document.getElementById('defaultIcon') as HTMLElement;

    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = 'block';
    defaultIcon.style.display = 'none';
  }

  onSubmit() {
    alert('Sản phẩm đã được cập nhật!');
    this.closeModal();
  }

  cancelEditProduct() {
    const confirmation = confirm(
      'Bạn có chắc chắn muốn hủy chỉnh sửa sản phẩm không?'
    );
    if (confirmation) {
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  removeDetail(index: number) {
    this.product.productDetail.splice(index, 1);
  }
}
