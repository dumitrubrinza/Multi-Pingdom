Ext.define('FHSencha.view.Request', {
    extend: 'Ext.form.Panel',
    xtype: 'requestview',
    requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask'],
    config: {
        title: 'Request',
        height: "90%",
        items: [{
            xtype: 'spacer',
            height: '5px'
            },
            {
                xtype: 'image',
                src: 'resources/img/request.png',
                style: 'width:120px;height:120px;margin:auto'
            }, {
                xtype: 'label',
                id: 'requestFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 15px;'
            }, {
                xtype: 'fieldset',
                title: 'Request an account form',
                items: [{
                    xtype: 'emailfield',
                    placeHolder: 'your Email address',
                    id: 'emailRequestTextField',
                    name: 'emailTextField',
                    required: true,
                    border: 1,
                    style: 'border-color: grey; border-style: solid;'
                }]
            }, {
                xtype: 'fieldset',
                items: [{
                    xtype: 'textareafield',
                    placeHolder: 'Message',
                    id: 'TextField',
                    name: 'bio',
                    required: true,
                    border: 1,
                    style: 'border-color: grey; border-style: solid;'
                }]
            }, {
                xtype: 'button',
                id: 'requestButton',
                action: 'onRequestPressed',
                padding: '10px',
                text: 'Send'
            }
        ]
    }
});