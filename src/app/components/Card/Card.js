import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import selectors from '../../selectors/entitySelectors';
import style from './card.scss';

class Card extends React.Component {
    static propTypes = {
        card: PropTypes.object
    };

    render() {
        return (
            <Paper className={style.card} zDepth={2}>
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
