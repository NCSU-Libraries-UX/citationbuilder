var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-168451952-1']);
_gaq.push(['_setSiteSpeedSampleRate', 10]);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


drop = document.querySelector('#cite-select');
drop.addEventListener('change', function(e){
    _gaq.push(['_trackEvent', 'dummy check', e.target.value])
})