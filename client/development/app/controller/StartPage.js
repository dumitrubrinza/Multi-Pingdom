Ext.define('FHSencha.controller.StartPage', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            checkPage: 'checkPage',
            startPage: 'startPage',
            main: 'main',
            viewContainer: 'viewContainer',
            getAccsBtn: 'button[id=getAccsBtn]',
            checkList: 'list[id=checkList]',

            navigation: 'navigation',
            navBtn: 'button[name="nav_btn"]'
        },
        control: {
            getAccsBtn: {
                tap: 'doChecksAccounts'
            },
            checkList: {
                itemtap: 'doSpecChecks'
            },
            startPage: {
                activate: 'doChecksAccounts'
            }
        }
    },

    doChecksAccounts: function() {
        console.log('doChecksAccounts firing!!');
        console.log(COOKIE);
        var me = this;
        var Coo = {
            cookie: COOKIE
        };
        console.log("Coo " + Coo.cookie)
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading accounts'
        });

        $fh.act({
            "act": "getAccounts",
            "req": Coo,
            "timeout": 25000
        }, function(res) {
            console.log(res);
            Ext.getCmp('checkList').setData(res.cloudRes);
            Ext.Viewport.setMasked(false);
        }, function(msg, err) {
            // An error occured during the cloud call. Alert some debugging information
            console.log(msg, err);
            Ext.Viewport.setMasked(false);

            var ret = Ext.JSON.decode(err.error);
            Ext.Msg.alert('ERROR', ret.msg, Ext.emptyFn);

            var viewContainer = me.getViewContainer();
            viewContainer.removeAll();
            var startPage = Ext.create('FHSencha.view.StartPage');
            viewContainer.removeAll();
            viewContainer.setActiveItem(startPage);

            Ext.getCmp('menu').show(); // 

        });
    },

    doSpecChecks: function(list, index, item, record) {
        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading checks'
        });
        $fh.act({
            "act": "getChecks",
            "req": {
                checkId: record.data.id,
                cookie: COOKIE
            },
            "timeout": 25000
        }, function(res) {
            console.log("RES", res);
            console.log("RES.CloudRes", res.cloudRes);
            Ext.getStore('Checks').setData(res.cloudRes);
            Ext.Viewport.setMasked(false);

            if (res.success === true) {

                var viewContainer = me.getViewContainer();
                viewContainer.removeAll();
                var checkPage = Ext.create('FHSencha.view.CheckPage');
                viewContainer.setActiveItem(checkPage);
                Ext.getCmp('all').tab.setBadgeText(res.allChecks);
                Ext.getCmp('up').tab.setBadgeText(res.upChecks);
                Ext.getCmp('down').tab.setBadgeText(res.downChecks);
                Ext.getCmp('paused').tab.setBadgeText(res.pausedChecks);

                Ext.getCmp('backBtn').show();

            } else {
                Ext.Msg.alert('ERROR 2', 'Cloud response error.', Ext.emptyFn);
            }

        }, function(msg, err) {
            // An error occured during the cloud call. Alert some debugging information
            console.log(msg, err);
            Ext.Viewport.setMasked(false);
        });

        console.log("doSpecChecks " + record.getFields());
        console.log("doSpecChecks " + record.get('id'));
        console.log(list, index, item, record);

    }

});