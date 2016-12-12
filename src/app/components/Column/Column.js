import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
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
            <Paper className={style.column}>
                <h2>
                    {this.props.column.label}
                </h2>
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Column);
