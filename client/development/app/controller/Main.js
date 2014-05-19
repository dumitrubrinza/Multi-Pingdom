Ext.define('FHSencha.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            startPage: 'startPage',
            requestView: 'requestview',
            main: 'main',
            viewContainer: 'viewContainer'
        },
        control: {
            'button[id=logoutId]': {
                tap: 'doLogOut'
            },
            'button[id=aboutId]': {
                tap: 'doAbout'
            }
        }
    },

    doLogOut: function() {
        console.log("loooooogiinnnngg ouuuut");
        var viewContainer = this.getViewContainer();
        viewContainer.removeAll();
        var loginView = Ext.create('FHSencha.view.Login');
        viewContainer.setActiveItem(loginView);
        Ext.getCmp('backBtn').hide();
        Ext.getCmp('backToLoginBtn').hide();
        Ext.getCmp('menu').setText();
        Ext.getCmp('menu').setIconCls('more');
        Ext.getCmp('menu').hide();
        var sto = Ext.getStore('Checks');
        sto.clearFilter();
        COOKIE = '';
    },

    doAbout: function() {
        console.log("About view page here");
        Ext.Msg.alert(
            'About',
            'The main aim of this project is to develop an enhanced version of an existing mobile app for the popular, cloud-based monitoring tool, Pingdom, so that companies who use multiple Pingdom accounts can access the data from each account from a single app, something which the current Pingdom mobile app does not support. '
        );

        Ext.getCmp('menu').setText();
        Ext.getCmp('menu').setIconCls('more');

        // function hide_message() {
        //     Ext.defer(function() {
        //         Ext.Msg.hide();
        //     }, 5000);
        // }
        // hide_message();


    }
});