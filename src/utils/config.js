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
    pid:'1',
    name:'aaa页',
    path: '/aaa',
    models: () => [
      import ('../models/aaa')
    ],
    component: () =>
      import ('../routes/AAA'),
  }
];

export default {
  menuGlobal
}
