// The code in this file controls the UI functionality
var app = {
    cite: '',
    style: '',
    form: '',

    init: function() {
        //citation select
        document.querySelectorAll('#cite-select select').forEach(function(select){
            select.addEventListener('change', function(e){
                app.cite = e.target.value;

                app.loadForm();
                c.readCookie();

                // set url
                app.setURL();

                // analytics
                app.logAnalytics();
            })
        })

        // citation style select
        document.querySelectorAll('#cite-style-select select').forEach(function(select){
            select.addEventListener('change', function(e){
                app.style = e.target.value;
                app.loadForm();
                c.readCookie();

                // set URL
                app.setURL();

                // analytics
                app.logAnalytics();
            })

        })

        app.setFormTypeFromUrl();
        app.checkFormOnLoad();
        app.activateCitationButtons();
        app.getCitation();
        app.handleCitationFields();
        app.handleDatePicker();

    },

    // read hash to pre-setup form
    checkFormOnLoad: function() {
        if (!app.cite) {
            app.cite = document.querySelector('#cite-select select').value;
        }
        if (!app.style) {
            app.style = document.querySelector('#cite-style-select select').value;
        }
        app.loadForm();
    },

    // this app is a bunch of html files. select determines which ones we should load
    loadForm: function() {
        // start off by hiding all forms
        document.querySelectorAll('.form-parent').forEach(function(parent){
            parent.style.display = 'none';
        })
        document.querySelectorAll('.form-child').forEach(function(child){
            child.style.display = 'none';
        })

        // show selected form
        if(document.getElementById(app.cite)){
            document.getElementById(app.cite).style.display = "block";
        }
        document.querySelectorAll('.'+app.style).forEach(function(styleForm){
            styleForm.style.display = "block";
        })

        app.form = '#' + app.cite + ' .' + app.style;
        app.activateCitationButtons();
        app.getCitation();
        app.handleCitationFields();
        app.handleDatePicker();
        app.initClearFormButtons();
    },

    /**
     * activate clear form button 
     * */ 
    initClearFormButtons: function() {
        // init clear form button
        document.querySelectorAll('form.citation-form[data-csl="' + app.style + '"] .clear-form-button').forEach(function(form){
            form.addEventListener('click', function(e){
                c.string = [];
                c.writeToCookie();
                
                // hide citation box
                citations = document.querySelectorAll('.citation-box');
                for(i=0;i<citations.length;i++){
                    citations[i].style.display = "";
                }

                // clear all fields across all forms
                document.querySelectorAll('form.citation-form *').forEach(function(field){
                    var type = field.type;
                    var tag = field.tagName;

                    if (type == 'text' || type == 'date') {
                        field.value = "";
                    }
                    if (tag == 'SELECT') {
                        field.selectedIndex = 0;
                    }

                    // remove added contributors
                    if(field.id == 'contributor-container'){
                        let contributors = field.querySelectorAll('div.row.contributor');
                        if(contributors.length > 1){
                            for(i=0;i<contributors.length;i++){
                                if(i > 0){
                                    contributors[i].remove();
                                }
                            }
                        }
                    }
                })

                e.preventDefault();
            })
        })
    },

    // read hash and sent data on to dropdowns. 
    setFormTypeFromUrl: function() {
        if (window.location.hash) {
            var pathArray = window.location.hash.split('/');
            app.cite = pathArray[1];
            app.style = pathArray[2];

            // handle select dropdowns
            app.setDropdowns();
        }

    },

    /**
     * cite dropdowns should be preselected based on url vars. 
     * This allows for deep linking directly to a citation style
     */
    setDropdowns: function() {
        document.querySelector('#cite-select select').value = app.cite;
        document.querySelector('#cite-style-select select').value = app.style;
    },

    /**
     * toggle button above each citation form
     */
    activateCitationButtons: function() {
        //citation
        let citations = document.querySelectorAll('#' + app.cite + ' .' + app.style + ' .citation li a');
        citations.forEach(function(item){
            item.addEventListener('click', function(e){
                citations.forEach(function(citation){
                    citation.classList.remove('active');
                })
                item.classList.add('active');
                app.citation = item.dataset.citation;
                app.handleCitationFields();

                e.preventDefault();
            })
        })
    },

    /**
     * set citation based on value of toggle above form fields
     */
    getCitation: function() {
        document.querySelectorAll('#' + app.cite + ' .' + app.style + ' .citation li').forEach(function(citation){
            let elem = citation.querySelector('a');
            if(elem.classList.contains('active')){
                app.citation = elem.dataset.citation;
            }
        })
    },

    setURL: function() {
        if (app.cite && app.style) {
            window.location.hash = '#/' + app.cite + '/' + app.style;
        }
    },

    /**
     * hide and show fields based on 
     */
    handleCitationFields: function() {
        document.querySelectorAll('.citation-form .field').forEach(function(item){
            item.style.display = "none";
        })
        document.querySelectorAll('.citation-form .' + app.citation).forEach(function(item){
            item.style.display = "";
        })
    },

    
    // these are the [+] and [-] buttons next to the contributor at the top of each form
    // this function adds a new row of contributor fields. The click event is directly on the button
    addContributor: function(elem) {
        // get the parent element (contributor fields)
        var item = elem.parentElement.parentElement;
        
        // Copy the contributor fields
        var clone_of_contrib_fields = item.cloneNode(true);
        // make sure to clear the values of duplicated fields
        var text_fields = clone_of_contrib_fields.querySelectorAll("input[type='text']");
        for(i=0;i<text_fields.length;i++){
            // text_fields[i].value = "";
        }

        // Append the cloned element to the contrib container
        item.parentElement.appendChild(clone_of_contrib_fields);
    },

    // this function removes a new row of contributor fields. The click event is directly on the button
    removeContributor: function(elem) {
        // get the parent element (contributor fields)
        var item = elem.parentElement.parentElement;
        item.remove();
    },

    // manage add/remove contributor buttons
    countContributors: function() {
        number_of_add_contributors = document.querySelectorAll(app.form+' .add-contributor').length;
        number_of_remove_contributors = document.querySelectorAll(app.form+' .remove-contributor').length;
        max_contributors = 99;
        // each style has max sontributors until the style no longes accepts them as is returned as either 'et al' or '...'
        if(app.style == 'apa'){
            max_contributors = 8;
        }else if(app.style == 'apa7'){
            max_contributors = 21;
        }else if(app.style == 'modern-language-association'){
            max_contributors = 4;
        }else if(app.style == 'modern-language-association-8'){
            max_contributors = 4;
        }else if(app.style == 'chicago-author-date'){
            max_contributors = 11;
        }else if(app.style == 'council-of-science-editors-author-date'){
            max_contributors = 11;
        }

        if(number_of_add_contributors >= max_contributors){
            return true;
        }else{
            return false;
        }
    },

    handleDatePicker: function() {
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

        $(app.form + ' .fdatepicker').fdatepicker({
            onRender: function(date) {
                return date.valueOf() > now.valueOf() ? 'disabled' : '';
            }
        });
        $(app.form + ' .fdatepicker-time').fdatepicker({
            format: 'hh:ii',
            pickTime: true,
            startView: 'day'
        });

    },

    /**
     * send analytics to matomo
     */
    logAnalytics: function() {
        // matomo analytics
        app.citeText = document.querySelector('#cite-select select').value;
        app.citeStyleText = document.querySelector('#cite-style-select select').value;
        _paq.push(['trackEvent', 'CitationBuilder', app.citeStyleText, app.citeText]);
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    app.init();
})