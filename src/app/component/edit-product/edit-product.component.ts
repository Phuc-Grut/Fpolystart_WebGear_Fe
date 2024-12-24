import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

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

  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    console.log('Component EditProductComponent được khởi tạo');
    // if (!this.product) {
    //   console.error('Sản phẩm không tồn tại');
    //   return;
    // }

    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        console.log('Danh mục:', data);
        this.categories = data;
        console.log('Danh mục hiện tại của sản phẩm:', this.product.categoryID)
      },
      (error) => {
        console.error('Lỗi khi tải danh mục:', error);
      }
    );
  }

  onCategoryChange(event: any) {
    console.log('Danh mục được chọn:', this.product.categoryID); // Log danh mục hiện tại
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
