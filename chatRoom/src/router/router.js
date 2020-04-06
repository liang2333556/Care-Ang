import Vue from 'vue';
import Router from 'vue-router';
import _import from './_import';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: _import('login')
        },
        {
            path: '/main',
            name: 'main',
            component: _import('main'),
            redirect: 'main/personalMain',
            children: [
              {
                path:'searchweather',
                name:'searchweather',
                component:_import('searchweather'),
              },
                {
                    path: 'personalMain',
                    name: 'personalMain',
                    component: _import('personalMain'),
                    redirect: 'personalMain/friendly',
                    children: [
                        {
                            path: 'group',
                            name: 'group',
                            component: _import('personalModel/group'),
                            redirect: 'group/own',
                            children: [
                                {
                                    path: 'set',
                                    name: 'setGroup',
                                    component: _import('personalModel/groupModel/setGroup')
                                },
                                {
                                    path: 'own',
                                    name: 'ownGroup',
                                    component: _import('personalModel/groupModel/ownGroup')
                                },
                                {
                                    path: 'search',
                                    name: 'searchGroup',
                                    component: _import('personalModel/groupModel/searchGroup')
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'groupDetail',
                                    component: _import('personalModel/groupModel/groupDetail')
                                },
                                {
                                    path: 'apply/:id',
                                    name: 'applyGroup',
                                    component: _import('personalModel/groupModel/applyGroup')
                                },
                                {
                                    path: 'send',
                                    name: 'sendGroupValidate',
                                    component: _import('personalModel/sendValidateSuccess')
                                }
                            ]
                        },
                        {
                            path: 'friendly',
                            name: 'friendly',
                            component: _import('personalModel/friendly'),
                            redirect: 'friendly/own',
                            children: [
                                {
                                    path: 'own',
                                    name: 'ownFriend',
                                    component: _import('personalModel/friendModel/myFriend')
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'friendDetail',
                                    component: _import('personalModel/friendModel/friendDetail')
                                },
                                {
                                    path: 'apply',
                                    name: 'applyFriend',
                                    component: _import('personalModel/friendModel/applyFriend')
                                },
                                {
                                    path: 'search',
                                    name: 'searchFriend',
                                    component: _import('personalModel/friendModel/searchFriend')
                                },
                                {
                                    path: 'send',
                                    name: 'sendFriendValidate',
                                    component: _import('personalModel/sendValidateSuccess')
                                },
                                {
                                    path: 'wall/:id',
                                    name: 'photoWall',
                                    component: _import('personalModel/friendModel/photoWall')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'application',
                    name: 'application',
                    component: _import('application'),
                    redirect: 'application/space',
                    meta: {
                        title: 'Application',
                        name: 'appSpace'
                    },
                    children: [
                        {
                            path: 'space',
                            name: 'appSpace',
                            component: _import('applicationModel/appSpace'),
                        },
                        {
                            path: 'jokes',
                            name: 'Jokes',
                            component: _import('/jokes'),
                            meta: {
                                title: 'Jokes',
                                name: 'Jokes'
                            }
                        },
                      {
                        path: 'musicplay',
                        name: 'musicplay',
                        component: _import('applicationModel/musicplay'),
                        meta: {
                          title: 'musicplay',
                          name: 'musicplay'
                        }
                      },    {
                               path: 'search/:query',
                               name: 'search',
                               component:  _import('applicationModel/Search'),
                        meta: {
                          title: 'search',
                          name: 'search'
                        }
                      },
                        {
                            path: 'videoGallery',
                            name: 'videoGallery',
                            component: _import('applicationModel/videoGallery'),
                            meta: {
                                title: 'Watch movie',
                                name: 'videoGallery'
                            }
                        },
                      {
                        path: 'Movie',
                        name: 'Movie',
                        component: _import('applicationModel/Movie/Movie'),
                        meta: {
                          title: 'Movie',
                          name: 'Movie'
                        }
                      },
                      {
                        path: '/Pelicula/:id',
                        name: 'Pelicula',
                        component: _import('applicationModel/Movie/Pelicula'),
                        meta: {
                          title: 'Pelicula',
                          name: 'Pelicula'
                        }
                      },
                        {
                            path: 'games',
                            name: 'games',
                            component: _import('applicationModel/games'),
                            meta: {
                                title: 'Play games',
                                name: 'games'
                            }
                        },
                        {
                            path: 'news',
                            name: 'news',
                            component: _import('applicationModel/news'),
                            meta: {
                                title: 'Watch news',
                                name: 'news'
                            }
                        },
                      {
                        path: 'NewsVue',
                        name: 'NewsVue',
                        component: _import('applicationModel/NewsVue'),
                        meta: {
                          title: 'NewsVue',
                          name: 'NewsVue'
                        }
                      },      {
                        path: 'TopNews',
                        name: 'TopNews',
                        component: _import('applicationModel/TopNews'),
                        meta: {
                          title: 'TopNews',
                          name: 'TopNews'
                        }
                      },
                        {
                            path: 'newsDetailSub',
                            name: 'newsDetail',
                            component: _import('applicationModel/newsDetail'),
                            meta: {
                                title: 'News detail',
                                name: 'newsDetail'
                            }
                        },
                        {
                            path: '2048Sub',
                            name: 'h2048',
                            component: _import('applicationModel/games/HTML5_2048/2048'),
                            meta: {
                                title: '2048',
                                name: 'h2048'
                            }
                        },
                        {
                            path: 'txzSub',
                            name: 'txz',
                            component: _import('applicationModel/games/txz/txz'),
                            meta: {
                                title: 'Sokoban',
                                name: 'txz'
                            }
                        }
                    ]
                },

            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: _import('mine')
        },
        {
            path: '/todo',
            name: 'todo',
            component: _import('todo')
        },
        {
            path: '/mySetting',
            name: 'mySetting',
            component: _import('mySetting'),
            redirect: 'mySetting/means',
            children: [
                {
                    path: 'means',
                    name: 'means',
                    component: _import('settingModel/means')
                },
                {
                    path: 'theme',
                    name: 'theme',
                    component: _import('settingModel/theme')
                }
            ]
        },
        {
            path: '*',
            component: _import('notFound'),
        }
    ]
})
