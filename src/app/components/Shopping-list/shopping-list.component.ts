import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../Shoppinglist';
import { GetServiceService } from '../../services/get-service/get-service.service';
import { UpdateserviceService } from '../../services/update-service/updateservice.service';
import { DeleteEntryService } from '../../services/delete-entry/delete-entry.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppinglist!: Shoppinglist[];
  id!: number;
  SelectedWeekday!: String;
  weekdays = [
    "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samnstag"
  ]
  constructor(
    private getShoppinglistService: GetServiceService,
    private deleteService: DeleteEntryService,
    private updateService: UpdateserviceService) { }

  ngOnInit(): void {
    this.getShoppinglistService.getShoppinglist().subscribe((data: Shoppinglist[]) => {
      console.log(data);
      this.shoppinglist = data;

    });
  }


  ShowIfEntryIsDone(a: any, id: any) {
    if (a === false) {
      document.getElementById("entryIsDone" + id)!.innerHTML = '<img style="width: 26px; margin-left: 30%" class="img" src="/assets/red.png" alt="">'
    }
    else {
      document.getElementById("entryIsDone" + id)!.innerHTML = '<img style="width: 24px; margin-left 40%" class="img" src="/assets/green.png" alt="">'
    }

  }
  SetEntryToIsDone() {
    this.updateService.SetEntryToIsDone(this.id).subscribe();
    window.location.reload();
  }

  deleteEntry() {
    this.deleteService.deleteEntry(this.id).subscribe();
    window.location.reload();

  }

}
