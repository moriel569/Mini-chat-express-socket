$(document).ready(() => {
    const socket = io.connect()
    const nickname = $('.login-form #nickname')
    const loginForm = $('.login-form')
    const messagesList = $('.messages-list')
    const messageForm = $('.message-form')
    const usersList = $('.users-list')
    const messageInput = $('#message')


    loginForm.submit((e) => {
        e.preventDefault()
        socket.emit('login', nickname.val())
    })

    messageForm.submit((e) => {
        e.preventDefault()
        socket.emit('message', messageInput.val())
        messageInput.val('')
    })

    //Listener
    socket.on('login', data => {
        if (data.status === 'OK') {
            loginForm.hide()
            messageForm.removeClass('d-none')
            messagesList.removeClass('d-none')
            usersList.removeClass('d-none')
        }
    })
    socket.on('new message', data => {
        console.log(data)
        let newMsg = `<a href="" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${data.nickname}</h5>
            <small class="text-muted">${data.time}</small>
        </div>
        <p class="mb-1">${data.message}</p>
    </a>`
        messagesList.children('ul').append(newMsg)
    })

    socket.on('users', data => {
        usersList.children('ul').html('')
        for (let index = 0; index < data.users.length; index++) {
            usersList.children('ul').append(` <li class="list-group-item">${data.users[index]}</li>`)


        }
    })

})