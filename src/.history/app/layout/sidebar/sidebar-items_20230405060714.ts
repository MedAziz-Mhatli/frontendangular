import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  
  {
    path: '',
    title: 'Accueil',
    moduleName: 'Accueil',
    
    iconType: '',
    icon: '',
    class: 'fas fa-home',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  

  
  {
    path: '',
    title: 'Gestion Produits',
    moduleName: 'prod',
    iconType: 'feather',
    icon: 'users',
    class: 'menu-toggle',
    

       groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
   
          {
            path: 'GestionCategories',
            title: 'Catégories',
            moduleName: 'Catégories',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: 'produits',
            title: 'Produits',
            moduleName: 'Produits',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
],
  },
  /*{
    path: '',
    title: 'Gestion utilisateurs',
    moduleName: 'advan',
    iconType: 'feather',
    icon: 'users',
    class: 'menu-toggle',
    

       groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
   
          {
            path: 'élèves',
            title: 'Elèves',
            moduleName: 'eleves',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: 'parents',
            title: 'Parents',
            moduleName: 'parents',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: 'enseignants',
            title: 'Enseignants',
            moduleName: 'enseignants',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: 'administrateurs',
            title: 'Administration',
            moduleName: 'administrateurs',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },

     
    ],
  },*/
 
 /* {
    path: '',
    title: 'Gestion cours',
    moduleName: 'calendrier',
    iconType: '',
    icon: '',
    class: 'far fa-edit',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },*/
 // {
   // path: '/gestion',
    //title: 'Gestion matières',
   // moduleName: 'calendrier',
  //  iconType: '',
    //icon: '',
   // class: 'fas fa-book',
   // groupTitle: false,
   // badge: '',
   // badgeClass: '',
   // submenu: [],
 // },
  
 
 

];
