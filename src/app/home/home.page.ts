import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    ingredients = [
        { name: 'Jalapenos', isChecked: false },
        { name: 'Pepperoni', isChecked: true },
        { name: 'Sausage', isChecked: false },
        { name: 'Mushrooms', isChecked: false },
    ];

    myBoolean = true;

    onMyBooleanChange() {
        console.log(this.myBoolean);
    }
}
