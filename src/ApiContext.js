import React, { Component } from 'react'

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default ApiContext;

export class ApiProvider extends Component {
  // add functions here

  render() {
    return (
      <ApiContext.Provider value={{...this.state}}> 
        {this.props.children}
      </ApiContext.Provider>
    )
  }
  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  addFolder = folder => {

      this.setState({
          folders: [...this.state.folders, folder]
      });
  };

  addNote = note => {

      this.setState({
          notes: [...this.state.notes, note]
      });
  };
}
