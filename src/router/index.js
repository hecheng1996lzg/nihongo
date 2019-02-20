import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Index = () => import('../components/index/index');
const Login = () => import('../components/login/login');
const Kana = () => import('../components/kana/kana');
const Word = () => import('../components/word/word');
const WordList = () => import('../components/word-list/word-list')


const vueRouter = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/kana',
      component: Kana,
    },
    {
      path: '/word',
      component: Word,
    },
    {
      path:'/word-list/:selectCourses',
      name:'word-list',
      component: WordList,
      props: true
    }
  ]
});

vueRouter.beforeResolve((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('nihongo'));
  if (!user && to.path !== '/login') {
    next('/login');
  } else if (user && to.path === '/login') {
    next(from.path);
  } else {
    next();
  }

});

export default vueRouter;