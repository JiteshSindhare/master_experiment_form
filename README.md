## Instructions to run
    There is docker compose inside ./experimentform/docker-compose.yaml

    In which backend is setup to run in port 8000.
    and frontend is setup to run in port 4200.
    No need to setup db either, docker compose is taking care of that.
    I have kept dbname,user,password,host simple and not hidden in .env so it will be
    easy to replicate with compose on the go.

Before running include a .env file inside directory ./experimentform/experimentform/.env
with values: 

        SECRET_KEY=KEY_PROVIDED_IN_MAIL

To run using docker. in parent directory.
<ol>
<li>run command: docker-compose build</li>
<li>run command: docker-compose up</li>
</ol>

In browser goTo: <http://localhost:4200>

### Overview of pages:-
<ol>
<li>Create experiment: page is to create new survery/experiment.</li>
<li>Manage: This page is to delete or toggle status of existing new survery/experiment </li>
<li>Experiment: This page is to register response of existing survery/experiment:
    If you go to this page by clicking from top bar, there will be a drop down of existing experiments to select from.
    Else you can type name of experiment with 'space' replaced by '-' in this route like:
    For experiment name: new order
    http://localhost:4200/experiment/:new-order
 </li>
</ol>

### Note:-
For now experiment name should only contain alphabet and spaces (no special symbols).
I reckon no validation while submitting forms yet.

### Things implemented:-
Route/page to create experiment.
Route/page to create question.
Route/page to create option.
Route/page to disable/enable experiment.
Route/page to submit response.
Docker for frontend, backend, compose.

### Images:-
![Create Image](https://github.com/JiteshSindhare/master_experiment_form/blob/main/images/create.JPG?raw=true)

![Manage Image](https://github.com/JiteshSindhare/master_experiment_form/blob/main/images/manage.JPG?raw=true)

![Response Image](https://github.com/JiteshSindhare/master_experiment_form/blob/main/images/response.JPG?raw=true)

![Submission Image](https://github.com/JiteshSindhare/master_experiment_form/blob/main/images/submission.JPG?raw=true)