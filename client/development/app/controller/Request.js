Ext.define('FHSencha.controller.Request', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            startPage: 'startPage',
            requestView: 'requestview',
            main: 'main',
            viewContainer: 'viewContainer',

            label: 'label[id=requestFailedLabel]', // to implement

            emailRequestTextField: 'textfield[id=emailRequestTextField]',
            textField: 'textfield[id=TextField]'
        },
        control: {
            'button[action=doBackToLoginPage]': {
                tap: 'doBackToLogin'
            },
            'button[action=onRequestPressed]': {
                tap: 'doRequestion'
            }
        }
    },
doRequestion: function() {
        console.log("do request");
        var me = this;
        var emailRequestTextField = this.getEmailRequestTextField().getValue();
        var textField = this.getTextField().getValue();
        console.log(emailRequestTextField + " + " + textField);
        // -----
        function validateEmail(email) { 
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }
        function validateMessage(message) { 
            var re = /<|>/ ;
          return re.test(message);
        }
        // if((validateMessage(textField) != true) || (textField != '')){
        //     console.log("Message -> TRUE");
        // }else{
        //     console.log("Message -> FALSE");
        // } 
        // if(validateEmail(emailRequestTextField) === true){
        //     console.log("Reg.exp -> TRUE");
        // }else{
        //     console.log("Reg.exp -> FALSE");
        // }
       // =------
        if (validateEmail(emailRequestTextField) != true) {  // (textField === ''))
            Ext.getCmp('requestFailedLabel').show();
            Ext.getCmp('requestFailedLabel').setHtml("Please enter a valid email address");
        }else if ((textField === '') || (validateMessage(textField) === true)) {     
            Ext.getCmp('requestFailedLabel').show();
            Ext.getCmp('requestFailedLabel').setHtml("Please enter message text, no '< >'");
        }else{
            var reqData = {
                emailReq: emailRequestTextField,
                message: textField
            };
            Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Sending Email ...'
            });
            console.log("reqData", reqData);
            $fh.act({
                    "act": "mailer", // "sendgrid",
                    // my cloud function name to call
                    "req": reqData,
                    "timeout": 25000
                }, function(res) {
                    Ext.Msg.alert('Success', 'Message send successfully. Please wait response from the admin.', Ext.emptyFn);
                    //console.log("res.succ " + res.success);
                    //console.log("res.msg " + res.msg);
                    console.log("res.succ " + res.success);
                    console.log("res.msg " + res.msg);
                    var viewContainer = me.getViewContainer();
                    viewContainer.removeAll();
                    var loginView = Ext.create('FHSencha.view.Login');
                    viewContainer.setActiveItem(loginView);
                    Ext.getCmp('logoutBtn').hide();
                    Ext.getCmp('backBtn').hide();
                    Ext.getCmp('backToLoginBtn').hide();
                    Ext.Viewport.setMasked(false);
                },
                function(msg, err) {
                    // An error occured during the cloud call. Alert some debugging information
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Error Sending Mail', 'Please try again later.', Ext.emptyFn);


                });
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
    },

    doSignUp: function() {
        // ///////////////////////////////////////////////
        console.log("sing up pressed");
        var label = this.getLabel();
        var firstNameField = this.getFirstNameField().getValue();
        var lastNameField = this.getLastNameField().getValue();
        var emailField = this.getEmailField().getValue();
        var passwordField = this.getPasswordField().getValue();
        var me = this;
        label.hide();

        console.log(firstNameField, lastNameField, emailField, passwordField);
        if ((firstNameField === '') | (lastNameField === '') | (emailField === '') | (passwordField === '')) {
            Ext.getCmp('signUpFailedLabel').show();
            Ext.getCmp('signUpFailedLabel').setHtml("Signup failed. Please complete all fields.");
        } else {
            var signupData = {
                firstname: firstNameField,
                lastname: lastNameField,
                email: emailField,
                password: passwordField
            };
            console.log(signupData);
            // ///////////////////////////////////////////////
            $fh.act({
                    "act": "execCreate",
                    // my cloud function name to call
                    "req": {
                        dbData: signupData
                    },
                    "timeout": 25000
                }, function(res) {
                    // Cloud call was successful. Alert the response
                    console.log("respose fh.db - " + res.success);

                    if (res.success === true) {
                        var viewContainer = me.getViewContainer();
                        viewContainer.removeAll();
                        var loginView = Ext.create('FHSencha.view.Login');
                        viewContainer.setActiveItem(loginView);
                        Ext.getCmp('backBtn').hide();
                        Ext.getCmp('backToLoginBtn').hide();
                        Ext.getCmp('menu').show();

                    }
                },

                function(msg, err) {
                    // An error occured during the cloud call. Alert some debugging information
                    var startPage = Ext.create('FHSencha.view.Request');
                    viewContainer.removeAll();
                    viewContainer.setActiveItem(startPage);
                    Ext.getCmp('menu').show();
                });
        }
    }
});