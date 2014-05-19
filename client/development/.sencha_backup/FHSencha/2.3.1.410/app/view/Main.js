Ext.define('FHSencha.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        items: [
        {
            xtype:'toolbar',
            title:"WebPing",
            items:[
            // {
            //     xtype:'spacer'
            // },
            {
                xtype:'button',
                text:'Logout',
                ui:'decline',
                action:'doLogout',
                id:'logoutBtn',
                hidden:true,
                right: 10
            },
            {
                xtype:'button',
                text:'back',
                ui:'back',
                action:'doBackPage',
                id:'backBtn',
                hidden:true
            },
             {
                xtype:'button',
                text:'back',
                ui:'back',
                action:'doBackToLoginPage',
                id:'backToLoginBtn',
                hidden:true
            }
            ]},
        {
            xtype:'viewContainer',
            height:'100%'
        }
        ]
    }
});
