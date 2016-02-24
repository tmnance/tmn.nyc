<!DOCTYPE html>
<html lang="en-US" ng-app="main">
<head>
    <meta charset="utf-8" />
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="/css/common/libs.css">
    <link rel="stylesheet" href="/css/master.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js" type="text/javascript"></script>
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
                <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
                <!-- <li><a href="#polls"><i class="fa fa-polls"></i> Polls</a></li> -->
                <!-- <li><a href="#about"><i class="fa fa-shield"></i> About</a></li> -->
                <li><a href="/contact"><i class="fa fa-comment"></i> Contact</a></li>
            </ul>
        </div>
        </nav>
    </header>

    <div id="main" class="container">
       <div ng-view></div>

       <!-- angular templating -->
       <!-- this is where content will be injected -->
   </div>
</body>
</html>
