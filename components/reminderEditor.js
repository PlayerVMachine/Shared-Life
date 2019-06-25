import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Push from 'push.js';

const util = require('util');

const RemPaper = withStyles(theme => ({
    root: {
        padding: '10px',
        width: '500px',
    },
}))(Paper);

function sendReminder (value) {
    console.log(value);
    Push.create(value, {
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        },
    });
    console.log('timed out!');
}

export default class ReminderEditor extends React.Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.setReminder = this.setReminder.bind(this);
    }

    setReminder (event) {
        event.preventDefault();
        let reminderDate = new Date(event.target[0].value + 'T' + event.target[1].value);
        let reminderMilli = reminderDate.getTime() - Date.now();
        console.log(reminderMilli/1000 + 's');
        setTimeout((value) => {
            Push.create(value, {
                timeout: 10000,
                onClick: function () {
                    window.focus();
                    this.close();
                },
            });
        }, reminderMilli, event.target[2].value);
    }

    render () {
        return (
            <div>
                <RemPaper>
                    <form onSubmit={this.setReminder}>
                        <TextField
                            id='date'
                            label='Reminder Date'
                            type='date'
                            style={{}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField 
                            id='time'
                            label='Reminder Time'
                            type='time'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField 
                            id='reminder'
                            label='Reminder'
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button color='primary' type='submit'>Set Reminder</Button>
                    </form>
                </RemPaper>
            </div>
        )
    }
}
