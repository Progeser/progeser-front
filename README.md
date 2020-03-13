# ProgeserFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

ProGeSer Front is the UI part of the ProGeSer project, an application to manage greenhouses. 
You can find the API part [here](https://github.com/Progeser/progeser-api).

## Run the application

You can run the application in 2 ways.

### With Angular CLI

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### With Docker

#### Requirements

* Docker v. >= 17.0.3
* Docker Compose v. >= 1.20.0

#### How to run

Run the following commands : 

`docker build -t progeser-front .`

Then, you can start the container : 

`docker run -p 42000:42000`

You can navigate to http://localhost:42000 

## Deploy the full application

You only need docker-compose to run the full application, and a .env file.

First, create a docker-compose.yml file to deploy the full application :

```Dockerfile
version: '3.6'
 
 services:
   db:
     restart: unless-stopped
     networks:
       - progeser-network
     image: postgres:10
     environment:
       POSTGRES_HOST_AUTH_METHOD: trust
     volumes:
       - db_data:/var/lib/postgresql/data
 
   redis:
     restart: unless-stopped
     networks:
       - progeser-network
     image: redis:5.0.7
 
   web:
     restart: unless-stopped
     networks:
       - progeser-network
     image: progeser/progeser-api-web
     ports:
       - "3000:3000"
     env_file: .env
     environment:
       RAILS_ENV: development
     depends_on:
       - db
       - redis
 
   sidekiq:
     restart: unless-stopped
     networks:
       - progeser-network
     image: progeser/progeser-api-sidekiq
     depends_on:
       - web
       - db
       - redis
     env_file: .env
     environment:
       RAILS_ENV: development
 
   front:
     restart: unless-stopped
     image: progeser/progeser-front-dev
     ports:
     - "8888:80"
 
 networks:
   progeser-network:
     driver: bridge
 
 volumes:
   db_data:
```
Then, create a .env file. You can find an exemple [here](https://github.com/Progeser/progeser-api/blob/master/.env.example).

Finally, run the following : 

`docker-compose run -d`

To populate database and some fake data, run the following: 

`docker-compose run web bundle exec rake db:create`

`docker-compose run web bundle exec rake db:migrate`

`docker-compose run web bundle exec rake db:seed`

You can now navigate to http://localhost:8888
