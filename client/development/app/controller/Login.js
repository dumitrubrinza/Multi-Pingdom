var COOKIE = '';
Ext.define('FHSencha.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            startPage: 'startPage',
            requestView: 'requestview',
            main: 'main',
            viewContainer: 'viewContainer',

            label: 'label[id=signInFailedLabel]',
            userNameField: 'textfield[id=userNameTextField]',
            passwordTextField: 'textfield[id=passwordTextField]'
        },
        control: {
            'button[action=onLoginPressed]': {
                tap: 'myFunction'
            },
            'button[action=doLogout]': {
                tap: 'doLogout'
            },
            'button[action=onSignupPressed]': {
                tap: 'doToSignPage'
            }
        }
    },
    // *******************************************************************************************************************************************
    myFunction: function() {

        var viewContainer = this.getViewContainer();
        ////    // # Click Login
        // # Get value from username field
        // # Get Value from password field
        // # Create Object to send to cloud
        //Send this Object to the cloud for auth
        //Cloud to return if user is auth or not
        //If user is auth login
        //If not show error and decline login
        ////
        var label = this.getLabel();
        var userNameField = this.getUserNameField().getValue();
        var passwordTextField = this.getPasswordTextField().getValue();
        label.hide();
        if ((userNameField === '') | (passwordTextField === '')) {
            Ext.getCmp('signInFailedLabel').show();
            Ext.getCmp('signInFailedLabel').setHtml("Please enter Email and Password");
        } else {

            username = userNameField;
            password = passwordTextField;

            $fh.hash({
                algorithm: "SHA1",
                text: password
            }, function(result) {
                console.log("Hash value is : " + result.hashvalue);
                return hashedPassword = result.hashvalue;
            });
            console.log(password);
            console.log(hashedPassword);

            //console.log(username);
            //console.log(password);

            var loginData = {
                username: username,
                password: hashedPassword
            };
            console.log(loginData);

            $fh.act({
                "act": "execLogin",
                // my cloud function name to call
                "req": loginData,
                "timeout": 25000
            }, function(res) {
                // Cloud call was successful. Alert the response
                console.log("res.succ " + res.success);
                console.log("res.msg " + res.msg);
                //console.log("res.userID " + res.userId);
                COOKIE = res.userId;
                console.log("USerCookie  " + COOKIE);

                if (res.success === true) {

                    var startPage = Ext.create('FHSencha.view.StartPage');
                    viewContainer.removeAll();
                    viewContainer.setActiveItem(startPage);

                    Ext.getCmp('menu').show(); //     ///////////////// to be added everywhere //////////
                } else {
                    viewContainer.removeAll();

                    var loginView = Ext.create('FHSencha.view.Login');
                    viewContainer.setActiveItem(loginView);

                    Ext.getCmp('signInFailedLabel').show();
                    Ext.getCmp('signInFailedLabel').setHtml(res.msg);
                    Ext.getCmp('menu').hide();

                }
            }, function(msg, err) {
                // An error occured during the cloud call. Alert some debugging information
                console.log(msg, err);
                var startPage = Ext.create('FHSencha.view.Request');
                viewContainer.removeAll();
                viewContainer.setActiveItem(startPage);
                //Ext.getCmp('logoutBtn').show();
                Ext.getCmp('menu').show();

            });

        }
    },
    // *******************************************************************************************************************************************
    // doLogout: function() {
    //     var viewContainer = this.getViewContainer();
    //     viewContainer.removeAll();

    //     var loginView = Ext.create('FHSencha.view.Login');
    //     viewContainer.setActiveItem(loginView);

    //     //Ext.getCmp('logoutBtn').hide();
    //     Ext.getCmp('backBtn').hide();
    //     Ext.getCmp('backToLoginBtn').hide();
    //     //Ext.getContainer()
    //     COOKIE = '';
    // },
    // *******************************************************************************************************************************************
    doToSignPage: function() {
        var viewContainer = this.getViewContainer();
        viewContainer.removeAll();
        var signupView = Ext.create('FHSencha.view.Request');

        viewContainer.setActiveItem(signupView);
        Ext.getCmp('backToLoginBtn').show();
    }

});