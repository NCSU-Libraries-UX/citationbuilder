<!DOCTYPE html>
<!--[if IE 7 ]>    <html lang="en" class="no-js lt-ie9 ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js lt-ie9 ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

<head>
    <title>Citation Builder | NCSU Libraries</title>
    <link rel="stylesheet" href="styles/app.css" />
    <?php include('https://cdn.lib.ncsu.edu/shared-website-assets/head/head.html'); ?>
    <link rel="stylesheet" media="all" href="/themes/custom/ncsulibraries/styles/fontawesome/css/all.css" />
    <script type="text/javascript" src="./citeproc-js/xmldom.js"></script>
    <script type="text/javascript" src="./citeproc-js/citeproc.js"></script>
    <script src="scripts/datepicker.js"></script>
    <script src="scripts/citation.js"></script>
    <script src="scripts/app.js"></script>
    <script src="scripts/data.js"></script>
    <script src="scripts/data-storage.js"></script>
</head>
<body>

    <div class="off-canvas-wrap">
        <div class="inner-wrap">

            <!-- HEADER: do not remove -->
            <link rel="stylesheet" type="text/css" href="https://cdn.lib.ncsu.edu/shared-website-assets/latest/header/header.css">
            <?php include "https://cdn.lib.ncsu.edu/shared-website-assets/latest/header/header.html"; ?>
            <script src="https://cdn.lib.ncsu.edu/shared-website-assets/latest/header/header-app.js?search=true" type="text/javascript" id="ncsu-lib-header"></script>

            <div id="content" role="document" class="page">
                <main id="main-content" role="main" class="row l-main">

                    <!-- MAIN CONTENT HERE -->

                    <div class="medium-12 columns main">
                        <h1>Citation Builder</h1>

                        <?php include './includes/citation-select.php'; ?>

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

                        <div class="reveal" id="citation-modal" data-reveal>
                            <div id="citation-content"></div>
                            <button class="close-button" id="close-button" data-close aria-label="Close modal" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <p class="note"><small>*This tool does not correct for capitalization.</small></p>
                        </div>

                        <h3>The Citation Builder is based on the following citation manuals:</h3>

                        <ul>
                            <li>American Psychological Association 6th edition</li>
                            <li>Modern Language Association 7th edition</li>
                            <li>Modern Language Association 8th edition</li>
                            <li>Chicago Manual of Style 16th edition</li>
                            <li>Council of Science Editors</li>
                        </ul>

                        <p><a href="http://www.lib.ncsu.edu/do/citation-management">Citation Management Tools</a></p>
                    </div>

                    <!--- end content -->
                </main>
            </div> <!-- end .page -->
            <!-- FOOTER: do not remove -->
            <link rel="stylesheet" type="text/css" href="https://cdn.lib.ncsu.edu/shared-website-assets/latest/footer/footer.css">
            <?php include("https://cdn.lib.ncsu.edu/shared-website-assets/latest/footer/footer.html"); ?>
        </div> <!-- end .inner-wrap -->
    </div> <!-- end .off-canvas-wrap -->
    <!-- dummy ga.js code for testing -->
    <script src="scripts/dummy.js" type="text/javascript"></script>
</body>
</html>

