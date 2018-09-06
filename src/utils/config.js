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
    id: 'album',
    name: 'album页',
    path: '/album/:albumid',
    models: () => [
      import ('../models/album')
    ],
    component: () => import ('../routes/album/Album')
  },
  {
    id: 'albumList',
    name: 'albumList列表页面',
    path: '/album/list/:albumid/:index',
    models: () => [
      import ('../models/album')
    ],
    component: () => import ('../routes/album/AlbumList')
  }
];

export default {
  menuGlobal
}
