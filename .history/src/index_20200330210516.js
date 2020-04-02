import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import * as serviceWorker from './serviceWorker';
import App from './App'

/*____________________ToDo_______________*/
     /*
Todo app structure

TodoApp
	- TodoHeader
	- TodoList
    - TodoListItem #1
		- TodoListItem #2
		  ...
		- TodoListItem #N
	- TodoForm
*/
/*____________________KANBAN_______________*/

/*____________________KANBAN_______________*/
/*____________________ToDoList_Begin_______________*/
var todoItems = [];
/*todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});*/

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) { 
    super(props)
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>Tasks in work</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.props.initItems} 
        removeItem={this.removeItem} 
        markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('app'));
/*____________________ToDoList__END_______________*/
/*_________________________________ADD ASK___Добавить блок_______________

$('.click_to_add_block').click(function() {
    $(this).before(
  <div class="block_to_add">
    <div class="topic">
      <input type="text" placeholder="Тема">
        <div class="description">
            <textarea placeholder="Текст"></textarea>
        </div>
    </div>

    <button class="delete">удалить</button>
  </div>);
  });
  
  $(document).on('click', '.delete', function() {
    $(this).parent().remove();
  });
_________________________ END ASK ________________________*/

/*$(function () {
    var kanbanCol = $('.panel-body');
    kanbanCol.css('max-height', (window.innerHeight - 150) + 'px');
  
    var kanbanColCount = parseInt(kanbanCol.length);
    $('.container-fluid').css('min-width', (kanbanColCount * 350) + 'px');
  
    draggableInit();
  
    $('.panel-heading').click(function() {
        var $panelBody = $(this).parent().children('.panel-body');
        $panelBody.slideToggle();
    });
  });
  
  function draggableInit() {
    var sourceId;
  
    $('[draggable=true]').bind('dragstart', function (event) {
        sourceId = $(this).parent().attr('id');
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    });
  
    $('.panel-body').bind('dragover', function (event) {
        event.preventDefault();
    });
  
    $('.panel-body').bind('drop', function (event) {
        var children = $(this).children();
        var targetId = children.attr('id');
  
        if (sourceId != targetId) {
            var elementId = event.originalEvent.dataTransfer.getData("text/plain");
  
            $('#processing-modal').modal('toggle'); //before post
  
  
            // Post data 
            setTimeout(function () {
                var element = document.getElementById(elementId);
                children.prepend(element);
                $('#processing-modal').modal('toggle'); // after post
            }, 1000);
  
        }
  
        event.preventDefault();
    });
  }
  */

/*Моя тема
//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
serviceWorker.unregister();
моя тема*/