import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppActions from '../../actions/AppActions';

class CardEntryModal extends React.Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        columnId: PropTypes.string.isRequired,
        boardId: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            cardTitle: 'New Card',
            cardContent: ''
        };

        this.handleCardTitleChange = this.handleCardTitleChange.bind(this);
        this.handleCardContentChange = this.handleCardContentChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleCardTitleChange(event) {
        this.setState({ cardTitle: event.target.value });
    }

    handleCardContentChange(event) {
        this.setState({ cardContent: event.target.value });
    }

    handleClose() {
        this.props.actions.hideModal({ modalId: this.props.id });
    }

    handleSave() {
        const boardId = this.props.boardId;
        const columnId = this.props.columnId;
        const cardTitle = this.state.cardTitle;
        const cardContent = this.state.cardContent;

        this.props.actions.addCardToColumnAsync({ boardId, columnId, cardTitle, cardContent }).then(() => {
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
                title="New Card"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                <form onSubmit={this.handleSave}>
                    <div>
                        <label htmlFor={`CardTitle${this.props.id}`}>Title:</label>
                        <input type="text" id={`CardTitle${this.props.id}`} value={this.state.cardTitle} onChange={this.handleCardTitleChange} />
                    </div>
                    <div>
                        <label htmlFor={`CardContent${this.props.id}`}>Content:</label>
                        <textarea id={`CardContent${this.props.id}`} value={this.state.cardContent} onChange={this.handleCardContentChange} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardEntryModal);
