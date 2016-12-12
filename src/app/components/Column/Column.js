import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import selectors from '../../selectors/entitySelectors';
import style from './column.scss';
import Card from '../../components/Card/Card';

class Column extends React.Component {
    static propTypes = {
        column: PropTypes.object
    };

    render() {
        const cardIdList = this.props.column.cards || [];
        const cardList = cardIdList.map(id => <Card cardId={id} key={id} />);

        return (
            <div className={style.column}>
                <div>
                    {this.props.column.label}
                </div>
                <div>
                    {cardList}
                </div>
            </div>
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
