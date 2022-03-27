import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    if(this.router.url == '/'){
      this.router.navigate(['/create']);
    }
   }

  ngOnInit(): void {
    
  }

}
