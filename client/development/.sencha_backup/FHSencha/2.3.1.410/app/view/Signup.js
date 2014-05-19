Ext.define('FHSencha.view.Signup', {
    extend: 'Ext.form.Panel',
    xtype: "signupview",
    requires: ['Ext.form.FieldSet','Ext.field.Email', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
    config: {
        title: 'Signup',
        height:"100%",
        items: [
            
            {    
                xtype: 'image',
                src: 'resources/img/sign-up.png', 
                style: 'width:120px;height:120px;margin:auto'   
            },
            {
                xtype: 'label',
                html: 'Signup failed. Please enter the correct credentials.',
                itemId: 'signUpFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
            {
                xtype: 'fieldset',
                title: 'Sign up here',
                instructions: 'Tell us all about yourself',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'First Name',
                        itemId: 'firstNameTextField',
                        name: 'firstNameTextField',
                        required: true,
                        border: 1,
                        style: 'border-color: grey; border-style: solid;'
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'Last Name',
                        itemId: 'lastNameTextField',
                        name: 'lastNameTextField',
                        required: true,
                        border: 1,
                        style: 'border-color: grey; border-style: solid;'
                    },
                    {
                        xtype: 'emailfield',
                        placeHolder: 'Email address',
                        itemId: 'emailTextField',
                        name: 'emailTextField',
                        required: true,
                        border: 1,
                        style: 'border-color: grey; border-style: solid;'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
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
                action: 'onSignupPressed',
                padding: '10px',
                text: 'Sign Up'
            }
         ]
       }
 });

