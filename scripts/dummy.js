document.addEventListener("DOMContentLoaded", function(event) {
    var given = document.querySelectorAll("input[name='given']");
    for(i=0;i<given.length;i++){
        given[i].value = 'John';
    }

    var family = document.querySelectorAll("input[name='family']");
    for(i=0;i<family.length;i++){
        family[i].value = 'Smith';
    }

    var title = document.querySelectorAll("input[name='title']");
    for(i=0;i<title.length;i++){
        title[i].value = 'The End of the World As We Know It';
    }

    var container_title = document.querySelectorAll("input[name='container-title']");
    for(i=0;i<container_title.length;i++){
        container_title[i].value = 'Dear Diary Journal';
    }

    var volume = document.querySelectorAll("input[name='volume']");
    for(i=0;i<volume.length;i++){
        volume[i].value = '12';
    }

    var issue = document.querySelectorAll("input[name='number']");
    for(i=0;i<issue.length;i++){
        issue[i].value = '2A';
    }

    var issued_yr = document.querySelectorAll("input[name='issued-yr']");
    for(i=0;i<issued_yr.length;i++){
        issued_yr[i].value = '1978';
    }

    var page = document.querySelectorAll("input[name='page']");
    for(i=0;i<page.length;i++){
        page[i].value = '100-115';
    }

    var url = document.querySelectorAll("input[name='URL']");
    for(i=0;i<url.length;i++){
        url[i].value = 'https://www.sample-website.com';
    }
    
    var archive_location = document.querySelectorAll("input[name='archive_location']");
    for(i=0;i<archive_location.length;i++){
        archive_location[i].value = 'Collection of Stuff';
    }

    var date = document.querySelectorAll("input[name='accessed']");
    for(i=0;i<date.length;i++){
        date[i].valueAsDate = new Date(); //'07-17-1978';
    }
    
    var issued = document.querySelectorAll("input[name='issued']");
    for(i=0;i<issued.length;i++){
        issued[i].valueAsDate = new Date(); //'07-17-1978';
    }
    
    var doi = document.querySelectorAll("input[name='DOI']");
    for(i=0;i<doi.length;i++){
        doi[i].value = '10.12345/abc/defghi';
    }

    var publisher = document.querySelectorAll("input[name='publisher']");
    for(i=0;i<publisher.length;i++){
        publisher[i].value = 'Pub Lee Shure';
    }
    
    var publisher_place = document.querySelectorAll("input[name='publisher-place']");
    for(i=0;i<publisher_place.length;i++){
        publisher_place[i].value = 'Holmdel, NJ';
    }
   
    var edition = document.querySelectorAll("input[name='edition']");
    for(i=0;i<edition.length;i++){
        edition[i].value = 'Last';
    }
})