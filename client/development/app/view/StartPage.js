Ext.define('FHSencha.view.StartPage', {
    extend: 'Ext.Panel',
    xtype: 'startPage',
    id: "testID",
    requires: [
        'Ext.dataview.List',
        'FHSencha.store.Checks'
    ],
    config: {

        items: [{
            xtype: 'spacer',
            height: '30px'
        }, {
            xtype: 'panel',
            height: '90%',

            layout: {
                type: 'vbox',
                align: 'middle'
            },
            items: [{
                xtype: 'button',
                text: 'Refresh',
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
                onItemDisclosure: true,
                height: '400px',
                itemTpl: '<ul class="arrange1"><li>{name}</li> <li class="total">T={numChecks}</li></ul><ul class="arrange2"> <li>{checksUp}</li> <li><img src="resources/img/up.png" ></img> </li> <li>{checksDown}</li> <li><img src="resources/img/down.jpg" ></img></li> <li>{checksPaused}</li> <li><img src="resources/img/paused.png" ></img></li> </ul> '

            }]
        }]
    }
});