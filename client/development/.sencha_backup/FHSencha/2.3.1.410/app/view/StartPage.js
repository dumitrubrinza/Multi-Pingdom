Ext.define('FHSencha.view.StartPage', {
    extend: 'Ext.Panel',
    xtype: 'startPage',
    id: "testID",
    requires: [
        'Ext.dataview.List'
    ],
    config: {
        items: [{
            xtype: 'spacer',
            height: '30px'
        }, {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [{
                xtype: 'button',
                text: 'Get Accounts',
                id: 'getAccsBtn',
                ui: 'confirm',
                width: '80%'
            }]
        }, {
            xtype: 'panel',
            padding: 20,
            items: [{
                xtype: 'list',
                id: 'checkList',
                height: 500,
                itemTpl: '<div>{name} T={numChecks}, {checksUp} <img src="resources/img/up.png" width="25" heigh="25"></img>, {checksDown} <img src="resources/img/down.jpg" width="25" heigh="25"></img>, {checksPaused} <img src="resources/img/paused.png" width="25" heigh="25"></img>  | <img src="resources/img/lock.png" width="35" heigh="35"></img></div>',
                
            }]
        }]
    }
});