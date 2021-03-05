// the code in this file handles the submitting of field data to the zotero
// library
var data = {

    init: function() {
        var activeForm = $('select[name*="citation-style"]').val();
        // event listener for main citation form submit button
        $('.citation-form').submit(function(e) {
            // since form data needs to be formatted for zotero 
            // we hijack the submit so we can manipulate some data
            data.activateForm(e.currentTarget);
            e.preventDefault();
        })
    },

    activateForm: function(form) {
        // get the submitted form
        data.form = form;
        // put all data into array
        data.formData = $(form).serializeArray();
        data.csl = $(form).data('csl');
        // convert it to json for zotero to injest
        data.json = data.buildJson();

        // send form data to zotero then add it to modal
        $('#citation-content').html(cite.init(data.json, data.csl));
        // open out modal for our users
        $('#citation-modal').foundation('open');
        // enable modal close
        document.getElementById('close-button').addEventListener('click', function(e) {
            $('#citation-modal').foundation('close');
        })

        // fires when modal closes
        $(document).on('closed.zf.reveal', '[data-reveal]', function() {
            // send focus back to submit button
            $('#submit-area input').focus();
        });

    },

    buildJson: function() {

        form = data.form;
        var json = { "Item-1": {} };
        var contribObj = {};
        var contribAry = [];
        var dateObj = [];

        // collect contributor data
        $('.contributor:visible').each(function(i) {
            var contrib = $(this).find('select[name*="contributor"]').val();
            var given = $(this).find('input[name*="given"]').val();
            var middle = $(this).find('input[name*="givenMiddle"]').val();
            var last = $(this).find('input[name*="family"]').val();

            var first = (middle) ? given + ' ' + middle : given;

            //build contributor object
            if (given + middle + last != '') {
                if (contribAry.indexOf(contrib)) {
                    json['Item-1'][contrib] = [{ 'given': first, 'family': last }];
                } else {
                    json['Item-1'][contrib].push({ 'given': first, 'family': last });
                }
            }

            contribAry.push(contrib);
        })

        n = 0;
        for (var obj in data.formData) {
            json['Item-1']['id'] = 'Item-1';
            var name = data.formData[obj].name,
                val = data.formData[obj].value;

            if ($('input[name*="' + name + '"]').parent().is(':visible') || $('select[name*="' + name + '"]').parent().is(':visible')) {
                json['Item-1'][name] = val;

                // exception for fields who have mult values that need to be consolidated

                if (obj >= 3) {
                    if (data.formData[obj - 3].value == 'editor') { // for multiple editors
                        given = data.formData[obj - 2].value;
                        middle = data.formData[obj - 1].value;
                        family = data.formData[obj].value;
                        json['Item-1']['editor'][n] = { 'given': given, 'family': family, 'givenMiddle': middle };
                        n++;
                    }
                    if (data.formData[obj - 3].value == 'translator') { // for multiple translators
                        given = data.formData[obj - 2].value;
                        middle = data.formData[obj - 1].value;
                        family = data.formData[obj].value;
                        json['Item-1']['translator'][n] = { 'given': given, 'family': family, 'givenMiddle': middle };
                        n++;
                    }
                }
                if (name == 'year') {
                    json['Item-1']['issued'] = {
                        'date-parts': [
                            [val]
                        ]
                    };
                }
                if (name == 'accessed') {
                    var str = val.split('-');
                    json['Item-1'][name] = {
                        'date-parts': [
                            [str[0], str[1], str[2]]
                        ]
                    };
                }

                if (name == 'issued' && val != '') {
                    var str = val.split('-');
                    json['Item-1'][name] = {
                        'date-parts': [
                            [str[0], str[1], str[2], '10:00']
                        ]
                    };
                }

                // month/year inputs
                if (name == 'issued-mo' || name == 'issued-yr' || name == 'issued-dy') {
                    var year = $(data.form).find('input[name*="issued-yr"]').val();
                    var month = $(data.form).find('select[name*="issued-mo"]').val();
                    var day = $(data.form).find('input[name*="issued-dy"]').val();
                    var time = $(data.form).find('input[name*="issued-time"]').val();

                    if (year) {
                        dateObj[0] = year;
                    }
                    if (month) {
                        dateObj[1] = month;
                    }
                    if (day) {
                        dateObj[2] = day;
                    }
                    if (time) {
                        // dateObj[3] = time;
                    }

                    json['Item-1']['issued'] = { 'date-parts': [dateObj] };
                }
                // if(name == 'issued-time'){
                //     var hour = $(data.form).find('input[name*="issued-time"]').val();

                //     if(hour){
                //         dateObj[0] = hour;
                //     }
                //     if(month){
                //         dateObj[1] = month;
                //     }
                //     if(day){
                //         dateObj[2] = day;
                //     }

                //     json['Item-1']['issued'] = {'date-parts' : [dateObj]};
                // }

            }
        }
        // console.log(json);
        return json;
    }
}

$(function() {
    data.init();
})