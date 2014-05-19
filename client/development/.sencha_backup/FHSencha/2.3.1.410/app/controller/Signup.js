Ext.define('FHSencha.controller.Signup', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      loginView: 'loginview',
      signupView: 'signupview',
      main: 'main',
      viewContainer: 'viewContainer'
    },
    control: {
      'button[action=doBackToLoginPage]': {
        tap: 'doBackToLogin'
      }
    }
  },

  doBackToLogin: function() {
    console.log("do doBack to login");

    var viewContainer = this.getViewContainer();
    viewContainer.removeAll();
    var loginView = Ext.create('FHSencha.view.Login');
    
    viewContainer.setActiveItem(loginView);
    // Ext.getCmp('logoutBtn').show();
     Ext.getCmp('backBtn').hide();
     Ext.getCmp('backToLoginBtn').hide();
  }

});