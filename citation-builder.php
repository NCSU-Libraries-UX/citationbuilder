<link rel="stylesheet" media="all" href="styles/fontawesome.css" />
<link rel="stylesheet" media="all" href="styles/core.css" />
<link rel="stylesheet" href="styles/app.css" />
<h1>Citation Builder</h1>

<?php include './includes/citation-select.php'; ?>

<!-- if user has disabled JS -->
<noscript>
    <div class="callout warning">Citation Builder requires JavaScript to function. If you don't want to enable Javascript, that's fine! We've recommended some <a href="https://www.lib.ncsu.edu/do/cite-sources">citation guides</a> for instructions about generating citations manually.</div>
</noscript>

<div id="form-container">
    <?php
        $csl_array = array('apa','apa7','chicago-author-date','council-of-science-editors-author-date','modern-language-association','modern-language-association-8');
        $medium_array = array('book','chapter','magazine','newspaper','article-journal','website');
        foreach($medium_array as $med){
            print '<div class="form-parent" id="'.$med.'">';
                foreach($csl_array as $csl){
                    print '<div class="form-child '.$csl.'">';
                        include './includes/'.$med.'/'.$csl.'.html';
                    print '</div>';
                }
            print '</div>';
        }
    ?>
</div>
<p>*This tool does not correct for capitalization.</p>

<h3>The Citation Builder is based on the following citation manuals:</h3>

<ul>
    <li>American Psychological Association 6th edition</li>
    <li>Modern Language Association 7th edition</li>
    <li>Modern Language Association 8th edition</li>
    <li>Chicago Manual of Style 16th edition</li>
    <li>Council of Science Editors</li>
</ul>

<p><a href="http://www.lib.ncsu.edu/do/citation-management">Citation Management Tools</a></p>

<script type="text/javascript" src="scripts/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="./citeproc-js/xmldom.js"></script>
<script type="text/javascript" src="./citeproc-js/citeproc.js"></script>
<script src="scripts/datepicker.js"></script>
<script src="scripts/citation.js"></script>
<script src="scripts/app.js"></script>
<script src="scripts/data.js"></script>
<script src="scripts/data-storage.js"></script>
<!-- insert dummy.js to prefill form fields for testing -->
<!-- <script src="scripts/dummy.js"></script> -->