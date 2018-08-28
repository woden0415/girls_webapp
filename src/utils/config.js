const menuGlobal = [
  {
    id: 'index',
    name: 'index页',
    path: '/',
    models: ()=>[
      import ('../models/home')
    ],
    component: ()=>
      import ('../routes/home/Home')
  },
  {
    id:'home',
    pid:'5',
    name:'home页',
    path: '/home',
    models: ()=>[
      import ('../models/home')
    ],
    component: ()=>
      import ('../routes/home/Home')

  },
  {
    id:'aaa',
    name:'aaa页',
    path: '/aaa',
    models: () => [
      import ('../models/aaa')
    ],
    component: () =>
      import ('../routes/AAA'),
  },
  {
    id: 'album',
    name: 'album页',
    path: '/album/:albumid',
    // path: '/album',
    models: () => [
      import ('../models/album')
    ],
    component: () => import ('../routes/album/Album')
  }
];

export default {
  menuGlobal
}
