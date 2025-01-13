import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  @Input() product: any;  // Nhận thông tin sản phẩm từ parent component (ProductComponent)
  @Input() showModal: boolean = false;  // Kiểm tra modal có hiển thị không
  @Output() close = new EventEmitter<void>();  // Đóng modal khi cập nhật xong

  // Xử lý thay đổi hình ảnh
  previewImage(event: any) {
    const image = document.getElementById('productImage') as HTMLImageElement;
    const defaultIcon = document.getElementById('defaultIcon') as HTMLElement;

    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = 'block';
    defaultIcon.style.display = 'none';
  }

  // Lưu thông tin sản phẩm sau khi chỉnh sửa
  saveProduct() {
    // Gọi API hoặc xử lý lưu dữ liệu ở đây
    alert('Sản phẩm đã được cập nhật!');
    this.closeModal();  // Đóng modal sau khi lưu thành công
  }

  // Hủy chỉnh sửa và đóng modal
  cancelEditProduct() {
    const confirmation = confirm("Bạn có chắc chắn muốn hủy chỉnh sửa sản phẩm không?");
    if (confirmation) {
      this.closeModal();  // Đóng modal
    }
  }

  // Đóng modal
  closeModal() {
    this.close.emit();
  }

  // Nếu người dùng click vào overlay, modal sẽ đóng
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}