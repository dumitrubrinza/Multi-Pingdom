Ext.define('FHSencha.view.CheckPage', {
    extend: 'Ext.tab.Panel',
    xtype: 'checkPageView',
    //id: 'checkPageTab',
    requires: [
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.TabPanel',
        'FHSencha.store.Checks',
        'Ext.field.Search'
    ],
    config: {
        id: 'tabPanelTest',
        tabBarPosition: 'bottom',
        tabBar: {
            layout: {
                pack: 'center'
            }
        },
        //ui: 'dark', /// to be checked
        activeTab: 1,
        height: '90%', // to check later
        items: [{
            xtype: 'toolbar',
            id: 'searchToolbar',
            hidden: true,
            docked: 'top',
            items: [{
                xtype: 'searchfield',
                placeHolder: 'Search...',
                width: 300,
                centered: true,
                id: 'searchId'
            }]
        }, {
            title: 'All',
            iconCls: 'list',
            id: 'all',
            badgeText: null,
            items: [{
                xtype: 'list',
                store: 'Checks',
                id: 'checksList',
                height: '96%',
                itemTpl: '<ul class="arrange2"><li><img src="resources/img/{status}.png" width="25" heigh="25"></img></li><li>{name} </li></ul>'
                //itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>'
                //itemTpl: '<ul class="arrange"><li>{name}</li> <li>T={numChecks}, </li> <li>{checksUp}</li> <li><img src="resources/img/up.png" width="25" heigh="25"></img>,</li> <li>{checksDown}</li> <li><img src="resources/img/down.jpg" width="25" heigh="25"></img></li>, <li>{checksPaused}</li> <li><img src="resources/img/paused.png" width="25" heigh="25"></img></li> </ul> '
            }]
        }, {
            title: 'Up',
            id: 'up',
            iconCls: 'arrow_up',
            badgeText: null,
            //html: 'Up Screen',
            items: [{
                xtype: 'list',
                store: 'Checks',
                id: 'checksList2',
                height: '96%',
                itemTpl: '<ul class="arrange2"><li> <img src="resources/img/{status}.png" width="25" heigh="25"></img></li><li>{name} </li></ul>'

            }]
        }, {
            title: 'Down',
            id: 'down',
            iconCls: 'arrow_down',
            //html: 'Down Screen',
            items: [{
                xtype: 'list',
                store: 'Checks',
                id: 'checksList3',
                height: '96%',
                itemTpl: '<ul class="arrange2"><li> <img src="resources/img/{status}.png" width="25" heigh="25"></img> </li><li>{name} </li></ul>'
            }]
        }, {
            title: 'Paused',
            id: 'paused',
            iconCls: 'pause',
            //html: 'Paused Screen',
            items: [{
                xtype: 'list',
                store: 'Checks',
                id: 'checksList4',
                //id: 'checksList',
                height: '96%',
                itemTpl: '<ul class="arrange2"><li>  <img src="resources/img/{status}.png" width="25" heigh="25"></img> </li><li>{name} </li></ul>'

            }]
        }]
    }

});