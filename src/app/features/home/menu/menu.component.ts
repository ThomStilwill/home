import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../store/menu/menu';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuitemComponent implements OnInit {
  @Input() menus: Menu;
  @Input() isRoot = false;

  isLoading = false;
  constructor() {
    
  }

  ngOnInit(){
    console.log(this.menus.name)
  }

  isExpandable(node: Menu) {
    return node.children.length>0;
  }
}
