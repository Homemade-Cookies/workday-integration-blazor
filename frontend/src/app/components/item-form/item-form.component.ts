import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  @Input() item: Item = { _id: '', name: '', description: '' };
  @Output() formSubmit: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.item._id) {
      this.itemService.updateItem(this.item._id, this.item).subscribe(
        (updatedItem) => {
          this.formSubmit.emit(updatedItem);
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
    } else {
      this.itemService.addItem(this.item).subscribe(
        (newItem) => {
          this.formSubmit.emit(newItem);
        },
        (error) => {
          console.error('Error adding item', error);
        }
      );
    }
  }
}
