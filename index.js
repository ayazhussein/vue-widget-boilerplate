/*
FOR TESTING PURPOSES
*/

console.log(this);

var deviz = new Deviz('#app');
console.log(deviz);

var input = $("input[name='title']");

input.on('change', function($event) {
    vm.changeTitle($event.target.value);
})