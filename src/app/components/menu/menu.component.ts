import {Component, OnInit} from '@angular/core';
import {MenuService, UserService} from '../../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isOpen: boolean;
  menuItems = [
    {
      icon: 'fa-home',
      link: '',
      name: 'Accueil',
    },
    {
      icon: 'fa-warehouse',
      link: '',
      name: 'Serres',
    },
    {
      icon: 'fa-leaf',
      link: '',
      name: 'Plantes'
    },
    {
      icon: 'fa-user',
      link: '',
      name: 'Mes informations',
    },
    {
      icon: 'fa-paper-plane',
      link: '',
      name: 'Inviter',
    },
  ];

  constructor(protected menuService: MenuService,
              protected userService: UserService) {
  }

  ngOnInit() {
    this.menuService.isOpen$.subscribe({
      next: (isOpen) => this.isOpen = isOpen
    });
  }
}
