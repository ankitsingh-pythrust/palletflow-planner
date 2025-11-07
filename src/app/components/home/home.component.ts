import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Detail { sku: string; qty: number; weight: string; dimensions: string; }
interface Item { id: string; name: string; type: 'pallet' | 'item'; details?: Detail[]; expanded?: boolean; }
interface Carrier { id: string; name: string; items: Item[]; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, MatButtonModule, MatDividerModule, MatExpansionModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public menuOpen = false;

  public sourceItems: Item[] = [
    { id: 'P1001', name: 'Pallet #1001', type: 'pallet', expanded: false, details: [
      { sku: 'SKU-FOO-01', qty: 32, weight: '280 kg', dimensions: '120x100x150 cm' },
      { sku: 'SKU-BAR-09', qty: 12, weight: '110 kg', dimensions: '80x60x80 cm' }
    ]},
    { id: 'I2001', name: 'Loose Item: 20 Boxes', type: 'item' },
    { id: 'P1002', name: 'Pallet #1002 (Chilled)', type: 'pallet', expanded: false, details: [
      { sku: 'SKU-CHILL-22', qty: 18, weight: '220 kg', dimensions: '120x100x140 cm' }
    ]},
    { id: 'I2002', name: 'Loose Item: 4 Crates', type: 'item' }
  ];

  public carriers: Carrier[] = [
    { id: 'T1', name: 'Truck A', items: [] },
    { id: 'T2', name: "Container 40'", items: [] }
  ];

  public dropListIds: string[] = ['sourceList','T1','T2'];

  public drop(event: CdkDragDrop<Item[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public toggleDetails(item: Item): void { if (item.type === 'pallet') { item.expanded = !item.expanded; } }

  public scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen = false;
  }
}
