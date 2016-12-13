import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppActions from '../../actions/AppActions';
import selectors from '../../selectors/entitySelectors';
import style from './card.scss';

class Card extends React.Component {
    static propTypes = {
        cardId: PropTypes.string.isRequired,
        columnId: PropTypes.string.isRequired,
        boardId: PropTypes.string.isRequired,
        card: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const boardId = this.props.boardId;
        const columnId = this.props.columnId;
        const cardId = this.props.cardId;
        const cardName = this.props.card.title;

        this.props.actions.showConfirmModal({
            title: 'Confirm',
            content: `Are you sure you want to delete the card "${cardName}"?`,
            confirmAction: () => {
                this.props.actions.deleteCardAsync({ boardId, columnId, cardId });
            }
        });
    }

    render() {
        return (
            <Paper className={style.card} zDepth={2}>
                <IconButton style={{ float: 'right' }} onClick={this.handleDelete}>
                    <NavigationClose />
                </IconButton>
                <h3>
                    {this.props.card.title}
                </h3>
            </Paper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const cardId = ownProps.cardId;
    const card = selectors.getCard(state, cardId) || {};
    return {
        card
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
