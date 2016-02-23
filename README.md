## Dependencies

* Homebrew:
```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* Composer:
```sh
brew install composer
```

* Node:
```sh
brew install node
```

* Bower:
```sh
npm install -g bower
```


## Initial Setup

* Install composer dependencies
```sh
composer install
```

* Install npm dependencies
```sh
npm install
```

* Install bower dependencies
```sh
bower install
```

* Setup directory permissions
```sh
sudo chmod -R 777 storage
```

* Setup environment file
```sh
cp .env.example .env; subl .env
```
(setup local db name/credentials)

* Run initial migrations
```sh
gulp migrate
```

* Setup .env file
```sh
cp .env.example .env
```
