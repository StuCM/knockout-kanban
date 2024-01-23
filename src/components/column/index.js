import ko from 'knockout';
import ColumnViewModel from './column.viewModel.js';
import ColumnView from './column.view.html';

ko.components.register('column', {
  viewModel: ColumnViewModel,
  template: ColumnView
});