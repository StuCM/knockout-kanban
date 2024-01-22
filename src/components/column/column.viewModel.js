import ko from 'knockout';

export default function ColumnViewModel(params) {
    this.title = ko.observable(params.title);
    this.tasks = ko.observableArray([]);
}