var GlobalIntervalId;
Ext.define('FHSencha.controller.CheckPage', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            checkPage: 'checkPage',
            checkPageView: 'checkPageView',
            checksList: 'list[id=checksList]',
            main: 'main',
            viewContainer: 'viewContainer',
            searchBar: 'searchfield[id=searchId]'
        },
        control: {
            'button[action=doBackPage]': {
                tap: 'doBackToAccounts'
            },
            checkPageView: {
                activeitemchange: "onTabpanelActiveItemChange"
            },
            searchBar: { //  the id or itemId we gave our searchfield  
                scope: this,
                clearicontap: "onSearchClearIconTap",
                keyup: "onSearchKeyUp"
            },
            checksList: {
                itemtouchstart: "startScrollWatch",
                itemtouchend: "stopScrollWatch"
            }

        }
    },

    startScrollWatch: function(me, index, target, record, e, eOpts) {

        GlobalIntervalId = setInterval(function() {
            var list = me;
            var scrollable = list.getScrollable()
            var scroller = scrollable.getScroller();

            console.log(scroller.position);

            var position = scroller.position;

            if (position.y < 0) {
                Ext.getCmp('searchToolbar').show()
            } else if (position.y > 0) {
                Ext.getCmp('searchToolbar').hide()
            }
        }, 200);
    },

    stopScrollWatch: function(me) {

        setTimeout(function() {
            clearInterval(GlobalIntervalId)
        }, 300);

    },
    onSearchKeyUp: function(field) {
        console.log(field);
        //get the store and the value of the field  
        var value = field.getValue(),
            store = Ext.getStore('Checks'); //  getting the store that drives the contact list  
        console.log("WWWWWWWWWW", value, store);
        //first clear any current filters on thes tore  
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything  
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all  
            var searches = value.split('&nsbp; '),
                regexps = [],
                i;

            //loop them all  
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue  
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive  
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method  
            //the passed method will be called for each record in the store  
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions  
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('name').match(search);
                    // ||
                    //    record.get('name').match(search);
                    //if it matched the first or last name, push it into the matches array   

                    matched.push(didMatch);

                } //if nothing was found, return false (dont so in the store)                 

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)  
                    return matched[0];
                }
            });
        }
    },

    doBackToAccounts: function() {
        console.log("do doBack");

        var viewContainer = this.getViewContainer();
        viewContainer.removeAll();
        var startPage = Ext.create('FHSencha.view.StartPage');

        viewContainer.setActiveItem(startPage);
        //Ext.getCmp('logoutBtn').show();
        Ext.getCmp('menu').show();
        Ext.getCmp('backBtn').hide();
        var sto = Ext.getStore('Checks');
        sto.clearFilter();
        //store.clearFilter();
    },
    /** 
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance  
        Ext.getCmp('checksList').getStore().clearFilter();
    },

    onTabpanelActiveItemChange: function(tabPanel, tab, oldTab) {

        console.log(tab.title);
        console.log(tab);


        if (!tab == 0) {
            if (!tab.title) {
                tab.title = tab.tab._title;
            }
        }
        //console.log("config title", tab.config.title);
        console.log("Tab title is now :: ", tab.title);

        if (tab.title === 'All') {
            //console.log('Alllll');
            var sto = Ext.getStore('Checks');
            //console.log(sto);
            // clear all existing filters
            sto.clearFilter();
            //sto.filter('status', 'up');
            sto.load();
            sto.getCount();
            console.log("STO.COUNT", sto.getCount());
        } else if (tab.title === 'Up') {
            //console.log('UPPppppp');
            var sto = Ext.getStore('Checks');
            //console.log(sto);
            // clear all existing filters
            sto.clearFilter();
            sto.filter('status', 'up');
            sto.load();
            sto.getCount();
            console.log("STO.COUNT", sto.getCount());
        } else if (tab.title === 'Down') {
            //console.log('Dooowwwn');
            var sto = Ext.getStore('Checks');
            //console.log(sto);
            // clear all existing filters
            sto.clearFilter();
            sto.filter('status', 'down');
            sto.load();
            sto.getCount();
            console.log("STO.COUNT", sto.getCount());
        } else if (tab.title === 'Paused') {
            //console.log('PPPAaaauseeedd');
            var sto = Ext.getStore('Checks');
            //console.log(sto);
            // clear all existing filters
            sto.clearFilter();
            sto.filter('status', 'paused');
            sto.load();
            sto.getCount();
            console.log("STO.COUNT", sto.getCount());
        }
    }

});