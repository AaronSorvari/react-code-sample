import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppActions from '../../actions/AppActions';

class ConfirmModal extends React.Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        confirmLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        confirmAction: PropTypes.func.isRequired,
        cancelAction: PropTypes.func,
        actions: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleCancel() {
        this.props.actions.hideModal({ modalId: this.props.id });
        if (this.props.cancelAction) {
            this.props.cancelAction();
        }
    }

    handleConfirm() {
        this.props.actions.hideModal({ modalId: this.props.id });
        if (this.props.confirmAction) {
            this.props.confirmAction();
        }
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.cancelLabel || 'Cancel'}
                primary
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label={this.props.confirmLabel || 'OK'}
                primary
                keyboardFocused
                onTouchTap={this.handleConfirm}
            />
        ];

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                modal
                open={this.props.open}
                onRequestClose={this.handleCancel}
            >
                {this.props.content}
            </Dialog>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
