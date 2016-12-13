import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import selectors from '../../selectors/entitySelectors';
import AppActions from '../../actions/AppActions';
import style from './board.scss';
import Column from '../../components/Column/Column';

function navigateToBoard(board) {
    browserHistory.push(`/${board.boardId}`);
}

class Board extends React.Component {
    static propTypes = {
        board: PropTypes.object,
        boardList: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.handleAddBoard = this.handleAddBoard.bind(this);
        this.handleAddColumn = this.handleAddColumn.bind(this);
    }

    handleAddBoard() {
        this.props.actions.showBoardEntryModal();
    }

    handleAddColumn() {
        const boardId = this.props.board.boardId;
        this.props.actions.showColumnEntryModal({ boardId });
    }

    render() {
        const boardId = this.props.board.boardId;
        const columnIdList = this.props.board.columns || [];
        const columnList = columnIdList.map(id => <Column columnId={id} key={id} boardId={boardId} />);

        const rightButton = (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem primaryText="Add Column" onClick={this.handleAddColumn} />
            </IconMenu>
        );

        const leftButton = (
            // TODO: Make this a Popover instead of a menu
            <IconMenu iconButtonElement={<IconButton><MenuIcon /></IconButton>}>
                <MenuItem primaryText="Add Board" onClick={this.handleAddBoard} />
                <Divider />
                {
                    this.props.boardList.map(x => <MenuItem primaryText={x.boardName} key={x.boardId} onClick={() => navigateToBoard(x)} />)
                }
            </IconMenu>
        );

        return (
            <div className={style.wrapper}>
                <AppBar className={style.appbar} title={this.props.board.boardName} iconElementRight={rightButton} iconElementLeft={leftButton} />
                <div className={style.content}>
                    {columnList}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const boardId = ownProps.params.boardId;
    const defaultBoardId = 'default';
    const board = selectors.getBoard(state, boardId) || selectors.getBoard(state, defaultBoardId) || {};
    const boardList = selectors.getAllBoards(state);
    return {
        board,
        boardList
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
