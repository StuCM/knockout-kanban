import ko from 'knockout';
import { connect } from 'knockout-store';
import { fetchTasks, toggleTaskSizeLarge } from '../../store/store.js';

function AppViewModel(params) {
    const self = this;
    self.boards = params.boards;
    self.taskSize = ko.observable(false);

    self.taskSize.subscribe(() => {
        toggleTaskSizeLarge(self.taskSize())
    })

    fetchTasks();
}

function mapStateToParams({ boards, taskSizeLarge }) {
    return { boards, taskSizeLarge };
}

export default connect(mapStateToParams)(AppViewModel);