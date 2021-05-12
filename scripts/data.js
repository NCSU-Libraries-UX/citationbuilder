// the code in this file handles the submitting of field data to the zotero
// library and returning the citation
var data = {

    init: function() {
        // event listener for main citation form submit button
        const form = document.querySelectorAll('.citation-form');
        for(i=0;i<form.length;i++){
            form[i].addEventListener('submit', event => {
                // submit form data to citation library
                // data.return_citation(event.currentTarget);
                event.preventDefault()
            })
        }

        const form_input = document.querySelectorAll('.citation-form input[type="submit"]');
        for(i=0;i<form_input.length;i++){
            form_input[i].addEventListener('click', event => {
                form_element = event.currentTarget.parentElement.parentElement.parentElement;
                // submit form data to citation library
                data.return_citation(form_element);
                event.preventDefault()
            })
        }
    },

    return_citation: function(form) {
        // catch DOI and remove 'doi:' because citation is already tacking that on
        doi_element = form.querySelector('input[name="DOI"]');
        if(doi_element){
            if(doi_element.value.includes('doi:')){
                doi_element_split_values = doi_element.value.split("doi:");
                doi_element.value = doi_element_split_values[1];
            }
        }

        // get the current citation form
        data.form = form;
        
        // put all field data into array
        data.formData = $(form).serializeArray();
        data.csl = form.dataset.csl;
        data.type = form.dataset.type;
        
        // convert it to json for zotero to injest
        data.json = data.build_citation_json();

        // get form data from zotero then add it to citation div
        citation_style_select_element = document.getElementById('cite-style-select-element');
        citation_style = citation_style_select_element.options[citation_style_select_element.selectedIndex].innerHTML;
        citation_content = '<h2>Your citation in '+citation_style+' format*</h2>'+cite.init(data.json, data.csl);
        citation_element = form.querySelector(".citation-box");
        citation_element.style.display = "block";
        citation_element.querySelector('.citation-content').innerHTML = citation_content;
    },

    /**
     * Write contents of citation to clipboard
     * @param  {element} obj The "copy to clipboard" button
     * @return nothing
    */
    copy_citation_to_clipboard: function(element){
        text_to_copy = element.parentElement.querySelector('.csl-entry').innerHTML;
        
        // set listener so we can convert text to rich text and preserve formatting.
        function listener(e) {
            e.clipboardData.setData("text/html", text_to_copy);
            e.clipboardData.setData("text/plain", text_to_copy);
            e.preventDefault();
            element.innerText = "citation copied to clipboard";
            reset_clipboard_interval = setInterval(function(){
                element.innerText = "copy citation to clipboard";
                clearInterval(reset_clipboard_interval);
            },5000)
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);

        // navigator.clipboard.writeText(text_to_copy).then(function() {
        //     /* clipboard successfully set */
        //     console.log('yes!');
        // }, function() {
        //     /* clipboard write failed */
        //     console.log('no!');
        // });
    },

    build_citation_json: function() {

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

                    json['Item-1']['issued'] = { 'date-parts': [dateObj] };
                }

            }
        }
        return json;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    data.init();
})