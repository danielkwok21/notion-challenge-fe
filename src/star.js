class Star extends React.Component {
    render() {
        return (
            this.props.checked ? <i className='fa fa-star checked' /> : <i className='fas fa-star' />
        )
    }
}