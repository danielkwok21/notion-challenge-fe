
const CONFIG = {
    api: `http://172.104.165.240/api`
}
const headers = {
    'Content-Type': 'application/json'
}

let product = {}

let reviews = []

const TOTAL_REVIEWS = 5
const STAR_CHECKED_CLASS = 'fa fa-star checked'
const STAR_UNCHECKED_CLASS = 'fas fa-star'

const productTitleEl = document.getElementById('product_title')
const productAverageReviewStarsEl = document.getElementById('product_average_review_stars')
const reviewSummaryRowEl = document.getElementById('review_summary_row')
const reviewStarsEl = document.getElementById('review_stars')
const reviewRowsEl = document.getElementById('review_rows')
const addReviewButtonEl = document.getElementById('add_review_btn')
const addReviewStarsEl = document.getElementById('add_review_stars')
const submitReviewBtnEl = document.getElementById('submit_review_btn')
const reviewCommentTextareaEl = document.getElementById('review_comment_textarea')
const modalEl = document.getElementById("review_modal");
const closeModalEl = document.getElementsByClassName("close")[0];


function initData() {
    getProductAPI()
        .then(res => {
            product = res.product
            setupProductUI()
            return getReviewsByProductIdAPI(product.id)
        })
        .then(res => {
            reviews = res.reviews
            setupReviewsUI()
            setupSummaryUI()
        })
}
initData()

function setupProductUI() {

    productTitleEl.innerHTML = product.title || ''

}

/**SUMMARY */
function setupSummaryUI() {

    reviewStarsEl.innerHTML = ''

    const averageReviews = Number((reviews.map(r => r.stars).reduce((a, b) => a + b, 0) / reviews.length).toFixed(1)) || 0
    productAverageReviewStarsEl.innerHTML = averageReviews || null
    const ceilReviews = Math.ceil(averageReviews)
    const remainingReviews = TOTAL_REVIEWS - ceilReviews
    for (let i = 0; i < ceilReviews; i++) {
        const star = document.createElement('i')
        star.className = STAR_CHECKED_CLASS
        reviewStarsEl.appendChild(star)
    }
    for (let i = 0; i < remainingReviews; i++) {
        const star = document.createElement('i')
        star.className = STAR_UNCHECKED_CLASS
        reviewStarsEl.appendChild(star)
    }
}

/**REVIEWS */
function setupReviewsUI() {
    reviewRowsEl.innerHTML = ''

    reviews
        .sort((a, b) => new Date(b.created_at) > new Date(a.created_at))
        .map(review => {
            const parentEl = document.createElement('div')
            parentEl.className = 'flex'

            /**stars */
            const starsContainer = document.createElement('div')
            starsContainer.className = 'flex stars-container'
            const ceilReviews = Math.ceil(review.stars)
            const remainingReviews = TOTAL_REVIEWS - ceilReviews
            for (let i = 0; i < ceilReviews; i++) {
                const child = document.createElement('i')
                child.className = STAR_CHECKED_CLASS
                starsContainer.appendChild(child)
            }
            for (let i = 0; i < remainingReviews; i++) {
                const child = document.createElement('i')
                child.className = STAR_UNCHECKED_CLASS
                starsContainer.appendChild(child)
            }

            const reviewNumberEl = document.createElement('p')
            reviewNumberEl.innerHTML = `${ceilReviews} `
            reviewNumberEl.className = 'review-number'
            parentEl.appendChild(starsContainer)
            parentEl.appendChild(reviewNumberEl)

            /**comment*/
            const commentEl = document.createElement('p')
            commentEl.innerHTML = review.comment
            commentEl.style['font-weight'] = 100
            parentEl.appendChild(commentEl)

            reviewRowsEl.appendChild(parentEl)
        })
}

/**MODAL */
addReviewButtonEl.onclick = function () {
    modalEl.style.display = "block";
}
closeModalEl.onclick = function () {
    modalEl.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modalEl) {
        modalEl.style.display = "none";
    }
}

let newReview = {
    stars: 0,
    comment: ''
}
for (let i = 0; i < TOTAL_REVIEWS; i++) {
    const star = document.createElement('i')
    star.className = i < newReview.stars ? STAR_CHECKED_CLASS : STAR_UNCHECKED_CLASS
    star.id = `star-${i}`
    star.onmouseenter = () => {
        for (let j = 0; j <= i; j++) {
            const preChild = document.getElementById(`star-${j}`)
            preChild.className = STAR_CHECKED_CLASS
        }
        reset(i + 1)
    }
    star.onmouseleave = () => {
        for (let j = i; j < TOTAL_REVIEWS; j++) {
            const postChild = document.getElementById(`star-${j}`)
            postChild.className = STAR_UNCHECKED_CLASS
        }

        reset()
    }
    star.onclick = () => {
        newReview.stars = i + 1
    }

    addReviewStarsEl.appendChild(star)
}

function reset(current_review_stars = newReview.stars) {
    for (let i = 0; i < TOTAL_REVIEWS; i++) {
        const child = document.getElementById(`star-${i}`)
        child.className = i < current_review_stars ? STAR_CHECKED_CLASS : STAR_UNCHECKED_CLASS
    }
}

submitReviewBtnEl.onclick = () => {
    newReview.comment = reviewCommentTextareaEl.value
    addReviewAPI(newReview)
        .then(response => {
            reviews = [response.review, ...reviews]
            setupSummaryUI()
            setupReviewsUI()
            modalEl.style.display = "none";
        })

}

function addReviewAPI(newReview) {
    return fetch(`${CONFIG.api}/reviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ review: newReview })
    })
        .then(res => res.json())
}

function getProductAPI() {
    return fetch(`${CONFIG.api}/products`)
        .then(res => res.json())

}

function getReviewsByProductIdAPI() {
    return fetch(`${CONFIG.api}/reviews`)
        .then(res => res.json())
}

function fakeAPI(obj) {
    return new Promise((res, rej) => {
        return setTimeout(() => {
            res(obj)
        }, 0.5 * 1000)
    })
}