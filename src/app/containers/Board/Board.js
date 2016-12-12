import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import selectors from '../../selectors/entitySelectors';
// import { bindActionCreators } from 'redux';
import style from './board.scss';
import Column from '../../components/Column/Column';

class Board extends React.Component {
    static propTypes = {
        board: PropTypes.object
    };

    render() {
        const columnIdList = this.props.board.columns || [];
        const columnList = columnIdList.map(id => <Column columnId={id} key={id} />);

        return (
            <div className={style.board}>
                <div>{this.props.board.boardName}</div>
                <div>
                    {columnList}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const boardId = 0; // TODO: get from route
    const board = selectors.getBoard(state, boardId) || {};
    return {
        board
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
