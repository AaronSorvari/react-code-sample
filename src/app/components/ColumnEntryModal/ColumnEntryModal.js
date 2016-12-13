import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppActions from '../../actions/AppActions';

class ColumnEntryModal extends React.Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        boardId: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            columnLabel: 'New Column'
        };

        this.handleColumnLabelChange = this.handleColumnLabelChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleColumnLabelChange(event) {
        this.setState({ columnLabel: event.target.value });
    }

    handleClose() {
        this.props.actions.hideModal({ modalId: this.props.id });
    }

    handleSave() {
        const boardId = this.props.boardId;
        const columnLabel = this.state.columnLabel;

        this.props.actions.addColumnToBoardAsync({ boardId, columnLabel }).then(() => {
            this.props.actions.hideModal({ modalId: this.props.id });
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
                title="New Column"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                <form onSubmit={this.handleSave}>
                    <label htmlFor={`ColumnLabel${this.props.id}`}>Title:</label>
                    <input type="text" id={`ColumnLabel${this.props.id}`} value={this.state.columnLabel} onChange={this.handleColumnLabelChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnEntryModal);
