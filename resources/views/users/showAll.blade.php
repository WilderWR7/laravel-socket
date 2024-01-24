@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Users</div>

                <div class="card-body">
                    <ul id="users" >

                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
{{-- <script src="https://cdn.jsdelivr.net/npm/laravel-echo@1.11.3/dist/echo.js"></script> --}}

{{-- <script src="/resources/js/app.js"></script> --}}

<script>
    window.axios.get('/api/users')
        .then((response)=> {
            const usersElement = document.getElementById('users');
            let users = response.data;
            users.forEach((user,index) => {
                let element = document.createElement('li');
                element.setAttribute('id',user.id);
                element.innerText = user.name;
                usersElement.appendChild(element);
            });
        })
</script>

{{-- <script>
    Echo.channel('users')
    .listen('UserCreated',(e)=>{
        let element = document.createElement('li');
        element.setAttribute('id',e.user.id);
        element.innerText = e.user.name;
        element.appendChild(element);
    });

    Echo.channel('users')
    .listen('UserUpdated',(e)=>{
        let element = document.getElementById(e.user.id);
        element.innerText = e.user.name;
    });

    Echo.channel('users')
    .listen('UserDeleted',(e)=>{
        let element = document.getElementById(e.user.id);
        element.parentNode.removeChild(element);
    });
</script> --}}
