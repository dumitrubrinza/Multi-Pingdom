Ext.define('FHSencha.store.Checks', {

    extend: 'Ext.data.Store',

    requires: ['FHSencha.model.Checks'],

    config: {
        id: 'ChecksStore',
        model: 'FHSencha.model.Checks',
        autoLoad: true

    }

});

// Clean the store
// var store = Ext.getStore('SessionStore');
//         store.load();
//         store.getProxy().clear();
//         store.data.clear();
//         store.sync();