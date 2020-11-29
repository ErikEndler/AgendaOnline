import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Home',
    icon: 'fas fa-home',
    class: '',
  },
  {
    path: '/usuario',
    title: 'User Profile',
    icon: 'tim-icons icon-single-02',
    class: '',
  },
  {
    path: '/usuariolist',
    title: 'Listar Usuarios',
    icon: 'tim-icons icon-align-center',
    class: '',
  },
  {
    path: '/categoria',
    title: 'Categoria Form',
    icon: 'tim-icons icon-single-02',
    class: '',
  },
  {
    path: '/categorialist',
    title: 'Listar Categorias',
    icon: 'tim-icons icon-align-center',
    class: '',
  },
  {
    path: '/servico',
    title: 'Servico Form',
    icon: 'tim-icons icon-single-02',
    class: '',
  },
  {
    path: '/servicolist',
    title: 'Listar Serviços',
    icon: 'tim-icons icon-align-center',
    class: '',
  },
  {
    path: '/escala',
    title: 'Escala',
    icon: 'far fa-calendar-alt',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  hide = true;

  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
