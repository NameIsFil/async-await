import './styles.css';

async function fetchUsers() {
    const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    );
    const usersData = await postResponse.json();
    console.log(usersData);
    for (let i = 0; i < usersData.length; i++) {
        addUserCard(usersData[i].name, usersData[i].email, usersData[i].id)
    }
}

fetchUsers()

const removeUser = (card) => {
    card.remove();
    modifyUsers(card.id);
};

async function modifyUsers(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${postId}`);
        const postData = await response.json()
        await fetch(`https://jsonplaceholder.typicode.com/users/${postId}`, {
            method: "DELETE",
        });
        console.log("The post was deleted");
    } catch (error) {
        console.log('Failed to delete', error);
    }
}

const userTable = document.querySelector('#user-table');

const addUserCard = (name, email, id) => {
    const userCard = document.createElement('div');
    let userName = document.createElement('h1');
    let userEmail = document.createElement('h2');
    const deleteButton = document.createElement('p');

    userCard.classList.add('user-card');
    userCard.setAttribute("id", id);
    deleteButton.classList.add('delete-button');

    userName.innerText = name;
    userEmail.innerText = email;
    deleteButton.innerText = 'Delete';
    userCard.append(userName, userEmail, deleteButton);
    userTable.append(userCard);

    deleteButton.addEventListener('click', () => {
        removeUser(userCard);
    });
};