import ko from 'knockout';
import { connect } from 'knockout-store';
import { fetchTasks } from '../../store/store.js';

function AppViewModel(params) {
    self.boards = params.boards;

    fetchTasks();
}

function mapStateToParams({ boards }) {
    return { boards };
}

export default connect(mapStateToParams)(AppViewModel);