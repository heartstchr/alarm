(function() {
    'use strict';
    angular
        .module('alarmApp')
        .constant("ALARM_TYPE", {
            default:[
                {
                    id: 1,
                    name:' Work and Rest',
                    code: 'WR'
                },
                {
                    id: 2,
                    name: 'Kitchen Timer',
                    code: 'KT'
                }
            ]
        })
        .constant("ALARM_LIST", {
            default: [
                {
                    id: 1,
                    name:"Work and Rest",
                    work:30,
                    rest:10,
                    desc: "This is a shell for default list",
                    status: true,
                    deleted: true,
                },
                {
                    id: 2,
                    name:"Work andakjs Rest",
                    work:30,
                    rest:10,
                    desc: "This is a shell for default list",
                    status: false,
                    deleted: true,
                },
                {
                    id: 3,
                    name:"Work anafkcajsdd Rest",
                    work:30,
                    rest:10,
                    desc: "This is a shell for default list",
                    status: false,
                    deleted: true,
                },
                {
                    id: 4,
                    name:"Work andfasnafsk Rest",
                    work:30,
                    rest:10,
                    desc: "This is a shell for default list",
                    status: true,
                    deleted: false,
                },
                {
                    id: 5,
                    name:"Work and vasjkdRest",
                    work:30,
                    rest:10,
                    desc: "This is a shell for default list",
                    status: true,
                    deleted: false,
                }
            ]
        })
        .constant("MORE", {
            items: [
                {
                    id:1,
                    icon: 'public/images/favorite.svg',
                    name: 'Favorite',
                    desc: 'Like this'
                },
                {
                    id: 2,
                    icon: 'jlsad',
                    name:"Sign Out",
                    desc: "This is a shell for default list"
                }
            ]
        })


})();
