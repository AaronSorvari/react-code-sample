import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import selectors from '../../selectors/modalSelectors';
import CardEntryModal from '../../components/CardEntryModal/CardEntryModal';
import ColumnEntryModal from '../../components/ColumnEntryModal/ColumnEntryModal';

const availableModalComponents = {
    CardEntryModal,
    ColumnEntryModal
};

function createModalComponent(componentName, id, open, props) {
    const TheComponent = availableModalComponents[componentName];
    return (
        <TheComponent key={id} id={id} open={open} {...props} initialOpen />
    );
}

class MasterModal extends React.Component {
    static propTypes = {
        modalList: PropTypes.array.isRequired
    };

    render() {
        const modalComponentList = this.props.modalList.map(x => createModalComponent(x.componentName, x.id, x.open, x.props));

        return (
            <div>
                {modalComponentList}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const modalList = selectors.getModals(state);
    return {
        modalList
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterModal);
