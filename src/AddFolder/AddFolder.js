import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'

class AddFolder extends Component {
	static defaultProps = {
		onAddFolder: () => { }
	}
	static contextType = ApiContext;

	onAddFolder = e => {
		e.preventDefault()
		// const folderId = this.props.id
		const body = { name: e.target.folderinput.value };
		console.log(body);
		fetch(`${config.API_ENDPOINT}/folders`, {
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
				this.context.addFolder(resJson)
				this.props.history.push('/')
			})
			.catch(error => {
				console.error({ error })
			})
	}

	render() {
		return (
			<div>
				<label htmlFor="add-folder-form">Add New Folder</label>
				<form name="add-folder-form" onSubmit={this.onAddFolder}>
					<label htmlFor="folderinput">Folder Name: </label>
					<input id="folderinput" name="folderinput" type="text" />
					<button type="submit" >Submit</button>
				</form>
			</div>
		)
	}
}

AddFolder.propTypes = {
	onDeleteNote: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired

}

export default AddFolder;
