import React, { Component } from 'react';
import moment from 'moment'
import Truncate from 'react-truncate'


const DEFAULT_HPP = '12'

const PATH_BASE = 'https://jamja.vn/api/v3'
const PATH_SEARCH = '/searchdeal'
const PARAM_SEARCH = 'keyword='
const PARAM_OFFSET = 'offset='
const PARAM_HPP = 'limit='


class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      isLoading: false,
      nextHref: null,
    }

    this.fetchData = this.fetchData.bind(this)
    this.setData = this.setData.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  setData (result) {
    const { nextHref } = this.state
    const { objects, meta } = result
    const oldDeals = nextHref ? this.state.data : []
    const updatedDeals = [...oldDeals, ...objects]
    this.setState({ data: updatedDeals, nextHref: meta.next, isLoading: false })
  }

  fetchData () {
    fetch(`${PATH_BASE}${PATH_SEARCH}/?${PARAM_SEARCH}tra%20sua&province=ha-noi&${PARAM_OFFSET}0&${PARAM_HPP}${DEFAULT_HPP}`, {timeout: 500})
     .then(response => response.json())
     .then(result => this.setData(result))
     .catch(e => console.log(e))
   }

  fetchNext (nextHref) {
    this.setState({isLoading: true})
    fetch(`https://jamja.vn/${nextHref}`, {timeout: 500})
      .then(response => response.json())
      .then(result => this.setData(result))
      .catch(e => console.log(e))
   }

   componentDidMount () {
     this.fetchData(0)
   }

  render() {
    const { data, isLoading, nextHref } = this.state
    const list = (data) || []
    return (
      <div>
        <div className="container">
          <div className="section">
            <div class="hero-body">
              <div class="container">
                <h1 class="title is-2">
                  Trà sữa giá hời
                </h1>
                <h2 class="subtitle">
                  Tìm các khuyến mãi giảm giá khi mua trà sữa ở thành phố Hà Nội
                </h2>
              </div>
            </div>
          </div>
          <div className="section">
            {
              list.length
                ? <DealList list={list} />
                : null
            }
            {
              nextHref
                ? <LoadMore nextHref={nextHref} onClickNext={() => this.fetchNext(nextHref)} isLoading={isLoading} />
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}


const LoadMore = ({nextHref, onClickNext, isLoading}) =>
<div className='container has-text-centered'>
    <div className='columns'>
      <div className='column is-2-desktop is-offset-5-desktop is-8-mobile is-offset-2-mobile'>
        <a
          className={'button ' + (!nextHref ? ' is-disabled' : ' is-focused' + (isLoading ? ' is-loading' : ''))}
          onClick={onClickNext}
        >
        Xem thêm
      </a>
      </div>
    </div>
  </div>


const DealList = ({list}) => (
    <div className="columns is-mobile is-multiline">
      {
        list.map(deal =>
          <DealCard obj={deal} key={deal.id} />
        )
      }
    </div>
)


const DealCard = ({obj}) =>
    <div className="column is-4-desktop is-12-tablet is-12-mobile" style={{paddingTop: '20px'}}>
      <div className="card bm--card-equal-height">
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={obj.images[0].link} alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={obj.brand.image} alt=""/>
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{obj.brand.brand_name}</p>
              <p className="subtitle is-5"><Truncate lines={1}>{obj.brand.brand_desc}</Truncate></p>
            </div>
          </div>
          <div className="content">
            <h5>{obj.title}</h5>
            <Truncate lines={4}>
              {obj.condition.split('\n').map((item, i) =>
                <p key={i}>
                  {item}
                </p>)
              }
            </Truncate>
            <br/>
            <br/>
            <small><em>Từ ngày {moment(obj.start_sale_time).format('DD-MM-YYYY')} đến {moment(obj.end_sale_time).format('DD-MM-YYYY')}</em></small>
          </div>
        </div>
        <footer className="card-footer">
          <a href={obj.deal_url} target="_blank" className="card-footer-item button is-primary is-outlined">Chi tiết</a>
        </footer>
      </div>
    </div>


export default App;
