import { v4 as uuidv4 } from 'uuid';

let users = []

export const createUser = (req, res) => {
    const user = req.body;
    users.push({...user, id:uuidv4()});
    res.send("User saved");
};

export const getUsers = (req, res) => {
    res.send(users);
}

export const getUser = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user)=> user.id === id);
    res.send(foundUser);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user)=> user.id !== id);
    res.send(`User ${id} deleted.`);
}

export const updateUser = (req, res) =>{
    // find user
    const foundUser = users.find((user)=> user.id === id);
    // implement logic for update
    res.send(`User ${id} updated.`);
}