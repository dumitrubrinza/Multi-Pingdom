Ext.define('FHSencha.controller.CheckPage', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      checkPage: 'checkPage',
      checksList: 'list[id=checksList]',
      main: 'main',
      viewContainer: 'viewContainer'
    },
    control: {
      'button[action=doBackPage]': {
        tap: 'doBackToAccounts'
      }
    }
  },

  doBackToAccounts: function() {
    console.log("do doBack");

    var viewContainer = this.getViewContainer();
    viewContainer.removeAll();
    var startPage = Ext.create('FHSencha.view.StartPage');
    
    viewContainer.setActiveItem(startPage);
    Ext.getCmp('logoutBtn').show();
    Ext.getCmp('backBtn').hide();
  }

});