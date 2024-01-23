import ko from 'knockout';

export default function TaskViewModel(params) {
    this.title = ko.observable(params.title);
}