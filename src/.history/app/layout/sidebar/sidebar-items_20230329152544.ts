import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  
  {
    path: '',
    title: 'Accueil',
    moduleName: 'Accueil',
    
    iconType: '',
    icon: '',
    class: 'fas fa-university',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  
  /*{
    path: '/dashboard/main',
    title: 'Matières',
    moduleName: 'Matières',
    iconType: '',
    icon: '',
    class: 'fab fa-leanpub',
    groupTitle: false,
    badge: '13',
    badgeClass: 'badge bg-blue sidebar-badge float-end',
    submenu: [],
  },*/
  {
    path: 'GestionCategories',
    title: 'Catégories Produits',
    moduleName: 'Offres',
    iconType: '',
    icon: '',
    class: 'fas fa-gem',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
 /* {
    path: '',
    title: 'Solde',
    moduleName: 'solde',
    iconType: '',
    icon: '',
    class: 'far fa-money-bill-alt',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Calendrier',
    moduleName: 'calendrier',
    iconType: '',
    icon: '',
    class: 'far fa-calendar-alt',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },*/
  {
    path: '',
    title: 'Aide et Assistance',
    moduleName: 'aide',
    iconType: '',
    icon: '',
    class: 'fas fa-user-cog',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Gestion Produits',
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
],
  },
  {
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
  },
 
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
  {
    path: '',
    title: 'Gestion matières',
    moduleName: 'advance',
    iconType: 'feather',
    icon: 'book-open',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '',
        title: 'Matières',
        moduleName: 'advance',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: 'fichesMatieres',
        title: 'Fiches-matières',
        moduleName: 'advance',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: 'chapitres',
        title: 'Chapitres&cours',
        moduleName: 'advance',
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
 

  {
    path: '',
    title: 'Configuration',
    moduleName: 'advanced',
    iconType: 'feather',
    icon: 'settings',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '',
        title: 'Niveaux',
        moduleName: 'advanced',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '',
        title: 'Types matières',
        moduleName: 'advanced',
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
 

];
