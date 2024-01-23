import ko from 'knockout';
import AppViewModel from './app.viewModel.js';
import AppView from './app.view.html';

ko.components.register('app', {
    viewModel: AppViewModel,
    template: AppView
    });