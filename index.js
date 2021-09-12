
const CONFIG = {
    api: `http://172.104.165.240/api`
}
const headers = {
    'Content-Type': 'application/json'
}


const TOTAL_REVIEWS = 5

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