
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>(); // Tín hiệu khi đóng modal

  closeModal(): void {
    this.close.emit(); // Phát sự kiện đóng modal
  }
}
