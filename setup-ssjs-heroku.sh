#!/bin/bash

echo -e "\n\nNOW ENTER YOUR HEROKU PASSWORD"
# Set up heroku.
# - devcenter.heroku.com/articles/config-vars
# - devcenter.heroku.com/articles/heroku-postgresql
heroku login
heroku addons:add heroku-postgresql:dev --app jat1sc-bitstarter-s-mooc
heroku pg:promote `heroku config --app jat1sc-bitstarter-s-mooc | grep HEROKU_POSTGRESQL | cut -f1 -d':'` --app jat1sc-bitstarter-s-mooc
heroku plugins:install git://github.com/ddollar/heroku-config.git --app jat1sc-bitstarter-s-mooc


heroku addons:add heroku-postgresql:dev --app jat1sc-bitstarter-mooc
heroku pg:promote `heroku config --app jat1sc-bitstarter-mooc | grep HEROKU_POSTGRESQL | cut -f1 -d':'` --app jat1sc-bitstarter-mooc
heroku plugins:install git://github.com/ddollar/heroku-config.git --app jat1sc-bitstarter-mooc



