Ext.define('FHSencha.view.CheckPage', {
    extend: 'Ext.TabPanel',
    //id: "testID",
    requires: [
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.tab.Panel'
    ],
    config: {

        tabBarPosition: 'bottom',
        tabBar: {
            layout: {
                pack: 'center'
            }
        },
        ui: 'dark',
        activeTab: 1,
        height: 500,
        //defaultType: 'optimized-tab',
        //fullscreen: true,
        items: [
            {
                title: 'All',
                //ui: 'round',
                iconCls: 'list',
                badgeText: '4',
                items: [{
                    xtype: 'list',
                    id: 'checksList',
                    height: 500,
                    itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>',
                }]
            },
            {
                title: 'Up',
                //ui: 'round',
                iconCls: 'arrow_up',
                html: 'Up Screen'
                // items: [{
                //     xtype: 'list',
                //     id: 'checksList',
                //     height: 500,
                //     itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>',
                // }]
            },
            {
                title: 'Down',
                //ui: 'round',
                iconCls: 'arrow_down',
                html: 'Down Screen'
                // items: [{
                //     xtype: 'list',
                //     id: 'checksList',
                //     height: 500,
                //     itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>',
                // }]
            },
            {
                title: 'Paused',
                //xtype: 'button',
                iconCls: '5',
                html: 'Paused Screen'
                // items: [{
                //     xtype: 'list',
                //     id: 'checksList',
                //     height: 500,
                //     itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>',
                // }]
            }
        ]
    }

    // requires: [
    //     'Ext.dataview.List'
    // ],
    // config: {
    //     items: [{
    //         xtype: 'spacer',
    //         height: '30px'
    //     }, {
    //         xtype: 'panel',
    //         padding: 20,
    //         items: [{
    //             xtype: 'list',
    //             id: 'checksList',
    //             height: 500,
    //             itemTpl: '<div> <img src="resources/img/{status}.png" width="25" heigh="25"></img> Host : {hostname} </div>',

    //         }]
    //     }]
    // }
});