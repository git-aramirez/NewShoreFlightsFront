import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  originInput= new FormControl('',[]);
  destinationInput= new FormControl('',[]);
  private urlGeneralFlights: string = 'https://localhost:7121/Flight/flights';
   

  async search(event : Event){
    event.preventDefault();
    var valueOriginInput = this.originInput.value?.toUpperCase();
    var valueDestinationInput = this.destinationInput.value?.toUpperCase();
    var journeys =`https://localhost:7121/Flight/journeys/${valueOriginInput}/${valueDestinationInput}`;

    var generalFlights = await fetch(this.urlGeneralFlights,  {
      method: 'GET',
      mode: 'no-cors'
    }).then(
      response =>{
        response.json().then(async data => {
          console.log(data);
          await fetch(journeys, {
            method: 'POST',
            body: JSON.stringify(generalFlights),
            mode: 'no-cors'
          });
        })
      }
    );
  }
}
