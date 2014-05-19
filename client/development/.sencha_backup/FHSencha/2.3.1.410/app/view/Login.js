Ext.define('FHSencha.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: "loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
    config: {
        title: 'Login',
        height:"100%",
        items: [
            {
                xtype:'spacer',
                height:'10px'
            },
            { 
                xtype: 'image',
                src: 'resources/img/lock.png',
                style: 'width:130px;height:130px;margin:auto'  
            },
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                id: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:10px 30px;'
            },
            {
                xtype: 'fieldset',
                title: 'Login',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        id: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true,
                        border: 1,
                        style: 'border-color: grey; border-style: solid;'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        id: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true,
                        border: 1,
                        style: 'border-color: grey; border-style: solid;'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                action: 'onLoginPressed',
                padding: '10px',
                text: 'Log In'
            },
            {
                xtype:'spacer',
                height:'10px'
            },
            {
                xtype: 'button',
                //itemId: 'signupButton',
                action: 'onSignupPressed',
                padding: '10px',
                text: 'Sign up'
            }
         ]
       }
 });

