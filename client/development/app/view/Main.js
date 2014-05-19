Ext.define('FHSencha.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',

    requires: ['Ext.ux.TabMenuButton'],

    config: {
        //fullscreen: true,
        items: [{

            xtype: 'toolbar',
            height: '10%',
            title: "Multi-Pingdom",

            items: [{
                xtype: 'button',
                text: 'Logout',
                ui: 'decline',
                action: 'doLogout',
                id: 'logoutBtn',
                hidden: true,
                right: 10
            }, {
                xtype: 'button',
                text: 'back',
                ui: 'back',
                action: 'doBackPage',
                title: 'backs',
                id: 'backBtn',
                hidden: true
            }, {
                xtype: 'button',
                text: 'back',
                ui: 'back',
                action: 'doBackToLoginPage',
                id: 'backToLoginBtn',
                hidden: true
            }, {
                xclass: 'Ext.ux.TabMenuButton',
                hidden: true,
                right: 10,

                menuSide: 'right',
                id: 'menu',

                iconCls: 'more',
                menuItems: [{
                    text: 'About',
                    id: 'aboutId',
                    iconCls: 'info'
                }, {
                    text: 'Log Out',
                    hidden: false,
                    iconCls: 'exit',
                    id: 'logoutId'
                }]
            }]
        }, {
            xtype: 'viewContainer',
            height: '100%' // 100 was
        }]
    }
});