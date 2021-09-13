class ReviewList extends React.Component {
    state = {
        product: null,
        reviews: []
    }

    componentDidMount = () => {
        getProductAPI()
            .then(res => {
                this.setState({ product: res.product })
                return getReviewsByProductIdAPI()
            })
            .then(res => {
                this.setState({ reviews: res.reviews })
            })

        reviewEvent.onmessage = e => {
            const review = JSON.parse(e.data);
            /**skip initial message */
            if (review.message) return false
            
            this.setState({
                reviews: [review, ...this.state.reviews]
            })
        }
    }

    getReviewComponent = (review, i) => {

        const ceilReviews = Math.ceil(review.stars)
        const remainingReviews = TOTAL_REVIEWS - ceilReviews

        return (
            <div className='flex' key={i}>
                <div className='flex stars-container'>
                    {Array(ceilReviews).fill().map((r, i) => <Star key={i} checked={true} />)}
                    {Array(remainingReviews).fill().map((r, i) => <Star key={i} checked={false} />)}
                </div>
                <p className='review-number'>{ceilReviews}</p>
                <p style={{ fontWeight: 100 }}>{review.comment}</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>Reviews</h3>
                {

                    this.state.reviews
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map((review, i) => {
                            return this.getReviewComponent(review, i)
                        })
                }
            </div>
        )
    }
}

ReactDOM.render(
    <ReviewList />,
    document.getElementById('review_list_container')
);