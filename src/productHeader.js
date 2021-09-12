class ProductHeader extends React.Component {
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
    }

    render() {


        const averageReviews = Number((this.state.reviews.map(r => r.stars).reduce((a, b) => a + b, 0) / this.state.reviews.length).toFixed(1)) || 0
        const ceilReviews = Math.ceil(averageReviews)
        const remainingReviews = TOTAL_REVIEWS - ceilReviews

        return (
            this.state.product ? (
                <div id='product_header_container'>
                    <h1 id='product_title'>{this.state.product.title}</h1>
                    <div id='review_summary_row' className='flex'>
                        <div className='flex'>
                            <h2 id='product_average_review_stars'>
                                {averageReviews || null}
                            </h2>
                            <div id='review_stars'>
                                {Array(ceilReviews).fill().map((r, i) => <Star key={i} checked={true} />)}
                                {Array(remainingReviews).fill().map((r, i) => <Star key={i} checked={false} />)}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                modalEl.style.display = "block";
                            }}
                            id='add_review_btn'>Add review</button>
                    </div>
                </div>

            ) : <p>Loading...</p>
        )
    }
}

ReactDOM.render(
    <ProductHeader />,
    document.getElementById('some_random_id')
);