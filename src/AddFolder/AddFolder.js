import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext'

class AddFolder extends Component {
	static contextType = ApiContext;

	onAddFolder = e => {
		e.preventDefault()
		const folderId = this.props.id
		const body = e.target.submit.value;

		fetch(`${config.API_ENDPOINT}/folder/${folderId}`, {
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
			.then(() => {
				this.context.addFolder()
				// allow parent to perform extra behaviour
				this.props.onAddFolder(folderId)
			})
			.catch(error => {
				console.error({ error })
			})
	}

	render() {
		return (
			<div>
				<label htmlFor="add-folder-form">Add New Folder</label>
				<form name="add-folder-form">
					<label htmlFor="folder-name-input">Folder Name: </label>
					<input id="folder-name-input" name="folder-name-input" type="text" />
					<button type="submit" onClick={() => this.handleSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}
export default AddFolder;
