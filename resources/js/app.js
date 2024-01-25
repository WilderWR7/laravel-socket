import './bootstrap';
import '../css/app.css';




//activity User
Echo.private('notifications') //nombre del canal del evento
    .listen('UserSessionChanged',(e)=>{
        const notificationElement = document.getElementById('notification');
        notificationElement.innerText = e.message;
        notificationElement.classList.remove('invisible');
        notificationElement.classList.remove('alert-success');
        notificationElement.classList.remove('alert-danger');
        notificationElement.classList.add('alert-'+e.type);
    } )


    Echo.channel('users')
    .listen('UserCreated',(e)=>{
        const userElement = document.getElementById('users');
        let element = document.createElement('li');
        element.setAttribute('id',e.user.id);
        element.innerText = e.user.name;
        userElement.appendChild(element);
    });

    Echo.channel('users')
    .listen('UserUpdated',(e)=>{
        const userElement = document.getElementById('users');
        let element = document.getElementById(e.user.id);
        element.innerText = e.user.name;
    });

    Echo.channel('users')
    .listen('UserDeleted',(e)=>{
        let element = document.getElementById(e.user.id);
        element.parentNode.removeChild(element);
    });

    //juego

const circleElement = document.getElementById('circle');
const timerElement = document.getElementById('timer');
const winnerElement = document.getElementById('winner');
const betElement = document.getElementById('bet');
const resultElement = document.getElementById('result');

    Echo.channel('game')
    .listen('RemainingTimeChanged',(e)=> {
        timerElement.innerText = e.time;
        circleElement.classList.add('refresh');

        winnerElement.classList.add('d-none');

        resultElement.innerText = '';
        resultElement.classList.remove('text-success');
        resultElement.classList.remove('text-danger');
    })
    .listen('WinnerNumberGenerated',(e)=>{
        circleElement.classList.remove('refresh');
        let winner = e.number;
        winnerElement.innerText = winner;
        winnerElement.classList.remove('d-none');
        let bet = betElement[betElement.selectedIndex].innerText;
        if(bet == winner) {
            resultElement.innerText = 'You Win';
            resultElement.classList.add('text-success');
        }
        else {
            resultElement.innerText = 'You Lose';
            resultElement.classList.add('text-danger');

        }
    });

    //chat
    const usersElement = document.getElementById('users');
    const messagesElement = document.getElementById('messages');
    Echo.join('chat')
    .here((users)=> {
        users.forEach((user, index) => {
            let element = document.createElement('li');

            element.setAttribute('id', user.id);
            element.setAttribute('onclick',window.axios.post('/chat/greet/'+user.id));
            element.innerText = user.name;

            usersElement.appendChild(element);
        });
    }).
    joining((user)=> {
        let element = document.createElement('li');

        element.setAttribute('id', user.id);
        element.setAttribute('onclick',window.axios.post('/chat/greet/'+user.id));

        element.innerText = user.name;

        usersElement.appendChild(element);
    })
    .leaving((user)=> {
        let element = document.getElementById(user.id);
        element.parentNode.removeChild(element);
    })
    .listen('MessageSent',(e)=> {
        let element = document.createElement('li');

        element.setAttribute('id', e.user.id);
        // element.setAttribute('onclick', 'greetUser("' + user.id + '")');
        element.innerText = e.user.name+' : '+e.message;

        messagesElement.appendChild(element);
        }
    );
    //send Chat

    const sendElement = document.getElementById('send');
    const messageElement = document.getElementById('message');
    //agrega un evento de click para sendElement
    sendElement.addEventListener('click',(e)=> {
        e.preventDefault();
        window.axios.post('/chat/message',{
            message:messageElement.value
        });
        messageElement.value = '';
    });


