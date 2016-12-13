import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppActions from '../../actions/AppActions';
import selectors from '../../selectors/entitySelectors';
import style from './column.scss';
import Card from '../../components/Card/Card';

class Column extends React.Component {
    static propTypes = {
        columnId: PropTypes.string.isRequired,
        boardId: PropTypes.string.isRequired,
        column: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    }

    handleAddButtonClicked() {
        this.props.actions.showCardEntryModal({
            boardId: this.props.boardId,
            columnId: this.props.columnId
        });
    }

    render() {
        const columnId = this.props.columnId;
        const boardId = this.props.boardId;
        const cardIdList = this.props.column.cards || [];
        const cardList = cardIdList.map(id => <Card cardId={id} key={id} columnId={columnId} boardId={boardId} />);

        return (
            <Paper className={style.column}>

                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.props.column.label} />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild>
                        <IconButton onClick={this.handleAddButtonClicked}>
                            <ContentAdd />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div className={style.content}>
                    {cardList}
                </div>
            </Paper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const columnId = ownProps.columnId;
    const column = selectors.getColumn(state, columnId) || {};
    return {
        column
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
