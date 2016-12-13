import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import selectors from '../../selectors/entitySelectors';
import AppActions from '../../actions/AppActions';
import style from './board.scss';
import Column from '../../components/Column/Column';

class Board extends React.Component {
    static propTypes = {
        board: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.handleAddColumn = this.handleAddColumn.bind(this);
    }

    handleAddColumn() {
        const boardId = this.props.board.boardId;
        this.props.actions.showColumnEntryModal({ boardId });
    }

    render() {
        const boardId = this.props.board.boardId;
        const columnIdList = this.props.board.columns || [];
        const columnList = columnIdList.map(id => <Column columnId={id} key={id} boardId={boardId} />);

        const appBarMenu = (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
                <MenuItem primaryText="Add Column" onClick={this.handleAddColumn} />
            </IconMenu>
        );

        return (
            <div className={style.wrapper}>
                <AppBar className={style.appbar} title={this.props.board.boardName} iconElementRight={appBarMenu} />
                <div className={style.content}>
                    {columnList}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const boardId = 'default'; // TODO: get from route
    const board = selectors.getBoard(state, boardId) || {};
    return {
        board
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
