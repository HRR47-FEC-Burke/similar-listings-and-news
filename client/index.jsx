import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.jsx';
import SimilarListings from './components/SimilarListings.jsx';
import RelatedNews from './components/RelatedNews.jsx';
const ORIGIN = document.location.origin;
const PATH = document.location.pathname.slice(1);

class SlnWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      similarListings: [],
      relatedNews: []
    };
  }

  componentDidMount () {
    this.getAll();
  }

  getAll () {
    this.getListing()
      .then(() => this.getSimilarListings())
      .then(() => this.getRelatedNews())
      .catch(err => null);
  }

  getListing () {
    return fetch(`${ORIGIN}/api/${PATH}`)
      .then(res => res.json())
      .then(listing => this.setState({listing}))
      .catch(err => null);
  }

  getSimilarListings (category = this.state.listing.category) {
    return fetch(`${ORIGIN}/api/listings/${category}`)
      .then(res => res.json())
      .then(similarListings => this.setState({similarListings}))
      .catch(err => null);
  }

  getRelatedNews (tags = [
    this.state.listing.category,
    this.state.listing.brand
  ]) {
    return fetch(`${ORIGIN}/api/news/${tags.join(',')}`)
      .then(res => res.json())
      .then(relatedNews => this.setState({relatedNews}))
      .catch(err => null);
  }

  render () {
    return (
      <div>
        <Styles.Global />
        <SimilarListings listings={this.state.similarListings} />
        <RelatedNews articles={this.state.relatedNews}/>
      </div>
    );
  }
}

ReactDOM.render(<SlnWrapper />, document.getElementById('sln'));

export default SlnWrapper;
