import React from 'react';

import '../../assets/stylesheets/modal.css';
import Backdrop from './Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        const style = {
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
        };

        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.clicked} />
                <div className='Modal' style={style}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;
