class AddReviewModal extends React.Component {
    state = {
        product: null,
        review: {
            stars: 0,
            comment: ''
        },
        currentIndex: -1
    }


    componentDidMount = () => {
        getProductAPI()
            .then(res => {
                this.setState({ product: res.product })
            })

        window.onclick = function (event) {
            const modalEl = document.getElementById("review_modal");

            if (event.target == modalEl) {
                modalEl.style.display = "none";
            }
        }

        document.addEventListener('keydown', e => {

            switch (e.keyCode) {
                case 27:
                    const modalEl = document.getElementById("review_modal");
                    modalEl.style.display = "none";
                    break

                case 13:
                    this.onSubmit()
                    break

                default:
                    break

            }
        })
    }

    onSubmit = () => {
        addReviewAPI(this.state.review)
            .then(response => {
                const modalEl = document.getElementById("review_modal");
                modalEl.style.display = "none";
            })
    }

    render() {
        return (
            <div>
                <div id="review_modal" className="modal">
                    <div className="modal-content">
                        <span
                            onClick={() => {
                                const modalEl = document.getElementById("review_modal");
                                console.log(modalEl)
                                modalEl.style.display = "none";
                            }}
                            className="close">&times;</span>
                        <h1>What's your rating?</h1>
                        <p>Rating</p>
                        <div id='add_review_stars'>
                            {Array(TOTAL_REVIEWS).fill().map((r, i) => {
                                const starIndex = i + 1
                                const checked = this.state.currentIndex >= starIndex
                                return < Star
                                    key={i}
                                    checked={checked}
                                    onMouseEnter={() => {
                                        this.setState({ currentIndex: starIndex })
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({ currentIndex: this.state.review.stars || 0 })
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            review: {
                                                ...this.state.review,
                                                stars: starIndex
                                            }
                                        })
                                    }}

                                />
                            })}
                        </div>
                        <p>Review</p>
                        <textarea
                            value={this.state.review.comment}
                            onChange={e => {
                                this.setState({
                                    review: {
                                        ...this.state.review,
                                        comment: e.target.value
                                    }
                                })
                            }}
                            id='review_comment_textarea' rows="4" placeholder="Start typing..."></textarea>
                        <button onClick={this.onSubmit} id='submit_review_btn'>Submit review</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <AddReviewModal />,
    document.getElementById('add_review_modal_container')
);