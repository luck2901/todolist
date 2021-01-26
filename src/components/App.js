import React, {Component} from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component{
  state = {
    input: '',
    todos:[
      {id:0, text:'리액트 공부하기', done : true},
      {id:1, text: '리액트 스타일링 해보기',done:false}
    ]
  }
  id=1
  getId=()=>{
    return ++this.id;
  }
  handleInsert=()=>{
    const{todos, input} = this.state;
    const newTodo = {
      text:input,
      id: this.getId(),
      done:false
    }
    this.setState({
      input:'',
      todos : [...todos,newTodo]
    });
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  }
  handleToggle =(id) =>{
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id===id);

    const toggled ={
      ...todos[index],
      done: !todos[index].done
    }

    this.setState({
      todos:[
        ...todos.slice(0,index),
        toggled,
        ...todos.slice(index+1, todos.length)
      ]
    });
  }
  handleRemove = (id) =>{
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id===id);

    this.setState({
      todos:[
        ...todos.slice(0,index),
        ...todos.slice(index+1,todos.length)
      ]
    });
  }
  render(){
    const {input, todos} = this.state;
    const{
      handleChange,
      handleInsert,
      handleToggle,
      handleRemove
    } = this;
    return(
        <PageTemplate>
          <TodoInput value={input} onInsert = {handleInsert} onChange={handleChange}/>
          <TodoList todos={todos} onToggle={handleToggle} onRemove = {handleRemove}/>
        </PageTemplate>
    );
  }
}

export default App;