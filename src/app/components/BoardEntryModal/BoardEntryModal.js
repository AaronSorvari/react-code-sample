import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppActions from '../../actions/AppActions';

class BoardEntryModal extends React.Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        actions: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            boardName: 'New Board'
        };

        this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleBoardNameChange(event) {
        this.setState({ boardName: event.target.value });
    }

    handleClose() {
        this.props.actions.hideModal({ modalId: this.props.id });
    }

    handleSave() {
        const boardName = this.state.boardName;

        this.props.actions.showConfirmModal({
            title: 'Confirm',
            content: `Are you sure you want to create the board "${boardName}"?`,
            confirmAction: () => {
                this.props.actions.addBoardAsync({ boardName }).then(() => {
                    this.props.actions.hideModal({ modalId: this.props.id });
                });
            }
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary
                keyboardFocused
                onTouchTap={this.handleSave}
            />
        ];

        return (
            <Dialog
                title="New Board"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                <form onSubmit={this.handleSave}>
                    <label htmlFor={`BoardName${this.props.id}`}>Name:</label>
                    <input type="text" id={`BoardName${this.props.id}`} value={this.state.boardName} onChange={this.handleBoardNameChange} />
                </form>
            </Dialog>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardEntryModal);
