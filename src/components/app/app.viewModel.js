import ko from 'knockout';
import { connect, setState } from 'knockout-store';
import { fetchTasks, toggleTaskSizeLarge } from '../../store/store.js';

function AppViewModel(params) {
    self.boards = params.boards;
    self.taskSize = ko.observable(false);

    self.taskSize.subscribe(function() {
        toggleTaskSizeLarge(self.taskSize())
    })

    fetchTasks();
}

function mapStateToParams({ boards, taskSizeLarge }) {
    return { boards, taskSizeLarge };
}

export default connect(mapStateToParams)(AppViewModel);