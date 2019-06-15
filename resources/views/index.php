<!DOCTYPE html>
<html lang="en-US" ng-app="main">
<head>
    <meta charset="utf-8" />
    <base href="/">
    <title ng-bind="title">tmn.nyc</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="/css/common/libs.css">
    <link rel="stylesheet" href="/css/master.css">
    <script type="text/javascript" src="/js/common/libs.js"></script>
    <script type="text/javascript" src="/js/angular/main.js"></script>
</head>
<body>
    <header>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">tmn.nyc</a>
                </div>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/"><i class="fa fa-home"></i> <span>Home</span></a></li>
                    <li><a href="/projects"><i class="fa fa-projects"></i> <span>Projects</span></a></li>
                    <li><a href="/contact"><i class="fa fa-comment"></i> <span>Contact</span></a></li>
                </ul>
            </div>
        </nav>
    </header>

    <div id="main" class="container">
       <div ng-view></div>
   </div>

    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-74366073-1', 'auto');
    </script>
</body>
</html>
