Hello

This is a small project for a DNS registar.
The project is built using Symfony 4, Api-Platform, React and other bundles.

How to:

0. download the project
1. edit the .env file  => DATABASE_URL=mysql://root:pass@127.0.0.1:3306/dnsuite with your own credentials
2. open a terminal and run:
* composer install
* bin/console doctrine:database:create;
* bin/console doctrine:schema:update --force;
* yarn install
* yarn run encore dev
* bin/console server:start;
 

3. Add React Admin.
Clone https://github.com/tudorpie/dnsuite-admin.git


4. open a terminal and run: 
* yarn install
* yarn start

That should do it !


Front Aplication: http://localhost:8000/index 

Api documentation: http://localhost:8000/

Admin: http://localhost:3000


5. to unit test:
bin/phpunit 


Most of the work was done in the front application.
