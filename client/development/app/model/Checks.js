Ext.define('FHSencha.model.Checks', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
                name: 'name',
                type: 'string'
            }, {
                name: 'hostname',
                type: 'string'
            }, {
                name: 'status',
                type: 'string'
            }, {
                name: 'type',
                type: 'string'
            }

        ]
    }
});