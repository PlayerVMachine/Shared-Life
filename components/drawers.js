import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List';
import InboxIcon from '@material-ui/icons/Inbox';

//Drawer navigation menu Component
export default class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerItems: ['Notes', 'Reminders', 'Calendar', 'Lists', 'Locations', 'Settings'],
      drawerName: 'Shared Life',
    };

    //Bind onClick actions, TODO: check necessity and if this can be cleaned up
    this.setDefaultDrawer = this.setDefaultDrawer.bind(this);
    this.setNotesDrawer = this.setNotesDrawer.bind(this);
    this.setRemindersDrawer = this.setRemindersDrawer.bind(this);
    this.setCalendarDrawer = this.setCalendarDrawer.bind(this);
    this.setListDrawer = this.setListDrawer.bind(this);
    this.setLocationDrawer = this.setLocationDrawer.bind(this);
    this.setSettingsDrawer = this.setSettingsDrawer.bind(this);

    //drawerTypes object maps the correct onClick function to the name of the drawer
    this.drawerTypes = {
      'Notes': this.setNotesDrawer,
      'Reminders': this.setRemindersDrawer, 
      'Calendar': this.setCalendarDrawer,
      'Lists': this.setListDrawer,
      'Locations': this.setLocationDrawer,
      'Settings': this.setSettingsDrawer,
    }
  }

  //onClick handler updates drawer name and contents
  setDefaultDrawer() {
    this.setState(state => {
      state.drawerItems = ['Notes', 'Reminders', 'Calendar', 'Lists', 'Locations', 'Settings'];
      state.drawerName = 'Shared Life';
      return state;
    });
  }

  //onClick handler updates drawer name and contents
  setNotesDrawer() {
    this.setState(state => {
      state.drawerItems = ['Note1', 'Note2', 'Note3'];
      state.drawerName = 'Notes';
      return state;
    });
  }

  //onClick handler updates drawer name and contents
  setRemindersDrawer() {
    this.setState(state => {
      state.drawerItems = ['Rem1', 'Rem2', 'Rem3', 'Rem4'];
      state.drawerName = 'Reminders';
      return state;
    });
  }

  setCalendarDrawer() {
    this.setState(state => {
      state.drawerItems = ['All', 'Holidays', 'Work', 'Events'];
      state.drawerName = 'Calendar';
      return state;
    });
  }

  //onClick handler updates drawer name and contents
  setListDrawer() {
    this.setState(state => {
      state.drawerItems = ['List1', 'List2', 'List3', 'List4'];
      state.drawerName = 'List';
      return state;
    });
  }

  //onClick handler updates drawer name and contents
  setLocationDrawer() {
    this.setState(state => {
      state.drawerItems = ['Want to Go', 'Favourite'];
      state.drawerName = 'Locations';
      return state;
    });
  }

  //onClick handler updates drawer name and contents
  setSettingsDrawer() {
    this.setState(state => {
      state.drawerItems = ['Profile', 'Linked Accounts'];
      state.drawerName = 'Settings';
      return state;
    });
  }

  //Render the Drawer content
  render() {
    return(
    <div>
      <Button onClick={this.setDefaultDrawer}>
        {this.state.drawerName != 'Shared Life' ? <LeftIcon /> : <HomeIcon />}
        {this.state.drawerName}
      </Button>
      <Divider />
      <List>
        {this.state.drawerItems.map((text, index) => (
          <ListItem button key={text} onClick={this.drawerTypes[text]}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <ListIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
    );
  }

}