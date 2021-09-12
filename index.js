
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

const productHeaderContainer = document.getElementById('product_header_container')

const productAverageReviewStarsEl = document.getElementById('product_average_review_stars')

const addReviewStarsEl = document.getElementById('add_review_stars')
const submitReviewBtnEl = document.getElementById('submit_review_btn')
const reviewCommentTextareaEl = document.getElementById('review_comment_textarea')
const modalEl = document.getElementById("review_modal");
const closeModalEl = document.getElementsByClassName("close")[0];

function initData() {
    getProductAPI()
        .then(res => {
            product = res.product
            return getReviewsByProductIdAPI(product.id)
        })
        .then(res => {
            reviews = res.reviews
        })
}
initData()

/**MODAL */
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