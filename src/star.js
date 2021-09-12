class Star extends React.Component {
    render() {
        return (
            this.props.checked ? <i {...this.props} className='fa fa-star checked' /> : <i {...this.props} className='fas fa-star' />
        )
    }
}