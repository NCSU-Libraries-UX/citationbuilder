// The code in this file controls the UI functionality
var app = {
    cite: '',
    style: '',
    form: '',

    init: function() {
        //citation select
        $('#cite-select select').change(function(e) {
            app.cite = $(this).val();
            app.loadForm();
            c.readCookie();

            // set url
            app.setURL();

            // analytics
            app.logAnalytics();
        })

        // citation style select
        $('#cite-style-select select').change(function(e) {
            app.style = $(this).val();
            app.loadForm();
            c.readCookie();

            // set URL
            app.setURL();

            // analytics
            app.logAnalytics();

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
            app.cite = $('#cite-select select').val();
        }
        if (!app.style) {
            app.style = $('#cite-style-select select').val();
        }
        app.loadForm();
    },

    // this app is a bunch of html files. select determines which ones we should load
    loadForm: function() {
        $('.form-parent').hide();
        $('.form-child').hide();
        $('#' + app.cite).show();
        $('.' + app.style).show();

        app.form = '#' + app.cite + ' .' + app.style;
        app.activateCitationButtons();
        app.getCitation();
        app.handleCitationFields();
        app.handleDatePicker();
        app.clearForm();
    },

    showForm: function() {
        $('.citation-form').show();
    },

    hideForm: function() {
        $('.citation-form').hide();
    },

    clearForm: function() {

        if ($('form.citation-form[data-csl="' + app.style + '"] #clear-form').length == 0) {
            var clearBtn = '<div class="columns medium-2" id="clear-form-button"><p><a href="#" id="clear-form">Clear fields</a></p></div>';
            $('form.citation-form[data-csl="' + app.style + '"] input[type=submit]').parent().after(clearBtn);
            app.initClearFormButton();
        }

    },

    // activate clear form button
    initClearFormButton: function() {
        // init clear form button
        $('form.citation-form[data-csl="' + app.style + '"] #clear-form').click(function(e) {
            c.string = [];
            c.writeToCookie();
            
            // hide citation box
            citations = document.querySelectorAll('.citation-box');
            for(i=0;i<citations.length;i++){
                citations[i].style.display = "";
            }

            // clear actual fields
            // var form = $('form.citation-form[data-csl="'+app.style+'"]:visible *');
            var form = $('form.citation-form *');
            $(form).each(function() {

                var type = $(this).attr('type');
                var tag = $(this).prop('tagName');
                if (type == 'text') {
                    $(this).val('');
                }
                if (tag == 'SELECT') {
                    $(this)[0].selectedIndex = 0;
                }
                // remove added contributors
                if ($(this).hasClass('contributor-container')) {
                    $(this).find('div.row.contributor').each(function(i) {
                        if (i > 0) {
                            $(this).remove();
                        }
                    })
                }
            });


            e.preventDefault();
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

    setDropdowns: function() {
        $('#cite-select select').val(app.cite);
        $('#cite-style-select select').val(app.style);
    },

    handleClearButton: function() {
        $('#clear-form').show();
    },

    activateCitationButtons: function() {
        //citation
        $('#' + app.cite + ' .' + app.style + ' .citation li a').click(function(e) {
            $('#' + app.cite + ' .' + app.style + ' .citation li a').removeClass('active');
            $(this).addClass('active');
            app.citation = $(this).data('citation');
            app.handleCitationFields();

            e.preventDefault();
        })
    },

    getCitation: function() {
        $('#' + app.cite + ' .' + app.style + ' .citation li').each(function() {
            var elem = $(this).find('a');

            if ($(elem).hasClass('active')) {
                app.citation = $(elem).data('citation');
            }
        });
    },

    setURL: function() {
        if (app.cite && app.style) {
            window.location.hash = '#/' + app.cite + '/' + app.style;
        }
    },

    handleCitationFields: function() {
        $('.citation-form .field').hide();
        $('.citation-form .' + app.citation).show();
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

        // if (number_of_remove_contributors < 2) {
        //     $('.add-contributor').removeClass('active');
        // } else {
        //     $('.add-contributor').addClass('active');
        // }
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

    logAnalytics: function() {
        // google analytics
        app.citeText = $('#cite-select select option:selected').text();
        app.citeStyleText = $('#cite-style-select select option:selected').text();
        ga('send', 'event', 'CitationBuilder', app.citeStyleText, app.citeText);
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    app.init();
})