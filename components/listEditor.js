import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import DeleteItem from '@material-ui/icons/Close';

const EntryTextField = withStyles(theme => ({
    root: {
      margin: '5px 5px 10px 5px',
      width: '95%',
    },
  }))(TextField);

const ListPaper = withStyles(theme => ({
    root: {
        paddingLeft: '10px',
        width: '500px',
    },
}))(Paper);

export default class listEditor extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: '',
            id: 0,
            listItems: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.entryUpdate = this.entryUpdate.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
    }

    entryUpdate (event) {
        event.persist();
        this.setState(state => {
            state.value = event.target.value;
            return state;
        })
    }

    handleSubmit (event) {
        this.setState(state => {
            state.listItems = state.listItems.concat({id: state.id, text: state.value, isDone: false});
            state.value = '';
            state.id = state.id + 1;
            return state;
        })
        event.preventDefault();
    }

    toggleDone (event, checked) {
        let itemId = event.target.id
        this.setState(state => {
            for (let i = 0; i < state.listItems.length; i++) {
                if (state.listItems[i].id == itemId) {
                    state.listItems[i].isDone = checked;
                    break;
                }
            }
            return state;
        });
    }

    removeEntry (event) {
        let itemId = event.currentTarget.dataset.mode;
        let index = -1;
        this.setState(state => {
            for (let i = 0; i < state.listItems.length; i++) {
                if (state.listItems[i].id == itemId) {
                    index = i;
                    break;
                }
            }
            state.listItems.splice(index, 1);
            return state;
        })
    }

    render () {
        return (
        <div>
            <ListPaper>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <EntryTextField value={this.state.value} onChange={this.entryUpdate} label="To Do" />
                </form>
                {(this.state.listItems).map((item, index) => {
                return (
                    <div key={index + 1000} style={{display:'flex'}}>
                        <FormControlLabel 
                        style={{
                            width:'100%', 
                            textDecoration: item.isDone ? 'line-through' : 'none',
                            color: item.isDone ? 'grey' : 'black',
                        }}
                        control={<Checkbox id={item.id.toString()} value={item.text} checked={item.isDone}/>} 
                        label={item.text}
                        onChange={this.toggleDone}
                        />
                        <IconButton type='button' onClick={this.removeEntry} data-mode={item.id}>
                            <DeleteItem />
                        </IconButton>
                    </div>
                )})}
            </ListPaper>
        </div>
        )
    }
}
