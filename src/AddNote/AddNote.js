import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext'

class AddNote extends Component {

	static defaultProps = {
		onAddNote: () => { }
	}
	static contextType = ApiContext;

	onAddNote = e => {
		e.preventDefault()
		console.log(this.props)
		// const folderId = this.props.id
		const body = {
			name: e.target.noteNameInput.value,
			folderId: e.target.folder.value,
			modified: Date.now(),
			content: e.target.noteContent.value
		};
		console.log(body);
		fetch(`${config.API_ENDPOINT}/notes`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if (!res.ok)
					return res.json().then(e => Promise.reject(e))
				return res.json()
			})
			.then((resJson) => {
				//this.context.addFolder(folderId)
				// allow parent to perform extra behaviour
				this.context.addNote(resJson)
				this.props.history.push('/')
			})
			.catch(error => {
				console.error({ error })
			})
	}

	render() {
		let { folders = [] } = this.context;
		let options = folders.map(folder => {
			return <option value={folder.id}>{folder.name}</option>
		})
		return (
			<div>
				<label htmlFor="add-note-form">Add New Note</label>
				<form name="add-note-form" onSubmit={this.onAddNote}>
					<label htmlFor="noteNameInput">Note Name: </label>
					<input id="noteNameInput" name="noteNameInput" type="text" />
					<label htmlFor="folder">Folder: </label>
					<select id="folder" name="folder">{options}</select>
					<label htmlFor="NoteContent">Note Content: </label>
					<input id="noteContent" name="NoteContent" type="text" />
					<button type="submit" >Submit</button>
				</form>
			</div>
		)
	}
}
export default AddNote;
