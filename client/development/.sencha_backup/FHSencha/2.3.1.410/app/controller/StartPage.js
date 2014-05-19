Ext.define('FHSencha.controller.StartPage', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      checkPage: 'checkPage',
      main: 'main',
      viewContainer: 'viewContainer',
      getAccsBtn: 'button[id=getAccsBtn]',
      checkList: 'list[id=checkList]'
    },
    control: {
      getAccsBtn: {
        tap: 'doChecksAccounts'
      },
      checkList: {
        itemtap: 'doSpecChecks'
      }
    }
  },

  doChecksAccounts: function() {
    console.log('doChecksAccounts firing!!');

    $fh.act({
      "act": "getAccounts"
    }, function(res) {
      console.log(res);
      Ext.getCmp('checkList').setData(res.cloudRes);
    }, function(msg, err) {
      // An error occured during the cloud call. Alert some debugging information
      console.log(msg, err);
    });
  },

  doSpecChecks: function(list, index, item, record) {

    $fh.act({
      "act": "getChecks",
      "req": {checkId:record.data.id}
    }, function(res) {
      console.log(res);
      Ext.getCmp('checksList').setData(res.cloudRes);
    }, function(msg, err) {
      // An error occured during the cloud call. Alert some debugging information
      console.log(msg, err);
    });

    console.log("doSpecChecks " + record.getFields());
    console.log("doSpecChecks " + record.get('id'));
    console.log(list, index, item, record);
    
    var viewContainer = this.getViewContainer();
    viewContainer.removeAll();
    var checkPage = Ext.create('FHSencha.view.CheckPage');
    //viewContainer.removeAll();
    viewContainer.setActiveItem(checkPage);
    Ext.getCmp('logoutBtn').hide();
    Ext.getCmp('backBtn').show();
  }

});