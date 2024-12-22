// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';import { ProductService } from 'src/app/service/product.service';

// @Component({
//   selector: 'app-add-products',
//   templateUrl: './add-products.component.html',
//   styleUrls: ['./add-products.component.css']
// })
// export class AddProductsComponent implements OnInit{
//   product = {
//     MouseDetailID: '',
//     productName: '',
//     dimensions:'',
//     connectivity: '',
//     dpi:'',
//     layout:'',
//     switch:'',
//     switchLife:'',
//     price:'',
//     view:'',
//     quantity:'',
//     weight:'',
//     size:'',
//     led:'Có',
//     batteryCapacity:'',
//     category: '',
//     categoryID: null,
//     description: '',
//     image: ''  // Lưu trữ ảnh sản phẩm
//   };
//   categories: any[] = [];
//   constructor(private productService: ProductService) {}
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
//   // ngOnInit(): void {
//   //   // Gọi API và lấy dữ liệu
//   //   this.categoryService.getCategories().subscribe(data => {
//   //     this.categories = data; // Gán dữ liệu vào categories
//   //     console.log(this.categories); // Kiểm tra dữ liệu trả về từ API
//   //   }, error => {
//   //     console.error('Lỗi khi gọi API', error);
//   //   });
//   // }
  

//   // Hàm xử lý ảnh khi người dùng chọn
//   previewImage(event: any) {
//       const image = document.getElementById('productImage') as HTMLImageElement;
//       const defaultIcon = document.getElementById('defaultIcon') as HTMLElement;
    
//       image.src = URL.createObjectURL(event.target.files[0]);
//       image.style.display = 'block';
//       defaultIcon.style.display = 'none';
//     }

//   // Hàm xử lý submit form
//   onSubmit() {
//     // Kiểm tra xem tất cả các trường có được điền đầy đủ không
//     if (this.product.productName && this.product.price && this.product.view && this.product.quantity&& this.product.weight&& this.product.batteryCapacity&& this.product.category&& this.product.description) {
//       // Gọi phương thức trong ProductService để gửi sản phẩm
//       this.productService.createProduct(this.product).subscribe(
//         (response) => {
//           console.log('Sản phẩm đã được thêm:', response);
//           alert('Sản phẩm đã được thêm thành công!');
//         },
//         (error) => {
//           console.error('Có lỗi xảy ra khi thêm sản phẩm', error);
//           alert('Có lỗi xảy ra!');
//         }
//       );
//     } else {
//       alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
//     }
//   }
  
  

//   @Input() showModal: boolean = false;
// @Output() close = new EventEmitter<void>(); 
// closeModal() {
//   this.close.emit();
// }
// onOverlayClick(event: MouseEvent) {
//   if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
//     this.closeModal(); 
//   }
// }
// }


import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { KeyboardService } from 'src/app/service/keyboard.service';
import { MouseService } from 'src/app/service/mouse.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  previewImage(event: any) {
    const image = document.getElementById('productImage') as HTMLImageElement;
    const defaultIcon = document.getElementById('defaultIcon') as HTMLElement;
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = 'block';
    defaultIcon.style.display = 'none';
  }

  categories: any[] = [];
  product: any = {
    productID: '',
    categoryID: '',
    color: '',
    led: '',
    ss: '',
    description: ''
  };

  mouseDetails: any = {
    mouseDetailID: '',
    dpi: '',
    connectivity: '',
    dimensions: '',
    weight: '',
    material: '',
    eyeReading: '',
    button: ''
  };

  keyboardDetails: any = {
    keyboardDetailID: '',
    layout: '',
    case: '',
    switch: '',
    switchLife: '',
    keycapMaterial: '',
    switchMaterial: '',
    pcb: '',
    stabilizers: ''
  };

  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private categoryService: CategoryService,
    private mouseService: MouseService,
    private keyboardService: KeyboardService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  onSubmit() {
    if (this.product.categoryID === 1) {
      this.mouseService.createMouse(this.mouseDetails).subscribe();
    } else if (this.product.categoryID === 2) {
      this.keyboardService.createKeyboard(this.keyboardDetails).subscribe();
    }
  }

  onCategoryChange() {
    // Reset specific details when category changes
    if (this.product.categoryID === 1) {
      this.mouseDetails = {};
    } else if (this.product.categoryID === 2) {
      this.keyboardDetails = {};
    }
  }
}
