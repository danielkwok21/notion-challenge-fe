
const CONFIG = {
    api: `http://172.104.165.240/api`,
    // api: `http://localhost:3000`,
    // api: `https://ae3384a52d90.ngrok.io`
}
const headers = {
    'Content-Type': 'application/json'
}



const TOTAL_REVIEWS = 5

const reviewEvent = new EventSource(`${CONFIG.api}/sse/review_added`);

function addReviewAPI(newReview) {
    // return Promise.resolve({status: 200, reviews: []})
    return fetch(`${CONFIG.api}/reviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ review: newReview })
    })
        .then(res => res.json())
}

function getProductAPI() {
    // return Promise.resolve({status: 200, product: {}})
    return fetch(`${CONFIG.api}/products`)
        .then(res => res.json())

}

function getReviewsByProductIdAPI() {
    // return Promise.resolve({status: 200, reviews: []})
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