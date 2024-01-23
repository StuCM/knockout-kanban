import ko from 'knockout';
import TaskViewModel from './task.viewModel.js';
import TaskView from './task.view.html';

ko.components.register('task', {
  viewModel: TaskViewModel,
  template: TaskView
});