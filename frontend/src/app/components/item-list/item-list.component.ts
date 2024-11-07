import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }

  deleteItem(id: string): void {
    this.itemService.deleteItem(id).subscribe(
      () => {
        this.items = this.items.filter(item => item._id !== id);
      },
      (error) => {
        console.error('Error deleting item', error);
      }
    );
  }
}
