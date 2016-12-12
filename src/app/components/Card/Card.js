import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import selectors from '../../selectors/entitySelectors';
import style from './card.scss';

class Card extends React.Component {
    static propTypes = {
        card: PropTypes.object
    };

    render() {
        return (
            <div className={style.card}>
                <div>
                    {this.props.card.title}
                </div>
            </div>
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
