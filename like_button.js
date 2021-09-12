var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductHeader = function (_React$Component) {
    _inherits(ProductHeader, _React$Component);

    function ProductHeader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ProductHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductHeader.__proto__ || Object.getPrototypeOf(ProductHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            product: null,
            reviews: []
        }, _this.componentDidMount = function () {
            getProductAPI().then(function (res) {
                _this.setState({ product: res.product });
                return getReviewsByProductIdAPI();
            }).then(function (res) {
                _this.setState({ reviews: res.reviews });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ProductHeader, [{
        key: 'render',
        value: function render() {
            return this.state.product ? React.createElement(
                'div',
                { id: 'product_header_container' },
                React.createElement(
                    'h1',
                    null,
                    this.state.product.title
                ),
                React.createElement(
                    'div',
                    { id: 'review_summary_row', 'class': 'flex' },
                    React.createElement(
                        'div',
                        { 'class': 'flex' },
                        React.createElement('h2', { id: 'product_average_review_stars' }),
                        React.createElement('div', { id: 'review_stars' })
                    ),
                    React.createElement(
                        'button',
                        { id: 'add_review_btn' },
                        'Add review'
                    )
                )
            ) : React.createElement(
                'p',
                null,
                'Loading...'
            );
        }
    }]);

    return ProductHeader;
}(React.Component);

ReactDOM.render(React.createElement(ProductHeader, null), document.getElementById('some_random_id'));