## Instructions to run
    There is docker compose inside ./experimentform/docker-compose.yaml

    In which backend is setup to run in port 8000.
    and frontend is setup to run in port 4200.
    No need to setup db either, docker compose is taking care of that.
    I have kept dbname,user,password,host simple and not hidden in .env so it will be
    easy to replicate with compose on the go.
To run using docker go to directory ./experimentform/docker-compose.yaml
<ol>
<li>run command: docker-compose build</li>
<li>run command: docker-compose up</li>
</ol>

In browser goTo: <http://localhost:4200>

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