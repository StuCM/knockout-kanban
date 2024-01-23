import ko from 'knockout';
import { fetchTasks, state } from '../../store/store.js';

export default function AppViewModel() {
    this.state = state;

    fetchTasks().then(() => {
        console.log('Tasks fetched');
    }).catch(error => {
        console.error('Error fetching tasks:', error);
    });
}