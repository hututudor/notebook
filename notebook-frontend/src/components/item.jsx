import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { updateModal } from '../redux/actions';

class Item extends Component {
	handleEditClick = () => {
		this.props.showModal('edit', {
			suggestion: this.props.note.name,
			note: this.props.note
		});
	};

	handleDeleteClick = () => {
		this.props.showModal('delete', {
			note: this.props.note
		});
	};

	componentDidMount() {
		moment.locale('en');
	}

	render() {
		console.log(this.props);
		return (
			<div
				onClick={this.props.onClick}
				className={
					'main_sidebar_item' +
					(this.props.active === true ? ' main_sidebar_item_active' : '')
				}
			>
				<p className="main_sidebar_item_title">{this.props.note.name}</p>
				<p className="main_sidebar_item_date">
					{moment(this.props.note.created_at).calendar()}
				</p>
				<div className="main_sidebar_item_buttons">
					<div
						className="main_sidebar_item_buttons_edit"
						onClick={this.handleEditClick}
					>
						<FontAwesomeIcon icon="edit" />
					</div>
					<div
						className="main_sidebar_item_buttons_delete"
						onClick={this.handleDeleteClick}
					>
						<FontAwesomeIcon icon="trash" />
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		showModal: (name, options) => dispatch(updateModal(name, true, options))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Item);
