import React from 'react';

class Counter extends React.Component {
    state = { counter: 0 };

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate() {
        if (this.props.gameOver) {
            clearInterval(this.increment);
            this.increment = null;
        }
        if (!this.increment && !this.props.gameOver) {
            this.startTimer();
        }
    }

    startTimer = () => {
        this.setState({ counter: 0 });
        this.increment = setInterval(() => {
            this.setState({ counter: this.props.count + 1 });
            if (this.props.onChange) this.props.onChange(this.state.counter);
        }, 1000);
    };

    render() {
        const minutes =
            this.props.count > 59
                ? (Math.floor(this.props.count / 60) + 100)
                      .toString()
                      .split('')
                      .splice(1)
                      .join('')
                : '00';
        const seconds = ((this.props.count % 60) + 100)
            .toString()
            .split('')
            .splice(1)
            .join('');

        return (
            <span>
                {minutes}:{seconds}
            </span>
        );
    }
}

export default Counter;
