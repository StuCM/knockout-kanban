//get all tasks from db or get a task by id
export async function getTasksFromDb(id) {
    try {
        if(id){
            const response = await fetch(`http://localhost:3000/tasks/${id}`)
            return response.json();
        } else {
            const response = await fetch(`http://localhost:3000/tasks`)
            return response.json();
        }
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

//add a task to db
export async function addTaskToDb(task) {
    try {
        const response = await fetch(`http://localhost:3000/tasks`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

// delete a task from db
export async function deleteTaskFromDb(id) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}